import HeadAtoms from "../components/atoms/HeadAtoms"
import OurTubeLogoAtoms, {
  LogoColor,
} from "../components/atoms/svg/OurTubeLogoAtoms"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import styled from "styled-components"
import SignInContainerOrganisms from "../components/organisms/SignInContainerOrganisms"
import {
  GeneralText,
  GeneralFontSize,
  GeneralFontWeight,
} from "../styles/typography/GeneralTextStyle"

const TopPageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const LogoContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
`

const TopMessageContainer = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
`

const SignInContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`

const TopPage = () => {
  return (
    <TopPageContainer>
      <HeadAtoms
        title={"OurTube"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={"/"}
        top={true}
      />

      <LogoContainer>
        <OurTubeLogoAtoms size={500} color={LogoColor.BLUE} />
      </LogoContainer>

      <TopMessageContainer>
        <GeneralText
          fontSize={GeneralFontSize.SIZE_56}
          fontWeight={GeneralFontWeight.BOLD}
          fontColor={GeneralColorStyle.ThinGreen}
        >
          お気に入りの動画を
        </GeneralText>
        <GeneralText
          fontSize={GeneralFontSize.SIZE_56}
          fontWeight={GeneralFontWeight.BOLD}
          fontColor={GeneralColorStyle.ThinGreen}
        >
          家族、恋人、友人とともに
        </GeneralText>
      </TopMessageContainer>

      <SignInContainer>
        <SignInContainerOrganisms />
      </SignInContainer>
    </TopPageContainer>
  )
}

export default TopPage
