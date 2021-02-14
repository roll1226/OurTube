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

  /**
   * Auth Google
   */
  public static authGoogleProvider() {
    return new firebase.auth.GoogleAuthProvider()
  }

  /**
   * Auth Twitter
   */
  public static authTwitterProvider() {
    return new firebase.auth.TwitterAuthProvider()
  }
}

export default FirebaseInitUtil
