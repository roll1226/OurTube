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
import FetchYouTubeUtil from "../../utils/lib/FetchYouTubeUtil"

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
    const test = async () => {
      const result = await FetchYouTubeUtil.searchYouTubeVide("HIKAKIN")
    }
  }, [])

  return <Test></Test>
}

export default TestYouTube
