import HeadAtoms from "../components/atoms/HeadAtoms"
import InsertAccountNameMolecules from "../components/molecules/InsertAccountNameMolecules"
import styled, { keyframes } from "styled-components"
import { DefaultAnimation } from "../styles/animation/GeneralAnimationStyle"

const CreateAccountContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const InsertAccountNameCard = styled.div`
  transform: scale(0);
  animation: 350ms ${DefaultAnimation} 0s forwards ${keyframes`
    from { transform: scale(0) }
    to { transform: scale(1) }
  `};
`

const createAccount = () => {
  return (
    <CreateAccountContainer>
      <HeadAtoms
        title={"OurTube | アカウント作成"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={"/"}
        top={false}
      />
      <InsertAccountNameCard>
        <InsertAccountNameMolecules />
      </InsertAccountNameCard>
    </CreateAccountContainer>
  )
}

export default createAccount
