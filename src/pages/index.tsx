import HeadAtom from "../components/atoms/HeadAtom"
import OurTubeLogoAtom, {
  LogoColor,
} from "../components/atoms/svg/OurTubeLogoAtom"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import styled, { css } from "styled-components"
import SignInContainerOrganism from "../components/organisms/SignInContainerOrganism"
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
import useMedia from "use-media"
import ToastUtil from "@src/utils/toast/ToastUtil"

const TopPageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const LogoContainer = styled.div<{ isWide: boolean }>`
  position: absolute;
  top: 28px;
  left: 28px;

  ${({ isWide }) =>
    isWide &&
    css`
      top: 40px;
      left: 40px;
    `}
`

const TopMessageContainer = styled.div<{ isWide: boolean }>`
  margin-left: 28px;
  display: flex;
  flex-direction: column;

  ${({ isWide }) =>
    isWide &&
    css`
      margin-left: 40px;
    `}
`

const SignInContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
`

const TopPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isWide = useMedia({ minWidth: "480px" })

  const isNameStore = async (uid: string) => {
    const isName = await FirebaseStoreUtil.checkUserName(uid)
    if (isName) router.push(OurTubePath.CREATE_ROOM)
    else router.push(OurTubePath.CREATE_ACCOUNT)
  }

  const signInError = () => {
    ToastUtil.error("サインインに失敗した")
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
      <HeadAtom
        title={"OurTube"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={"/"}
        top={true}
      />

      <LogoContainer isWide={isWide}>
        <OurTubeLogoAtom size={isWide ? 500 : 200} color={LogoColor.BLUE} />
      </LogoContainer>

      <TopMessageContainer isWide={isWide}>
        <GeneralText
          fontSize={isWide ? GeneralFontSize.SIZE_56 : GeneralFontSize.SIZE_24}
          fontWeight={GeneralFontWeight.BOLD}
          fontColor={GeneralColorStyle.ThinGreen}
        >
          お気に入りの動画を
        </GeneralText>
        <GeneralText
          fontSize={isWide ? GeneralFontSize.SIZE_56 : GeneralFontSize.SIZE_24}
          fontWeight={GeneralFontWeight.BOLD}
          fontColor={GeneralColorStyle.ThinGreen}
        >
          家族、恋人、友人とともに
        </GeneralText>
      </TopMessageContainer>

      <SignInContainer>
        <SignInContainerOrganism
          googleSignInClick={googleSignInClick}
          twitterSignInClick={twitterSignInClick}
        />
      </SignInContainer>
    </TopPageContainer>
  )
}

export default TopPage
