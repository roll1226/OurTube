import { ChangeEvent, KeyboardEvent } from "react"
import styled, { css } from "styled-components"
import InputAtoms from "../../atoms/InputAtoms"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import IconAtoms from "../../atoms/IconAtoms"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { GeneralSpacer } from "../../../styles/spacer/GeneralSpacerStyle"

const SendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const SendButton = styled.button<{ text: string }>`
  outline: none;
  border: none;
  background: none;
  border-radius: 50%;
  ${({ text }) =>
    text &&
    css`
      cursor: pointer;
    `}
`

export type Props = {
  placeholder: string
  text: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

const SendTextMolecules = ({ placeholder, text, onChange, onClick }: Props) => {
  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!text) return
    if (event.key === "Enter") onClick()
  }

  return (
    <SendContainer>
      <GeneralSpacer horizontal={28} />
      <InputAtoms
        width={300}
        placeholder={placeholder}
        value={text}
        outlineColor={GeneralColorStyle.Black}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <GeneralSpacer horizontal={8} />

      <SendButton text={text} onClick={onClick}>
        <IconAtoms
          icon={faPaperPlane}
          style={{
            width: 32,
            color: text ? GeneralColorStyle.Black : GeneralColorStyle.Grey,
            transition: "all 150ms linear",
          }}
        />
      </SendButton>
      <GeneralSpacer horizontal={28} />
    </SendContainer>
  )
}

export default SendTextMolecules
