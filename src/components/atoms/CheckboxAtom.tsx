import styled, { css } from "styled-components"
import {
  GeneralText,
  GeneralFontSize,
} from "../../styles/typography/GeneralTextStyle"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import useMedia from "use-media"

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

const Checkbox = styled.div<{ isCheck: boolean; isWide: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${GeneralColorStyle.DarkGreen};
  background: ${GeneralColorStyle.White};
  border-radius: 4px;
  position: relative;

  ${({ isWide }) =>
    isWide &&
    css`
      width: 20px;
      height: 20px;
    `}

  ${(props) =>
    props.isCheck &&
    props.isWide &&
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

  ${(props) =>
    props.isCheck &&
    !props.isWide &&
    css`
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: -8px;
        left: 4px;
        width: 8px;
        height: 16px;
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

const CheckboxAtom = ({ isCheck, text, onChange }: Props) => {
  const isWide = useMedia({ minWidth: "480px" })

  return (
    <CheckboxLabel>
      <CheckboxContainer
        type="checkbox"
        onChange={onChange}
        checked={isCheck}
      />

      <CheckboxText>
        <Checkbox isCheck={isCheck} isWide={isWide} />

        <GeneralSpacer horizontal={isWide ? 8 : 4} />

        <GeneralText
          fontSize={isWide ? GeneralFontSize.SIZE_16 : GeneralFontSize.SIZE_12}
          fontColor={GeneralColorStyle.Black}
        >
          {text}
        </GeneralText>
      </CheckboxText>
    </CheckboxLabel>
  )
}

export default CheckboxAtom
