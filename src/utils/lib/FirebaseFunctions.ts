import FirebaseInitUtil from "./FirebaseInitUtil"

export const firebaseFunctions = FirebaseInitUtil.firebaseFunctions()

class FirebaseFunctionsUtil {
  /**
   * create share room functions
   */
  public static createRoomFunc() {
    return firebaseFunctions.httpsCallable("apiService/api/creatRoom")
  }

  /**
   * get youTube title
   */
  public static getYouTubeTitle() {
    return firebaseFunctions.httpsCallable("apiService/api/getYouTubeTitle")
  }

  /**
   * add youTUbe url
   */
  public static addYouTubeUrl() {
    return firebaseFunctions.httpsCallable("apiService/api/addYouTubeUrl")
  }
}

export default FirebaseFunctionsUtil
