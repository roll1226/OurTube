import { useState, ChangeEvent } from "react"
import CardAtoms from "../atoms/CardAtoms"
import InputAtoms from "../atoms/InputAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import CheckboxAtoms from "../atoms/CheckboxAtoms"
import styled from "styled-components"
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"

const PasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CreateRoomMolecules = () => {
  const [videoUrl, setVideoUrl] = useState("")
  const [password, setPassword] = useState("")
  const [isPassword, setIsPassword] = useState(false)

  const insertVideoId = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value)
  }

  const insertPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const checkPassword = () => {
    setIsPassword((check) => !check)
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
          placeholder={"動画URL"}
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
            disabled={!isPassword}
          />

          <GeneralSpacer vertical={8} />

          <CheckboxAtoms
            isCheck={isPassword}
            text={"プライベートルームにする"}
            onChange={checkPassword}
          />
        </PasswordWrap>

        <GeneralSpacer vertical={56} />

        <ButtonAtoms
          bgColor={GeneralColorStyle.DarkGreen}
          text={"ルームを作成する"}
          fontColor={GeneralColorStyle.White}
          onClick={() => LoggerUtil.debug("hogehoge")}
        />
      </CardAtoms>
    </>
  )
}

export default CreateRoomMolecules
