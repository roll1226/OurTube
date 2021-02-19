import FirebaseInitUtil from "./FirebaseInitUtil"

export const firebaseFunctions = FirebaseInitUtil.firebaseFunctions()

class FirebaseFunctionsUtil {
  /**
   * create share room function
   */
  public static createRoomFunc() {
    return firebaseFunctions.httpsCallable("apiService/api/creatRoom")
  }

  /**
   * delete youTube list cnt function
   */
  // public static deleteYouTubeListCntFunc() {
  //   return firebaseFunctions.httpsCallable(
  //     "apiService/api/deleteYouTubeListCnt"
  //   )
  // }
}

export default FirebaseFunctionsUtil
