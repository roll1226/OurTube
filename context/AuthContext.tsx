import firebase from "firebase/app"
import FirebaseInitUtil from "@src/utils/lib/FirebaseInitUtil"
import { FC, createContext, useEffect, useState } from "react"

type AuthContextProps = {
  currentUser: firebase.User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined })

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<
    firebase.User | null | undefined
  >(undefined)

  useEffect(() => {
    // ログイン状態が変化するとfirebaseのauthメソッドを呼び出す
    FirebaseInitUtil.firebaseAuth().onAuthStateChanged(
      (user: firebase.User) => {
        setCurrentUser(user)
      }
    )
  }, [])

  /* 下階層のコンポーネントをラップする */
  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
