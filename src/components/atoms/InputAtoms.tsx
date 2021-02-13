import { ChangeEvent } from "react"
import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { CardShadow } from "../../styles/shadow/GeneralShadowStyle"

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

export type Props = {
  width: number
  placeholder: string
  value: string
  outlineColor: string
  disabled?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputAtoms = ({
  width,
  placeholder,
  value,
  outlineColor,
  disabled = false,
  onChange,
}: Props) => {
  return (
    <InputContainer
      type="text"
      width={width}
      outlineColor={outlineColor}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      disabledStyle={disabled}
    />
  )
}

export default InputAtoms
