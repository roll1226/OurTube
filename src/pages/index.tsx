import HeadAtoms from "../components/atoms/HeadAtoms"
import OurTubeLogoAtoms, {
  LogoColor,
} from "../components/atoms/svg/OurTubeLogoAtoms"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import styled from "styled-components"
import SignInContainerOrganisms from "../components/organisms/SignInContainerOrganisms"
import FirebaseAuthenticationUtil from "../utils/lib/FirebaseAuthenticationUtil"
import FirebaseStoreUtil from "../utils/lib/FirebaseStoreUtil"
import { useRouter } from "next/router"
import { OurTubePath } from "../consts/PathConsts"
import {
  GeneralText,
  GeneralFontSize,
  GeneralFontWeight,
} from "../styles/typography/GeneralTextStyle"
import { useDispatch } from "react-redux"
import modalSlice from "../ducks/modal/slice"
import LoggerUtil from "../utils/debugger/LoggerUtil"
import toastSlice from "../ducks/toast/slice"

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
  const router = useRouter()
  const dispatch = useDispatch()

  const isNameStore = async (uid: string) => {
    const isName = await FirebaseStoreUtil.checkUserName(uid)
    if (isName) router.push(OurTubePath.CREATE_ROOM)
    else router.push(OurTubePath.CREATE_ACCOUNT)
  }

  const signInError = () => {
    dispatch(toastSlice.actions.setIsActive(true))
    dispatch(toastSlice.actions.setText("サインインに失敗した"))
    dispatch(toastSlice.actions.setToastColor("error"))
    setTimeout(() => {
      dispatch(toastSlice.actions.setIsActive(false))
    }, 2000)
  }

  const googleSignInClick = async () => {
    dispatch(modalSlice.actions.setLoading(true))
    try {
      const { user } = await FirebaseAuthenticationUtil.signInForGoogle()
      isNameStore(user.uid)
    } catch (error) {
      signInError()
    }
    dispatch(modalSlice.actions.setLoading(false))
  }
  const twitterSignInClick = async () => {
    dispatch(modalSlice.actions.setLoading(true))
    try {
      const { user } = await FirebaseAuthenticationUtil.signInForTwitter()
      isNameStore(user.uid)
    } catch (error) {
      signInError()
    }
    dispatch(modalSlice.actions.setLoading(false))
  }

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
        <SignInContainerOrganisms
          googleSignInClick={googleSignInClick}
          twitterSignInClick={twitterSignInClick}
        />
      </SignInContainer>
    </TopPageContainer>
  )
}

export default TopPage
