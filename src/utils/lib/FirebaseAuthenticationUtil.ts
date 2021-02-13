import firebase from "firebase/app"
import FirebaseInitUtil from "./FIrebaseInitUtil"

const firebaseAuth = FirebaseInitUtil.firebaseAuth()

class FirebaseAuthenticationUtil {
  /**
   * get current user
   */
  public static getCurrentUser(): firebase.User | null {
    return firebaseAuth.currentUser
  }
}

export default FirebaseAuthenticationUtil
