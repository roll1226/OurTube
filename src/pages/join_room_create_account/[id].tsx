import { useRouter } from "next/router"
import HeadAtoms from "../../components/atoms/HeadAtoms"
import { OurTubePath } from "../../consts/PathConsts"
import { ChangeEvent, useState, useEffect } from "react"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import MaskAtoms from "../../components/atoms/MaskAtoms"
import CardAtoms from "../../components/atoms/CardAtoms"
import OurTubeLogoAtoms from "../../components/atoms/svg/OurTubeLogoAtoms"
import { LogoColor } from "../../components/atoms/svg/OurTubeLogoAtoms"
import {
  GeneralText,
  GeneralFontSize,
} from "../../styles/typography/GeneralTextStyle"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import SignInContainerOrganisms from "../../components/organisms/SignInContainerOrganisms"
import useFirebaseAuthentication from "../../hooks/useFirebaseAuthentication"
import InputAtoms from "../../components/atoms/InputAtoms"
import ButtonAtoms from "../../components/atoms/ButtonAtoms"

const JoinRoomCreateAccount = () => {
  const router = useRouter()
  const { id } = router.query
  const queryPassword = router.query.p as string
  const roomId = id as string

  const [istNameStore, setIsNameStore] = useState(false)
  const [userName, setUserName] = useState("")

  const authUser = useFirebaseAuthentication()

  useEffect(() => {
    if (!authUser) return
    if (!roomId) return
    if (!queryPassword) return

    const checkUser = async () => {
      const isName = await FirebaseStoreUtil.checkUserName(authUser.uid)
      if (!isName) setIsNameStore(true)
      else
        router.replace(
          `${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}${
            queryPassword ? `?p=${queryPassword}` : ""
          }`
        )
    }

    checkUser()
  }, [authUser, roomId, router, queryPassword])

  const insetAccountName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const moveRoom = async (uid: string) => {
    const isName = await FirebaseStoreUtil.checkUserName(uid)
    if (isName) {
      await FirebaseStoreUtil.setUserJoinedRoom(roomId, uid)
      router.replace(
        `${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}${
          queryPassword ? `?p=${queryPassword}` : ""
        }`
      )
    } else {
      setIsNameStore(true)
    }
  }

  const googleSignInClick = async () => {
    const { user } = await FirebaseAuthenticationUtil.signInForGoogle()
    moveRoom(user.uid)
  }

  const twitterSignInClick = async () => {
    const { user } = await FirebaseAuthenticationUtil.signInForTwitter()
    moveRoom(user.uid)
  }

  const saveUserName = async () => {
    await FirebaseStoreUtil.createUserName(userName)
    router.replace(
      `${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}${
        queryPassword ? `?p=${queryPassword}` : ""
      }`
    )
  }

  return (
    <>
      <HeadAtoms
        title={"OurTube | アカウント作成"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={`${OurTubePath.TOP}`}
        top={true}
      />

      <MaskAtoms isOpen={true}>
        <CardAtoms width={480}>
          <OurTubeLogoAtoms size={430} color={LogoColor.BLUE} />
          {!istNameStore && (
            <>
              <GeneralText
                fontSize={GeneralFontSize.SIZE_36}
                fontColor={GeneralColorStyle.DarkGreen}
              >
                参加するにはログイン必須
              </GeneralText>

              <GeneralSpacer vertical={32} />

              <SignInContainerOrganisms
                googleSignInClick={googleSignInClick}
                twitterSignInClick={twitterSignInClick}
              />
            </>
          )}

          {istNameStore && (
            <>
              <GeneralText
                fontSize={GeneralFontSize.SIZE_36}
                fontColor={GeneralColorStyle.DarkGreen}
              >
                アカウント名を入力
              </GeneralText>

              <GeneralSpacer vertical={32} />

              <InputAtoms
                width={360}
                placeholder={"アカウント作成(20文字以内)"}
                outlineColor={GeneralColorStyle.DarkGreen}
                value={userName}
                onChange={insetAccountName}
                isError={userName.length > 20}
                errorText={"ユーザ名は20文字以内です。"}
              />

              <GeneralSpacer vertical={8} />

              <ButtonAtoms
                bgColor={GeneralColorStyle.DarkGreen}
                text={"アカウントを作成する"}
                fontColor={GeneralColorStyle.White}
                onClick={saveUserName}
                disabled={!userName || userName.length > 20 ? true : false}
              />
            </>
          )}
        </CardAtoms>
      </MaskAtoms>
    </>
  )
}

export default JoinRoomCreateAccount
