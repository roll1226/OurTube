import { useRouter } from "next/router"
import CommentAndSendUrlCardOrganisms from "../../components/organisms/CommentAndSendUrlCardOrganisms"
import styled from "styled-components"
import { useEffect } from "react"
import FirebaseInitUtil from "../../utils/lib/FirebaseInitUtil"
import FirebaseFunctionsUtil from "../../utils/lib/FirebaseFunctions"

const Test = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const TestYouTube = () => {
  // const router = useRouter()
  // const { id } = router.query
  // const roomId = id as string
  useEffect(() => {
    const test = async () => {
      const res = await fetch(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,status&id=jOteKI&key=AIzaSyBoe-uXqkDuEPFhLbfgXx2Wtsm7VzrBa8E"
      )
      const json = await res.json()
    }
    test()
  }, [])

  return <Test></Test>
}

export default TestYouTube
