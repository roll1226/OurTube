import FirebaseInitUtil from "./FirebaseInitUtil"

export const firebaseFunctions = FirebaseInitUtil.firebaseFunctions()

class FirebaseFunctionsUtil {
  /**
   * create share room functions
   * @param uid
   * @param password
   * @param isPrivateRoom
   * @param videoId
   */
  public static createRoomFunc() {
    return firebaseFunctions.httpsCallable("apiService/api/creatRoom")
  }

  public static getYouTubeTitle() {
    return firebaseFunctions.httpsCallable("apiService/api/getYouTubeTitle")
  }
}

export default FirebaseFunctionsUtil
