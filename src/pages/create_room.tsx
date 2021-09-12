import firebase from "firebase/app"
import HeadAtom from "../components/atoms/HeadAtom"
import styled, { keyframes, css } from "styled-components"
import { DefaultAnimation } from "../styles/animation/GeneralAnimationStyle"
import CreateRoomOrganism from "../components/organisms/CreateRoomOrganism"
import AccountHeadMolecule from "../components/molecules/AccountHeadMolecule"
import JoinedRoomOrganism from "../components/organisms/JoinedRoomOrganism"
import { GeneralSpacer } from "../styles/spacer/GeneralSpacerStyle"
import DoneCreateRoomOrganism from "../components/organisms/DoneCreateRoomOrganism"
import { useModalState } from "../ducks/modal/selectors"
import { useEffect } from "react"
import FirebaseDatabaseUtil from "../utils/lib/FirebaseDatabaseUtil"
import useMedia from "use-media"
import ButtonAtom from "../components/atoms/ButtonAtom"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import IconAtom from "../components/atoms/IconAtom"
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import NotionButtonMolecule from "../components/molecules/NotionButtonMolecule"
import FirebaseStoreUtil from "@src/utils/lib/FirebaseStoreUtil"
import FirebaseInitUtil from "@src/utils/lib/FirebaseInitUtil"
import { useRouter } from "next/router"
import LoggerUtil from "@src/utils/debugger/LoggerUtil"

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
  const router = useRouter()
  const modalState = useModalState().modal
  const isWide = useMedia({ minWidth: "480px" })
  const [changeCard, setChangeCard] = useState(true)

  useEffect(() => {
    FirebaseInitUtil.firebaseAuth().onAuthStateChanged(
      async (user: firebase.User) => {
        if (!user) return router.replace("/")

        FirebaseDatabaseUtil.offlineState()
        await FirebaseStoreUtil.users(user.uid).update({
          nowRoomId: "",
          updatedAt: FirebaseStoreUtil.getTimeStamp(),
        })
      }
    )
  }, [])

  return (
    <CreateRoomContainer isWide={isWide}>
      <HeadAtom
        title={"OurTube | ルーム作成"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={"/"}
        top={true}
      />
      <AccountHeadMolecule />

      {isWide && (
        <>
          <CreateRoomCard>
            <CreateRoomOrganism />
          </CreateRoomCard>
          <GeneralSpacer horizontal={64} />
          <CreateRoomCard>
            <JoinedRoomOrganism />
          </CreateRoomCard>
        </>
      )}

      {!isWide && (
        <>
          {changeCard && (
            <CreateRoomCard>
              <CreateRoomOrganism />
            </CreateRoomCard>
          )}

          {!changeCard && (
            <CreateRoomCard>
              <JoinedRoomOrganism />
            </CreateRoomCard>
          )}

          <GeneralSpacer vertical={16} />

          <ButtonAtom
            bgColor={GeneralColorStyle.White}
            outlineColor={GeneralColorStyle.Black}
            text={"切り替える"}
            fontColor={GeneralColorStyle.Black}
            icon={
              <IconAtom
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
        <DoneCreateRoomOrganism
          roomId={modalState.roomId}
          password={modalState.password}
          isOpen={modalState.isOpen}
        />
      )}

      <NotionButtonMolecule href={true} />
    </CreateRoomContainer>
  )
}

export default CreateRoom
