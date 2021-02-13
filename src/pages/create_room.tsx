import HeadAtoms from "../components/atoms/HeadAtoms"
import styled, { keyframes } from "styled-components"
import { DefaultAnimation } from "../styles/animation/GeneralAnimationStyle"
import CreateRoomMolecules from "../components/molecules/CreateRoomMolecules"
import SignOutButtonMolecules from "../components/molecules/SignOutButtonMolecules"
import OurTubeLogoAtoms, {
  LogoColor,
} from "../components/atoms/svg/OurTubeLogoAtoms"

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

const LogoContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
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

      <LogoContainer>
        <OurTubeLogoAtoms size={240} color={LogoColor.WHITE} />
      </LogoContainer>

      <SignOutButtonMolecules />

      <CreateRoomCard>
        <CreateRoomMolecules />
      </CreateRoomCard>
    </CreateRoomContainer>
  )
}

export default CreateRoom
