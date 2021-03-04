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
import ButtonAtoms from "../components/atoms/ButtonAtoms"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import IconAtoms from "../components/atoms/IconAtoms"
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import NotionButtonMolecules from "../components/molecules/NotionButtonMolecules"

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
  const [changeCard, setChangeCard] = useState(true)

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
        top={true}
      />
      <AccountHeadMolecules />

      {isWide && (
        <>
          <CreateRoomCard>
            <CreateRoomOrganisms />
          </CreateRoomCard>
          <GeneralSpacer horizontal={64} />
          <CreateRoomCard>
            <JoinedRoomOrganisms />
          </CreateRoomCard>
        </>
      )}

      {!isWide && (
        <>
          {changeCard && (
            <CreateRoomCard>
              <CreateRoomOrganisms />
            </CreateRoomCard>
          )}

          {!changeCard && (
            <CreateRoomCard>
              <JoinedRoomOrganisms />
            </CreateRoomCard>
          )}

          <GeneralSpacer vertical={16} />

          <ButtonAtoms
            bgColor={GeneralColorStyle.White}
            outlineColor={GeneralColorStyle.Black}
            text={"切り替える"}
            fontColor={GeneralColorStyle.Black}
            icon={
              <IconAtoms
                style={{
                  color: GeneralColorStyle.Black,
                  width: 20,
                }}
                icon={faSyncAlt}
              />
            }
            onClick={() => setChangeCard((v) => !v)}
          />
        </>
      )}

      {modalState.roomId && (
        <DoneCreateRoomOrganisms
          roomId={modalState.roomId}
          password={modalState.password}
          isOpen={modalState.isOpen}
        />
      )}

      <NotionButtonMolecules />
    </CreateRoomContainer>
  )
}

export default CreateRoom
