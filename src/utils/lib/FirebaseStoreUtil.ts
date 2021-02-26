import firebase from "firebase/app"
import { roomConverter } from "../../models/firebase/RoomModel"
import { joinFlagConverter } from "../../models/firebase/JoinFlagModel"
import FirebaseInitUtil from "./FirebaseInitUtil"
import { UserConverter } from "../../models/firebase/UsersModel"
import FirebaseAuthenticationUtil from "./FirebaseAuthenticationUtil"
import { chatConverter } from "../../models/firebase/ChatModel"
import { youTubeListConverter } from "../../models/firebase/YouTubeListModel"
import LoggerUtil from "../debugger/LoggerUtil"
import { changeUserConverter } from "../../models/firebase/ChangeUserModel"
import FetchYouTubeUtil from "./FetchYouTubeUtil"
import FirebaseDatabaseUtil from "./FirebaseDatabaseUtil"
import { statusConverter } from "../../models/firebase/StatusModel"

const fireStore = FirebaseInitUtil.fireStore()

class FirebaseStoreUtil {
  /**
   * live info
   *
   * @param roomId
   * @return live info
   */
  public static room(roomId: string) {
    return fireStore
      .collection("rooms")
      .withConverter(roomConverter)
      .doc(roomId)
  }

  /**
   * set live play
   * @param roomId
   * @param play
   * @param name
   * @param currentTime
   */
  public static async setLivePlay(
    roomId: string,
    play: boolean,
    name: string,
    currentTime: number,
    playNow?: number
  ) {
    if (playNow) {
      await FirebaseStoreUtil.room(roomId).update({
        play,
        currentTime,
        playNow: FirebaseStoreUtil.setCount(1),
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
      })
    } else {
      await FirebaseStoreUtil.room(roomId).update({
        play,
        currentTime,
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
      })
    }
    await FirebaseStoreUtil.setChangeUser(roomId, name)
  }

  /**
   * set live current time
   * @param roomId
   * @param currentTime
   */
  public static async setLiveCurrentTime(
    roomId: string,
    currentTime: number,
    name: string
  ) {
    await FirebaseStoreUtil.room(roomId).update({
      currentTime,
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
    await FirebaseStoreUtil.setChangeUser(roomId, name)
  }

  /**
   * set change user
   * @param roomId
   * @param name
   */
  public static async setChangeUser(roomId: string, name: string) {
    await FirebaseStoreUtil.changeUser(roomId).add({
      name,
      createdAt: FirebaseStoreUtil.getTimeStamp(),
    })
  }

  /**
   * change user
   * @param roomId
   */
  public static changeUser(roomId: string) {
    return fireStore
      .collection("rooms")
      .doc(roomId)
      .withConverter(changeUserConverter)
      .collection("changeUsers")
  }

  /**
   * set play now
   * @param roomId
   * @param currentTime
   * @param playNow
   */
  public static async setPlayNow(
    roomId: string,
    currentTime: number,
    nextCnt: number
  ) {
    await FirebaseStoreUtil.room(roomId).update({
      playNow: nextCnt,
      currentTime,
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
    await FirebaseStoreUtil.setChangeUser(roomId, "")
  }

  /**
   * set video id
   * @param roomId
   * @param videoId
   * @param listCnt
   * @param name
   * @param play
   */
  public static async setVideoId(
    roomId: string,
    videoId: string,
    listCnt: number,
    name: string,
    title: string,
    image: string,
    play?: boolean
  ) {
    if (play) {
      await FirebaseStoreUtil.room(roomId).update({
        listCnt,
        videoId: FirebaseStoreUtil.setArrayValue(videoId),
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
        play,
      })
    } else {
      await FirebaseStoreUtil.room(roomId).update({
        listCnt,
        videoId: FirebaseStoreUtil.setArrayValue(videoId),
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
      })
    }
    await FirebaseStoreUtil.setChangeUser(roomId, name)
    await FirebaseStoreUtil.setYouTubeList(roomId, videoId, title, image)
  }

  /**
   * join flag
   * @param roomId
   */
  public static joinFlag(roomId: string) {
    return fireStore
      .collection("rooms")
      .doc(roomId)
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
   * get user data
   * @param uid
   */
  public static async getUserData(uid: string) {
    const userData = await fireStore
      .collection("users")
      .withConverter(UserConverter)
      .doc(uid)
      .get()

    return userData
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
      joinedRooms: [],
      createdAt: FirebaseStoreUtil.getTimeStamp(),
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
    await user.updateProfile({ displayName: name })
  }

  public static async setUserJoinedRoom(roomId: string, userId: string) {
    await FirebaseStoreUtil.users(userId).update({
      joinedRooms: FirebaseStoreUtil.setArrayValue(roomId),
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
  }

  /**
   * chat
   * @param roomId
   */
  public static chat(roomId: string) {
    return fireStore
      .collection("rooms")
      .doc(roomId)
      .collection("chat")
      .withConverter(chatConverter)
  }

  /**
   * create comment
   * @param roomId
   * @param photoURL
   * @param uid
   * @param name
   * @param comment
   */
  public static async createComment(
    roomId: string,
    photoURL: string,
    uid: string,
    name: string,
    comment: string
  ) {
    await FirebaseStoreUtil.chat(roomId).add({
      uid,
      photoURL,
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
      .collection("rooms")
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
    await FirebaseStoreUtil.room(roomId).update({
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
    return fireStore
      .collection("rooms")
      .doc(roomId)
      .collection("status")
      .withConverter(statusConverter)
  }

  /**
   * set room sign in state
   * @param roomId
   * @param userId
   * @param photoURL
   */
  public static setRoomSignInState(
    roomId: string,
    userId: string,
    photoURL: string
  ) {
    const userStatusFireStoreRef = fireStore.doc(
      `/rooms/${roomId}/status/${userId}`
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
      photoURL,
      lastChanged: FirebaseStoreUtil.getTimeStamp(),
    }

    const isOnlineForFireStore = {
      state: "online",
      photoURL,
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

  /**
   * get sign in use state
   * @param roomId
   */
  public static async getSignInUserState(roomId: string) {
    const signInUserState = await FirebaseStoreUtil.signInState(roomId)
      .where("state", "==", "online")
      .limit(1)
      .get()

    return signInUserState.docs[0].id
  }

  public static async checkYouTubeVideoId(roomId: string, videoId: string) {
    const isVideoId = await FirebaseStoreUtil.youTubeList(roomId)
      .doc(videoId)
      .get()

    return isVideoId.exists
  }
}

export default FirebaseStoreUtil
