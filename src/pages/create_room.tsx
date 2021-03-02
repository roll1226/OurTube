import HeadAtoms from "../components/atoms/HeadAtoms"
import styled, { keyframes, css } from "styled-components"
import { DefaultAnimation } from "../styles/animation/GeneralAnimationStyle"
import CreateRoomOrganisms from "../components/organisms/CreateRoomOrganisms"
import AccountHeadMolecules from "../components/molecules/AccountHeadMolecules"
import JoinedRoomOrganisms from "../components/organisms/JoinedRoomOrganisms"
import { GeneralSpacer } from "../styles/spacer/GeneralSpacerStyle"
import DoneCreateRoomOrganisms from "../components/organisms/DoneCreateRoomOrganisms"
import { useModalState } from "../ducks/modal/selectors"
import { useEffect } from "react"
import FirebaseDatabaseUtil from "../utils/lib/FirebaseDatabaseUtil"
import useMedia from "use-media"

const CreateRoomContainer = styled.div<{ isWide: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  ${({ isWide }) =>
    isWide &&
    css`
      flex-direction: row;
    `}
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
  const isWide = useMedia({ minWidth: "480px" })

  useEffect(() => {
    FirebaseDatabaseUtil.offlineState()
  }, [])

  return (
    <CreateRoomContainer isWide={isWide}>
      <HeadAtoms
        title={"OurTube | ルーム作成"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={"/"}
        top={false}
      />
      <AccountHeadMolecules />
      {!isWide && <GeneralSpacer vertical={60} />}
      <CreateRoomCard>
        <CreateRoomOrganisms />
      </CreateRoomCard>
      {isWide && <GeneralSpacer horizontal={64} />}
      {!isWide && <GeneralSpacer vertical={12} />}
      <CreateRoomCard>
        <JoinedRoomOrganisms />
      </CreateRoomCard>

      {modalState.roomId && (
        <DoneCreateRoomOrganisms
          roomId={modalState.roomId}
          password={modalState.password}
          isOpen={modalState.isOpen}
        />
      )}
    </CreateRoomContainer>
  )
}

export default CreateRoom
