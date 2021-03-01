import { useState, useEffect } from "react"
import firebase from "firebase/app"
import { firebaseAuth } from "../utils/lib/FirebaseAuthenticationUtil"

const useFirebaseAuthentication = (): firebase.User | null => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unlisten = firebaseAuth.onAuthStateChanged((authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null)
    })
    return () => {
      unlisten()
    }
  })

  return authUser
}

export default useFirebaseAuthentication
