import FirebaseInitUtil from "./FirebaseInitUtil"

export const firebaseFunctions = FirebaseInitUtil.firebaseFunctions()

class FirebaseFunctionsUtil {
  /**
   * create share room functions
   */
  public static createRoomFunc() {
    return firebaseFunctions.httpsCallable("apiService/api/creatRoom")
  }
}

export default FirebaseFunctionsUtil
