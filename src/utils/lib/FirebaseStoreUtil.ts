import firebase from "firebase/app"
import { liveConverter, LiveModel } from "../../models/firebase/LiveModel"
import { joinFlagConverter, JoinFlag } from "../../models/firebase/JoinFlag"
import FirebaseInitUtil from "./FIrebaseInitUtil"
import { UserConverter } from "../../models/firebase/UsersModel"
import LoggerUtil from "../debugger/LoggerUtil"
import {
  changeUserConverter,
  ChangeUser,
} from "../../models/firebase/ChangeUserModel"

const fireStore = FirebaseInitUtil.fireStore()

class FirebaseStoreUtil {
  /**
   * get live information
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
    await fireStore
      .collection("lives")
      .doc(liveUid)
      .collection("changeUsers")
      .doc("user")
      .withConverter(changeUserConverter)
      .update({
        name,
        updatedAt: FirebaseStoreUtil.getTimeStamp(),
        changeCnt: FirebaseStoreUtil.setCount(1),
      })
  }

  /**
   * get change user
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

    LoggerUtil.debug(userNameDoc.exists)

    const userName = userNameDoc.exists ? userNameDoc.data().name : ""

    return userName
  }
}

export default FirebaseStoreUtil
