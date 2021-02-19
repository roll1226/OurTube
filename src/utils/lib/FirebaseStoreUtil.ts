import firebase from "firebase/app"
import { liveConverter } from "../../models/firebase/LiveModel"
import { joinFlagConverter } from "../../models/firebase/JoinFlagModel"
import FirebaseInitUtil from "./FirebaseInitUtil"
import { UserConverter } from "../../models/firebase/UsersModel"
import FirebaseAuthenticationUtil from "./FirebaseAuthenticationUtil"
import { chatConverter } from "../../models/firebase/ChatModel"
import { youTubeListConverter } from "../../models/firebase/YouTubeLiveModel"
import LoggerUtil from "../debugger/LoggerUtil"
import { changeUserConverter } from "../../models/firebase/ChangeUserModel"
import FetchYouTubeUtil from "./FetchYouTubeUtil"
import { youTubeListCntConverter } from "../../models/firebase/YouTubeListCntModel"
import FirebaseFunctionsUtil from "./FirebaseFunctions"
import FirebaseDatabaseUtil from "./FirebaseDatabaseUtil"

const fireStore = FirebaseInitUtil.fireStore()

class FirebaseStoreUtil {
  /**
   * live info
   *
   * @param liveUid
   * @return live info
   */
  public static liveInfo(liveUid: string) {
    return fireStore
      .collection("lives")
      .withConverter(liveConverter)
      .doc(liveUid)
  }

  /**
   * set live play
   * @param liveUid
   * @param play
   * @param name
   * @param currentTime
   */
  public static async setLivePlay(
    liveUid: string,
    play: boolean,
    name: string,
    currentTime: number,
    playNow?: number
  ) {
    if (playNow) {
      await FirebaseStoreUtil.liveInfo(liveUid).update({
        play,
        currentTime,
        playNow: FirebaseStoreUtil.setCount(1),
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
      })
    } else {
      await FirebaseStoreUtil.liveInfo(liveUid).update({
        play,
        currentTime,
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
      })
    }
    await FirebaseStoreUtil.setChangeUser(liveUid, name)
  }

  /**
   * set live current time
   * @param liveUid
   * @param currentTime
   */
  public static async setLiveCurrentTime(
    liveUid: string,
    currentTime: number,
    name: string,
    play: boolean
  ) {
    await FirebaseStoreUtil.liveInfo(liveUid).update({
      currentTime,
      play,
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
    await FirebaseStoreUtil.setChangeUser(liveUid, name)
  }

  /**
   * set change user
   * @param liveUid
   * @param name
   */
  public static async setChangeUser(liveUid: string, name: string) {
    await FirebaseStoreUtil.changeUser(liveUid).add({
      name,
      createdAt: FirebaseStoreUtil.getTimeStamp(),
    })
  }

  /**
   * change user
   * @param liveUid
   */
  public static changeUser(liveUid: string) {
    return fireStore
      .collection("lives")
      .doc(liveUid)
      .withConverter(changeUserConverter)
      .collection("changeUsers")
  }

  /**
   * set play now
   * @param liveUid
   * @param currentTime
   * @param playNow
   */
  public static async setPlayNow(
    liveUid: string,
    currentTime: number,
    nextCnt: number
  ) {
    await FirebaseStoreUtil.liveInfo(liveUid).update({
      playNow: nextCnt,
      currentTime,
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
    await FirebaseStoreUtil.setChangeUser(liveUid, "")
  }

  /**
   * set video id
   * @param liveUid
   * @param videoId
   * @param listCnt
   * @param name
   * @param play
   */
  public static async setVideoId(
    liveUid: string,
    videoId: string,
    listCnt: number,
    name: string,
    title: string,
    image: string,
    play?: boolean
  ) {
    if (play) {
      await FirebaseStoreUtil.liveInfo(liveUid).update({
        listCnt,
        videoId: FirebaseStoreUtil.setArrayValue(videoId),
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
        play,
      })
    } else {
      await FirebaseStoreUtil.liveInfo(liveUid).update({
        listCnt,
        videoId: FirebaseStoreUtil.setArrayValue(videoId),
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
      })
    }
    await FirebaseStoreUtil.setChangeUser(liveUid, name)
    await FirebaseStoreUtil.setYouTubeList(liveUid, videoId, title, image)
  }

  /**
   * join flag
   * @param liveUid
   */
  public static joinFlag(liveUid: string) {
    return fireStore
      .collection("lives")
      .doc(liveUid)
      .withConverter(joinFlagConverter)
      .collection("joinFlag")
  }

  /**
   * set join flag
   * @param roomId
   */
  public static async setJoinFlag(roomId: string, userId: string) {
    await FirebaseStoreUtil.joinFlag(roomId).add({
      uid: userId,
      createdAt: FirebaseStoreUtil.getTimeStamp(),
    })
  }

  /**
   * get timestamp
   */
  public static getTimeStamp() {
    return firebase.firestore.FieldValue.serverTimestamp()
  }

  /**
   * set count
   */
  public static setCount(cnt: number): firebase.firestore.FieldValue {
    return firebase.firestore.FieldValue.increment(cnt)
  }

  /**
   * set array value
   * @param value
   */
  public static setArrayValue(value: any): firebase.firestore.FieldValue {
    return firebase.firestore.FieldValue.arrayUnion(value)
  }

  /**
   * users
   * @param uid
   */
  public static users(uid: string) {
    return fireStore.collection("users").withConverter(UserConverter).doc(uid)
  }

  /**
   * check user name
   * 新規ユーザーかどうか
   * @param uid
   */
  public static async checkUserName(uid: string) {
    const userNameDoc = await fireStore
      .collection("users")
      .withConverter(UserConverter)
      .doc(uid)
      .get()

    return userNameDoc.exists
  }

  /**
   * create user name
   *  @params name
   */
  public static async createUserName(name: string) {
    const user = FirebaseAuthenticationUtil.getCurrentUser()

    await FirebaseStoreUtil.users(user.uid).set({
      name,
      createdAt: FirebaseStoreUtil.getTimeStamp(),
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
    await user.updateProfile({ displayName: name })
  }

  /**
   * chat
   * @param roomId
   */
  public static chat(roomId: string) {
    return fireStore
      .collection("lives")
      .doc(roomId)
      .collection("chat")
      .withConverter(chatConverter)
  }

  /**
   * create comment
   * @param roomId
   * @param uid
   * @param name
   * @param comment
   */
  public static async createComment(
    roomId: string,
    uid: string,
    name: string,
    comment: string
  ) {
    await FirebaseStoreUtil.chat(roomId).add({
      uid,
      name,
      comment,
      createdAt: FirebaseStoreUtil.getTimeStamp(),
    })
  }

  /***
   * youtube list
   */
  public static youTubeList(roomId: string) {
    return fireStore
      .collection("lives")
      .doc(roomId)
      .collection("youTubeList")
      .withConverter(youTubeListConverter)
  }

  /**
   * set youTube list
   * @param roomId
   * @param videoId
   * @param title
   * @param image
   */
  public static async setYouTubeList(
    roomId: string,
    videoId: string,
    title: string,
    image: string
  ) {
    await FirebaseStoreUtil.youTubeList(roomId).doc(videoId).set({
      title,
      image,
      createdAt: FirebaseStoreUtil.getTimeStamp(),
    })
  }

  /**
   * get youTube title
   * @param roomId
   * @param videoId
   */
  public static async getYouTubeTitle(roomId: string, videoId: string) {
    const youTube = await FirebaseStoreUtil.youTubeList(roomId)
      .doc(videoId)
      .get()

    if (youTube.exists) return youTube.data().title
    else {
      const youTubeData = await FetchYouTubeUtil.fetchVideo(videoId)

      if (youTubeData.status === 200) return youTubeData.title
      else return ""
    }
  }

  /**
   * select youTube video
   * @param roomId
   * @param playNow
   */
  public static async selectYouTubeVideo(roomId: string, playNow: number) {
    await FirebaseStoreUtil.liveInfo(roomId).update({
      playNow,
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
      play: true,
      currentTime: 0,
    })
    await FirebaseStoreUtil.setChangeUser(roomId, "selectYouTubeVideoBot")
  }

  /**
   * sign in state from room
   * @param roomId
   * @param userId
   */
  public static signInState(roomId: string) {
    return fireStore.collection("lives").doc(roomId).collection("status")
  }

  /**
   * set room sign in state
   * @param roomId
   * @param userId
   */
  public static setRoomSignInState(roomId: string, userId: string) {
    const userStatusFireStoreRef = fireStore.doc(
      `/lives/${roomId}/status/${userId}`
    )
    const userStatusDatabaseRef = FirebaseDatabaseUtil.signInState(
      roomId,
      userId
    )

    const isOfflineForDatabase = {
      state: "offline",
      lastChanged: firebase.database.ServerValue.TIMESTAMP,
    }

    const isOnlineForDatabase = {
      state: "online",
      lastChanged: firebase.database.ServerValue.TIMESTAMP,
    }

    const isOfflineForFireStore = {
      state: "offline",
      lastChanged: FirebaseStoreUtil.getTimeStamp(),
    }

    const isOnlineForFireStore = {
      state: "online",
      lastChanged: FirebaseStoreUtil.getTimeStamp(),
    }

    FirebaseDatabaseUtil.connectedDB().on("value", (snapshot) => {
      if (snapshot.val() == false) {
        userStatusFireStoreRef.set(isOfflineForFireStore)
        return
      }

      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(() => {
          userStatusDatabaseRef.set(isOnlineForDatabase)
          userStatusFireStoreRef.set(isOnlineForFireStore)
        })
    })
  }

  public static youTubeListCnt(roomId: string) {
    return fireStore
      .collection("lives")
      .doc(roomId)
      .collection("youTubeListCnt")
      .withConverter(youTubeListCntConverter)
  }
}

export default FirebaseStoreUtil
