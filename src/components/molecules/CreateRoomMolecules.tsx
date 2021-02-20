import { useState, ChangeEvent } from "react"
import CardAtoms from "../atoms/CardAtoms"
import InputAtoms from "../atoms/InputAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import CheckboxAtoms from "../atoms/CheckboxAtoms"
import styled from "styled-components"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import { useRouter } from "next/router"
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import { OurTubePath } from "../../consts/PathConsts"
import FirebaseFunctionsUtil from "../../utils/lib/FirebaseFunctions"
import LoggerUtil from "../../utils/debugger/LoggerUtil"

const PasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CreateRoomMolecules = () => {
  const router = useRouter()
  const [roomName, setRoomName] = useState("")
  const [password, setPassword] = useState("")
  const [isPrivateRoom, setIsPrivateRoom] = useState(false)

  const insertRoomName = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value)
  }

  const insertPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const checkPassword = () => {
    setIsPrivateRoom((check) => !check)
  }

  const createShareRoom = async () => {
    const user = FirebaseAuthenticationUtil.getCurrentUser()

    const createRoomFunc = FirebaseFunctionsUtil.createRoomFunc()

    await createRoomFunc({
      roomName,
      uid: user.uid,
      password,
      isPrivateRoom,
    })
      .then(async (res) => {
        LoggerUtil.debug(res.data.text)
        const roomId = res.data.roomId

        router.push(`${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}`)
      })
      .catch((error) => {
        LoggerUtil.debug(error)
      })
  }

  return (
    <>
      <CardAtoms width={440} height={480}>
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
          placeholder={"ルーム名(50文字以内)"}
          outlineColor={GeneralColorStyle.DarkGreen}
          value={roomName}
          onChange={insertRoomName}
          isError={roomName.length > 50}
          errorText={"ルーム名は50文字以内です。"}
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
          disabled={!roomName || roomName.length > 50 ? true : false}
        />
      </CardAtoms>
    </>
  )
}

export default CreateRoomMolecules
