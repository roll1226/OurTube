import { useRouter } from "next/router"
import styled, { css } from "styled-components"
import HeadAtoms from "../../components/atoms/HeadAtoms"
import { OurTubePath } from "../../consts/PathConsts"
import AccountHeadMolecules from "../../components/molecules/AccountHeadMolecules"
import YouTubePlayerOrganisms from "../../components/organisms/YouTubePlayerOrganisms"

const ShareRoomContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const ContentWrap = styled.div<{ position: "left" | "right" }>`
  ${({ position }) =>
    position === "left" &&
    css`
      margin-left: 40px;
    `}
  ${({ position }) =>
    position === "right" &&
    css`
      margin-right: 40px;
    `}
`

const ShareRoom = () => {
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  return (
    <ShareRoomContainer>
      <HeadAtoms
        title={"OurTube | シェアルーム"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={`${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}`}
        top={false}
      />

      <AccountHeadMolecules />

      <ContentWrap position={"left"}>
        <YouTubePlayerOrganisms roomId={roomId} />
      </ContentWrap>

      <ContentWrap position={"right"}>
        <p>{roomId}</p>
      </ContentWrap>
    </ShareRoomContainer>
  )
}

export default ShareRoom
