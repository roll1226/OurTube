import HeadAtoms from "../components/atoms/HeadAtoms"
import styled, { keyframes } from "styled-components"
import { DefaultAnimation } from "../styles/animation/GeneralAnimationStyle"
import CreateRoomOrganisms from "../components/organisms/CreateRoomOrganisms"
import AccountHeadMolecules from "../components/molecules/AccountHeadMolecules"
import JoinedRoomOrganisms from "../components/organisms/JoinedRoomOrganisms"
import { GeneralSpacer } from "../styles/spacer/GeneralSpacerStyle"
import DoneCreateRoomOrganisms from "../components/organisms/DoneCreateRoomOrganisms"
import { useModalState } from "../ducks/modal/selectors"

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
  const modalState = useModalState().modal

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
        <CreateRoomOrganisms />
      </CreateRoomCard>
      <GeneralSpacer horizontal={64} />
      <CreateRoomCard>
        <JoinedRoomOrganisms />
      </CreateRoomCard>

      {modalState.roomId && (
        <DoneCreateRoomOrganisms
          roomId={modalState.roomId}
          isOpen={modalState.isOpen}
        />
      )}
    </CreateRoomContainer>
  )
}

export default CreateRoom
