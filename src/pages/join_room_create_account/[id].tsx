import { useRouter } from "next/router"
import HeadAtom from "../../components/atoms/HeadAtom"
import { OurTubePath } from "../../consts/PathConsts"
import { ChangeEvent, useState, useEffect, useContext } from "react"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import MaskAtom from "../../components/atoms/MaskAtom"
import CardAtom from "../../components/atoms/CardAtom"
import OurTubeLogoAtom from "../../components/atoms/svg/OurTubeLogoAtom"
import { LogoColor } from "../../components/atoms/svg/OurTubeLogoAtom"
import {
  GeneralText,
  GeneralFontSize,
} from "../../styles/typography/GeneralTextStyle"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import SignInContainerOrganism from "../../components/organisms/SignInContainerOrganism"
import InputAtom from "../../components/atoms/InputAtom"
import ButtonAtom from "../../components/atoms/ButtonAtom"
import useMedia from "use-media"
import { AuthContext } from "@context/AuthContext"

const JoinRoomCreateAccount = () => {
  const isWide = useMedia({ minWidth: "480px" })
  const router = useRouter()
  const { id } = router.query
  const queryPassword = router.query.p as string
  const roomId = id as string

  const [istNameStore, setIsNameStore] = useState(false)
  const [userName, setUserName] = useState("")

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser || !roomId || !queryPassword) return

    const checkUser = async () => {
      const isName = await FirebaseStoreUtil.checkUserName(currentUser.uid)
      if (!isName) setIsNameStore(true)
      else
        router.replace(
          `${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}${
            queryPassword ? `?p=${queryPassword}` : ""
          }`
        )
    }

    checkUser()
  }, [currentUser, roomId, router, queryPassword])

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
      <HeadAtom
        title={"OurTube | アカウント作成"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={`${OurTubePath.TOP}`}
        top={true}
      />

      <MaskAtom isOpen={true}>
        <CardAtom width={isWide ? 480 : 280}>
          <OurTubeLogoAtom size={isWide ? 430 : 280} color={LogoColor.BLUE} />
          {!istNameStore && (
            <>
              <GeneralText
                fontSize={
                  isWide ? GeneralFontSize.SIZE_36 : GeneralFontSize.SIZE_24
                }
                fontColor={GeneralColorStyle.DarkGreen}
              >
                参加にはログイン必須
              </GeneralText>

              <GeneralSpacer vertical={isWide ? 32 : 20} />

              <SignInContainerOrganism
                googleSignInClick={googleSignInClick}
                twitterSignInClick={twitterSignInClick}
              />
            </>
          )}

          {istNameStore && (
            <>
              <GeneralText
                fontSize={
                  isWide ? GeneralFontSize.SIZE_36 : GeneralFontSize.SIZE_24
                }
                fontColor={GeneralColorStyle.DarkGreen}
              >
                アカウント名を入力
              </GeneralText>

              <GeneralText
                fontSize={
                  isWide ? GeneralFontSize.SIZE_12 : GeneralFontSize.SIZE_08
                }
                fontColor={GeneralColorStyle.Black}
              >
                &#x203B;OurTubeでは各サービスのアイコン画像が使用されます。
              </GeneralText>

              <GeneralSpacer vertical={isWide ? 32 : 20} />

              <InputAtom
                width={isWide ? 360 : 240}
                placeholder={"アカウント作成(20文字以内)"}
                outlineColor={GeneralColorStyle.DarkGreen}
                value={userName}
                onChange={insetAccountName}
                isError={userName.length > 20}
                errorText={"ユーザ名は20文字以内です。"}
              />

              <GeneralSpacer vertical={8} />

              <ButtonAtom
                bgColor={GeneralColorStyle.DarkGreen}
                text={"アカウントを作成する"}
                fontColor={GeneralColorStyle.White}
                onClick={saveUserName}
                disabled={!userName || userName.length > 20 ? true : false}
              />
            </>
          )}
        </CardAtom>
      </MaskAtom>
    </>
  )
}

export default JoinRoomCreateAccount
