import { useState, ChangeEvent } from "react"
import CardAtom from "../atoms/CardAtom"
import InputAtom from "../atoms/InputAtom"
import ButtonAtom from "../atoms/ButtonAtom"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import CheckboxAtom from "../atoms/CheckboxAtom"
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
import modalSlice from "../../ducks/modal/slice"
import useMedia from "use-media"
import ToastUtil from "@src/utils/toast/ToastUtil"

const PasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CreateRoomOrganism = () => {
  const dispatch = useDispatch()
  const [roomName, setRoomName] = useState("")
  const [password, setPassword] = useState("")
  const [isPrivateRoom, setIsPrivateRoom] = useState(false)
  const isWide = useMedia({ minWidth: "480px" })

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
    if (toastColor === "success") ToastUtil.success(text)
    else if (toastColor === "error") ToastUtil.error(text)

    if (roomId) {
      dispatch(modalSlice.actions.setRoomId(roomId))
      dispatch(modalSlice.actions.setIsActive(true))
    }
    if (password) dispatch(modalSlice.actions.setPassword(password))
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
      <CardAtom width={isWide ? 440 : 300} height={isWide ? 480 : 280}>
        <GeneralText
          fontSize={isWide ? GeneralFontSize.SIZE_36 : GeneralFontSize.SIZE_24}
          fontColor={GeneralColorStyle.DarkGreen}
          fontWeight={GeneralFontWeight.BOLD}
        >
          ルーム作成
        </GeneralText>

        <GeneralSpacer vertical={isWide ? 32 : 16} />

        <InputAtom
          width={isWide ? 360 : 240}
          placeholder={"ルーム名(20文字以内)"}
          outlineColor={GeneralColorStyle.DarkGreen}
          value={roomName}
          onChange={insertRoomName}
          isError={roomName.length > 20 ? true : false}
          errorText={"ルーム名は20文字以内です。"}
        />

        <GeneralSpacer vertical={isWide ? 32 : 16} />

        <PasswordWrap>
          <InputAtom
            width={isWide ? 360 : 240}
            placeholder={"パスワード"}
            outlineColor={GeneralColorStyle.DarkGreen}
            value={password}
            onChange={insertPassword}
            disabled={!isPrivateRoom}
          />

          <GeneralSpacer vertical={8} />

          <CheckboxAtom
            isCheck={isPrivateRoom}
            text={"プライベートルームにする"}
            onChange={checkPassword}
          />
        </PasswordWrap>

        <GeneralSpacer vertical={isWide ? 56 : 32} />

        <ButtonAtom
          bgColor={GeneralColorStyle.DarkGreen}
          text={"ルームを作成する"}
          fontColor={GeneralColorStyle.White}
          onClick={createShareRoom}
          disabled={
            !roomName || roomName.length > 50
              ? true
              : isPrivateRoom && !password
              ? true
              : false
          }
        />
      </CardAtom>
    </>
  )
}

export default CreateRoomOrganism
