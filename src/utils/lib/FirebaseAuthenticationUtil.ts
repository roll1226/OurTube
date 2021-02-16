import firebase from "firebase/app"
import FirebaseInitUtil from "./FirebaseInitUtil"

export const firebaseAuth = FirebaseInitUtil.firebaseAuth()

class FirebaseAuthenticationUtil {
  /**
   * get current user
   */
  public static getCurrentUser(): firebase.User | null {
    return firebaseAuth.currentUser
  }

  /**
   * sign in for google
   */
  public static signInForGoogle() {
    const providerForGoogle = FirebaseInitUtil.authGoogleProvider()

    return firebaseAuth.signInWithPopup(providerForGoogle)
  }

  /**
   * sign in for twitter
   */
  public static signInForTwitter() {
    const providerForTwitter = FirebaseInitUtil.authTwitterProvider()

    return firebaseAuth.signInWithPopup(providerForTwitter)
  }

  /**
   * sign in for anonymously
   */
  public static SignInForAnonymously() {
    return firebaseAuth.signInAnonymously()
  }

  /**
   * sign out
   */
  public static async SingOut() {
    await firebaseAuth.signOut()
  }
}

export default FirebaseAuthenticationUtil
