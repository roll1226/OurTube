import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/functions"
import { env } from "../../env/DotEnv"

const isEmulator = () => {
  const useEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR
  return !!(useEmulator && useEmulator === "true")
}

if (!firebase.apps.length) {
  firebase.initializeApp(env.getFirebaseConfig())

  if (isEmulator()) {
    firebase.auth().useEmulator("http://localhost:9099")
    firebase.functions().useEmulator("localhost", 5001)
    firebase.firestore().useEmulator("localhost", 8080)
  }
} else {
  firebase.app()
}

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
   * firebase cloud functions
   */
  public static firebaseFunctions() {
    return firebase.functions()
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
