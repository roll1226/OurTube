import { useState, ChangeEvent } from "react"
import CardAtoms from "../atoms/CardAtoms"
import InputAtoms from "../atoms/InputAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import CheckboxAtoms from "../atoms/CheckboxAtoms"
import styled from "styled-components"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import UrlParamsUtil from "../../utils/url/UrlParamsUtil"
import { useRouter } from "next/router"
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import { OurTubePath } from "../../consts/PathConsts"

const PasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CreateRoomMolecules = () => {
  const router = useRouter()
  const [videoUrl, setVideoUrl] = useState("")
  const [password, setPassword] = useState("")
  const [isPrivateRoom, setIsPrivateRoom] = useState(false)

  const insertVideoId = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value)
  }

  const insertPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const checkPassword = () => {
    setIsPrivateRoom((check) => !check)
  }

  const createShareRoom = async () => {
    const user = FirebaseAuthenticationUtil.getCurrentUser()
    const resultVideoId = UrlParamsUtil.getVideoId(videoUrl)

    const roomId = await FirebaseStoreUtil.createShareRoom(
      user.uid,
      password,
      isPrivateRoom,
      resultVideoId
    )

    router.push(`${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}`)
  }

  return (
    <>
      <CardAtoms width={500} height={500}>
        <GeneralText
          fontSize={GeneralFontSize.SIZE_36}
          fontColor={GeneralColorStyle.DarkGreen}
          fontWeight={GeneralFontWeight.BOLD}
        >
          ルーム作成
        </GeneralText>

        <GeneralSpacer vertical={32} />

        <InputAtoms
          width={360}
          placeholder={"初回の動画URL"}
          outlineColor={GeneralColorStyle.DarkGreen}
          value={videoUrl}
          onChange={insertVideoId}
        />

        <GeneralSpacer vertical={32} />

        <PasswordWrap>
          <InputAtoms
            width={360}
            placeholder={"パスワード"}
            outlineColor={GeneralColorStyle.DarkGreen}
            value={password}
            onChange={insertPassword}
            disabled={!isPrivateRoom}
          />

          <GeneralSpacer vertical={8} />

          <CheckboxAtoms
            isCheck={isPrivateRoom}
            text={"プライベートルームにする"}
            onChange={checkPassword}
          />
        </PasswordWrap>

        <GeneralSpacer vertical={56} />

        <ButtonAtoms
          bgColor={GeneralColorStyle.DarkGreen}
          text={"ルームを作成する"}
          fontColor={GeneralColorStyle.White}
          onClick={createShareRoom}
          disabled={videoUrl ? false : true}
        />
      </CardAtoms>
    </>
  )
}

export default CreateRoomMolecules
