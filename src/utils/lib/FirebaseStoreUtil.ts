import firebase from "firebase/app"
import { liveConverter, LiveModel } from "../../models/firebase/LiveModel"
import { joinFlagConverter, JoinFlag } from "../../models/firebase/JoinFlag"
import FirebaseInitUtil from "./FIrebaseInitUtil"
import { UserConverter } from "../../models/firebase/UsersModel"
import FirebaseAuthenticationUtil from "./FirebaseAuthenticationUtil"
import {
  changeUserConverter,
  ChangeUser,
} from "../../models/firebase/ChangeUserModel"

const fireStore = FirebaseInitUtil.fireStore()

class FirebaseStoreUtil {
  /**
   * live info
   *
   * @param liveUid
   * @return live info
   */
  public static liveInfo(
    liveUid: string
  ): firebase.firestore.DocumentReference<LiveModel> {
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
        playNow,
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
    await FirebaseStoreUtil.changeUser(liveUid).update({
      name,
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
      changeCnt: FirebaseStoreUtil.setCount(1),
    })
  }

  /**
   * change user
   * @param liveUid
   */
  public static changeUser(
    liveUid: string
  ): firebase.firestore.DocumentReference<ChangeUser> {
    return fireStore
      .collection("lives")
      .doc(liveUid)
      .collection("changeUsers")
      .withConverter(changeUserConverter)
      .doc("user")
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
    playNow: number
  ) {
    await FirebaseStoreUtil.liveInfo(liveUid).update({
      playNow,
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
  }

  /**
   * join flag
   * @param liveUid
   */
  public static joinFlag(
    liveUid: string
  ): firebase.firestore.DocumentReference<JoinFlag> {
    return fireStore
      .collection("lives")
      .doc(liveUid)
      .collection("joinFlag")
      .withConverter(joinFlagConverter)
      .doc("flag")
  }

  /**
   * set join flag
   * @param liveUid
   */
  public static async setJoinFlag(liveUid: string) {
    await FirebaseStoreUtil.joinFlag(liveUid).update({
      flagCnt: FirebaseStoreUtil.setCount(1),
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
  }

  /**
   * get timestamp
   */
  public static getTimeStamp() {
    return firebase.firestore.Timestamp.now()
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

  public static async createShareRoom(
    uid: string,
    password: string,
    isPrivateRoom: boolean,
    videoId: string
  ) {
    const liveRoom = await fireStore
      .collection("lives")
      .withConverter(liveConverter)
      .add({
        currentTime: 0,
        hostId: uid,
        listCnt: 1,
        password: isPrivateRoom ? password : "",
        privateRoom: isPrivateRoom,
        play: false,
        playNow: 0,
        videoId: [videoId],
        createdAt: FirebaseStoreUtil.getTimeStamp(),
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
      })

    const roomId = liveRoom.id

    await FirebaseStoreUtil.changeUser(roomId).set({
      changeCnt: 0,
      name: "",
      createdAt: FirebaseStoreUtil.getTimeStamp(),
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })

    await FirebaseStoreUtil.joinFlag(roomId).set({
      flagCnt: 0,
      createdAt: FirebaseStoreUtil.getTimeStamp(),
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })

    return roomId
  }
}

export default FirebaseStoreUtil
