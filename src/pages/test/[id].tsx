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
  return (
    <Test>
      <CommentAndSendUrlCardOrganisms />
    </Test>
  )
}

export default TestYouTube
