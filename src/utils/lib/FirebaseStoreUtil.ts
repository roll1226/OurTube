import firebase from "firebase/app"
import "firebase/firestore"
import { env } from "../../env/DotEnv"
import LoggerUtil from "../debugger/LoggerUtil"

!firebase.apps.length
  ? firebase.initializeApp(env.getFirebaseConfig())
  : firebase.app()

const store = firebase.firestore()

class FirebaseStoreUtil {
  public static async getChats() {
    const data = []

    await store
      .collection("chat")
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          data.push(
            Object.assign(
              {
                id: doc.id,
              },
              doc.data()
            )
          )
        })
      })
      .catch((err) => {
        LoggerUtil.debug(err)
      })

    LoggerUtil.debug(data)
  }
}

export default FirebaseStoreUtil
