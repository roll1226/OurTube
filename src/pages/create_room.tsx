import HeadAtoms from "../components/atoms/HeadAtoms"
import styled, { keyframes } from "styled-components"
import { DefaultAnimation } from "../styles/animation/GeneralAnimationStyle"
import CreateRoomMolecules from "../components/molecules/CreateRoomMolecules"
import AccountHeadMolecules from "../components/molecules/AccountHeadMolecules"
import JoinedRoomMolecules from "../components/molecules/JoinedRoomMolecules"
import { GeneralSpacer } from "../styles/spacer/GeneralSpacerStyle"

const CreateRoomContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`

const CreateRoomCard = styled.div`
  transform: scale(0);
  animation: 350ms ${DefaultAnimation} 0s forwards ${keyframes`
    from { transform: scale(0) }
    to { transform: scale(1) }
  `};
`

const CreateRoom = () => {
  return (
    <CreateRoomContainer>
      <HeadAtoms
        title={"OurTube | ルーム作成"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={"/"}
        top={false}
      />
      <AccountHeadMolecules />
      <CreateRoomCard>
        <CreateRoomMolecules />
      </CreateRoomCard>
      <GeneralSpacer horizontal={64} />
      <CreateRoomCard>
        <JoinedRoomMolecules />
      </CreateRoomCard>
    </CreateRoomContainer>
  )
}

export default CreateRoom
