import FirebaseInitUtil from "./FIrebaseInitUtil"

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
    return firebaseFunctions.httpsCallable("apiService/api/setYouTubeTitle")
  }
}

export default FirebaseFunctionsUtil
