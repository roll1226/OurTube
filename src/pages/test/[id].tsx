import { useRouter } from "next/router"
import CommentAndSendUrlCardOrganisms from "../../components/organisms/CommentAndSendUrlCardOrganisms"
import styled from "styled-components"

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

  return (
    <Test>
      <CommentAndSendUrlCardOrganisms roomId={roomId} />
    </Test>
  )
}

export default TestYouTube
