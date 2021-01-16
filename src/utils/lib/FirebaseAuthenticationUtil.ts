import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { env } from "../../env/DotEnv"

!firebase.apps.length
  ? firebase.initializeApp(env.getFirebaseConfig())
  : firebase.app()

const auth = firebase.auth()

class FirebaseAuthenticationUtil {}

export default FirebaseAuthenticationUtil
