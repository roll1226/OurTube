import { useRouter } from "next/router"
import CommentAndSendUrlCardOrganisms from "../../components/organisms/CommentAndSendUrlCardOrganisms"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react"
import FirebaseInitUtil from "../../utils/lib/FirebaseInitUtil"
import FirebaseFunctionsUtil from "../../utils/lib/FirebaseFunctions"
import FirebaseAuthenticationUtil, {
  firebaseAuth,
} from "../../utils/lib/FirebaseAuthenticationUtil"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import useFirebaseAuthentication from "../../../hooks/useFirebaseAuthentication"
import firebase from "firebase/app"

const Test = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const TestYouTube = () => {
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string
  const authUser = useFirebaseAuthentication()

  useEffect(() => {
    LoggerUtil.debug("authUser")

    if (!authUser) return

    LoggerUtil.debug(authUser)

    const userStatusFirestoreRef = firebase
      .firestore()
      .doc(`/lives/${roomId}/status/${authUser.uid}`)
    const userStatusDatabaseRef = FirebaseInitUtil.firebaseDatabase().ref(
      `/lives/${roomId}/status/${authUser.uid}`
    )

    // オフライン時の設定値
    const isOfflineForDatabase = {
      state: "offline",
      lastChanged: firebase.database.ServerValue.TIMESTAMP,
    }

    // オンライン時の設定値
    const isOnlineForDatabase = {
      state: "online",
      lastChanged: firebase.database.ServerValue.TIMESTAMP,
    }

    const isOfflineForFirestore = {
      state: "offline",
      lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
    }

    const isOnlineForFirestore = {
      state: "online",
      lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
    }

    FirebaseInitUtil.firebaseDatabase()
      .ref(".info/connected")
      .on("value", function (snapshot) {
        // オフライン時は何もしない
        if (snapshot.val() == false) {
          userStatusFirestoreRef.set(isOfflineForFirestore)
          return
        }

        // onDisconnect()を使って、オフライン時の処理を予約しておく
        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            // オンラインにする
            userStatusDatabaseRef.set(isOnlineForDatabase)
            userStatusFirestoreRef.set(isOnlineForFirestore)
          })
      })
    // FirebaseStoreUtil.setRoomSignInState(roomId, authUser.uid)
  }, [authUser, roomId])

  return <Test></Test>
}

export default TestYouTube
