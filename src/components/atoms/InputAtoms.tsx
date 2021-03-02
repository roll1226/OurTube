import { ChangeEvent, KeyboardEvent } from "react"
import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { CardShadow } from "../../styles/shadow/GeneralShadowStyle"
import {
  GeneralText,
  GeneralFontSize,
  GeneralFontWeight,
} from "../../styles/typography/GeneralTextStyle"
import useMedia from "use-media"

const InputContainer = styled.input<{
  width: number
  outlineColor: string
  disabledStyle: boolean
}>`
  padding: 12px 16px;
  outline: none;
  border-radius: 1000px;
  transition: all 150ms;
  font-size: 16px;

  width: ${({ width }) => width}px;
  color: ${GeneralColorStyle.Black};
  border: 2px solid ${({ outlineColor }) => outlineColor};
  ${({ disabledStyle }) =>
    disabledStyle &&
    css`
      border: 2px solid ${GeneralColorStyle.Grey};
    `}

  &:focus {
    box-shadow: ${CardShadow};
  }
`

const ErrorTextWrap = styled.div<{ width: number }>`
  width: ${({ width }) => width + 16}px;
  text-align: left;
`

export type Props = {
  width: number
  placeholder: string
  value: string
  outlineColor: string
  disabled?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  errorText?: string
  isError?: boolean
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void
}

const InputAtoms = ({
  width,
  placeholder,
  value,
  outlineColor,
  disabled = false,
  onChange,
  errorText,
  isError = false,
  onKeyPress,
}: Props) => {
  const isWide = useMedia({ minWidth: "480px" })

  return (
    <>
      <InputContainer
        type="text"
        width={width}
        outlineColor={isError ? GeneralColorStyle.Error : outlineColor}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        disabledStyle={disabled}
        onKeyPress={onKeyPress}
      />

      {isError && (
        <ErrorTextWrap width={width}>
          <GeneralText
            fontSize={
              isWide ? GeneralFontSize.SIZE_16 : GeneralFontSize.SIZE_12
            }
            fontColor={GeneralColorStyle.Error}
            fontWeight={GeneralFontWeight.BOLD}
          >
            {errorText}
          </GeneralText>
        </ErrorTextWrap>
      )}
    </>
  )
}

export default InputAtoms
