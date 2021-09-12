import { ChangeEvent, KeyboardEvent } from "react"
import styled, { css } from "styled-components"
import InputAtom from "../../atoms/InputAtom"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import IconAtom from "../../atoms/IconAtom"
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

const SendTextMolecule = ({ placeholder, text, onChange, onClick }: Props) => {
  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!text) return
    if (event.key === "Enter") onClick()
  }

  return (
    <SendContainer>
      <GeneralSpacer horizontal={28} />
      <InputAtom
        width={300}
        placeholder={placeholder}
        value={text}
        outlineColor={GeneralColorStyle.Black}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <GeneralSpacer horizontal={8} />

      <SendButton text={text} onClick={onClick}>
        <IconAtom
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

export default SendTextMolecule
