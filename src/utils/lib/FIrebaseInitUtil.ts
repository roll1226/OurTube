import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import { env } from "../../env/DotEnv"

!firebase.apps.length
  ? firebase.initializeApp(env.getFirebaseConfig())
  : firebase.app()

class FirebaseInitUtil {
  /**
   * fire store
   */
  public static fireStore() {
    return firebase.firestore()
  }

  /**
   * firebase auth
   */
  public static firebaseAuth() {
    return firebase.auth()
  }
}

export default FirebaseInitUtil
