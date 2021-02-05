import firebase from "firebase/app"
import "firebase/firestore"
import { env } from "../../env/DotEnv"
import { liveConverter } from "../../models/firebase/LiveModel"
import { changeUserConverter } from "../../models/firebase/ChangeUserModel"

!firebase.apps.length
  ? firebase.initializeApp(env.getFirebaseConfig())
  : firebase.app()

export const store = firebase.firestore()

class FirebaseStoreUtil {
  /**
   * get live information
   *
   * @param liveUid
   * @return live info
   */
  public static getLiveInfo(liveUid: string) {
    return store.collection("lives").withConverter(liveConverter).doc(liveUid)
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
    currentTime: number
  ) {
    await FirebaseStoreUtil.getLiveInfo(liveUid).update({ play, currentTime })
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
    await FirebaseStoreUtil.getLiveInfo(liveUid).update({ currentTime, play })
    await FirebaseStoreUtil.setChangeUser(liveUid, name)
  }

  /**
   * set change user
   * @param liveUid
   * @param name
   */
  public static async setChangeUser(liveUid: string, name: string) {
    await store
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
  public static getChangeUser(liveUid: string) {
    return store
      .collection("lives")
      .doc(liveUid)
      .withConverter(changeUserConverter)
      .collection("changeUsers")
      .doc("user")
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
  public static setCount(cnt: number) {
    return firebase.firestore.FieldValue.increment(cnt)
  }
}

export default FirebaseStoreUtil
