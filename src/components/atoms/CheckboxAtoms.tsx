import styled, { css } from "styled-components"
import {
  GeneralText,
  GeneralFontSize,
} from "../../styles/typography/GeneralTextStyle"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"

const CheckboxContainer = styled.input`
  display: none;
`

const CheckboxText = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const CheckboxLabel = styled.label``

const Checkbox = styled.div<{ isCheck: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${GeneralColorStyle.DarkGreen};
  background: ${GeneralColorStyle.White};
  border-radius: 4px;
  position: relative;

  ${({ isCheck }) =>
    isCheck &&
    css`
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: -8px;
        left: 4px;
        width: 12px;
        height: 20px;
        transform: rotate(40deg);
        border-bottom: 4px solid ${GeneralColorStyle.DarkGreen};
        border-right: 4px solid ${GeneralColorStyle.DarkGreen};
      }
    `}
`

export type Props = {
  isCheck: boolean
  text: string
  onChange: () => void
}

const CheckboxAtoms = ({ isCheck, text, onChange }: Props) => {
  return (
    <CheckboxLabel>
      <CheckboxContainer
        type="checkbox"
        onChange={onChange}
        checked={isCheck}
      />

      <CheckboxText>
        <Checkbox isCheck={isCheck} />

        <GeneralSpacer horizontal={8} />

        <GeneralText
          fontSize={GeneralFontSize.SIZE_16}
          fontColor={GeneralColorStyle.Black}
        >
          {text}
        </GeneralText>
      </CheckboxText>
    </CheckboxLabel>
  )
}

export default CheckboxAtoms
