import { useState, ChangeEvent } from "react"
import CardAtoms from "../atoms/CardAtoms"
import InputAtoms from "../atoms/InputAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import CheckboxAtoms from "../atoms/CheckboxAtoms"
import styled from "styled-components"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import FirebaseFunctionsUtil from "../../utils/lib/FirebaseFunctions"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import { useDispatch } from "react-redux"
import toastSlice from "../../ducks/toast/slice"
import modalSlice from "../../ducks/modal/slice"

const PasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CreateRoomOrganisms = () => {
  const dispatch = useDispatch()
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

  /**
   * send toast
   * @param text
   * @param toastColor
   */
  const sendToast = (
    text: string,
    toastColor: "success" | "error",
    roomId?: string,
    password?: string
  ) => {
    dispatch(toastSlice.actions.setIsActive(true))
    dispatch(toastSlice.actions.setText(text))
    dispatch(toastSlice.actions.setToastColor(toastColor))
    if (roomId) {
      dispatch(modalSlice.actions.setRoomId(roomId))
      dispatch(modalSlice.actions.setIsActive(true))
    }
    if (password) dispatch(modalSlice.actions.setPassword(password))

    setTimeout(() => {
      dispatch(toastSlice.actions.setIsActive(false))
    }, 2000)
  }

  const createShareRoom = async () => {
    const user = FirebaseAuthenticationUtil.getCurrentUser()

    const createRoomFunc = FirebaseFunctionsUtil.createRoomFunc()

    dispatch(modalSlice.actions.setLoading(true))

    await createRoomFunc({
      roomName,
      uid: user.uid,
      password,
      isPrivateRoom,
    })
      .then(async (res) => {
        LoggerUtil.debug(res.data.text)
        const roomId = res.data.roomId
        const password = res.data.password

        sendToast("ルームが作成されました", "success", roomId, password)
      })
      .catch((error) => {
        sendToast("作成に失敗しました", "error")
        LoggerUtil.debug(error)
      })

    dispatch(modalSlice.actions.setLoading(false))
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
          placeholder={"ルーム名(20文字以内)"}
          outlineColor={GeneralColorStyle.DarkGreen}
          value={roomName}
          onChange={insertRoomName}
          isError={roomName.length > 20 ? true : false}
          errorText={"ルーム名は20文字以内です。"}
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

export default CreateRoomOrganisms
