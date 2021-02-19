import FirebaseInitUtil from "./FirebaseInitUtil"

const database = FirebaseInitUtil.firebaseDatabase()

class FirebaseDatabaseUtil {
  /**
   * sign in state from share room
   * @param roomId
   * @param userId
   */
  public static signInState(roomId: string, userId: string) {
    return database.ref(`/lives/${roomId}/status/${userId}`)
  }

  public static connectedDB() {
    return database.ref(".info/connected")
  }
}

export default FirebaseDatabaseUtil
