import { ChangeEvent } from "react"
import styled from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { GeneralFontSize } from "../../styles/typography/GeneralTextStyle"

const InputContainer = styled.input<{
  width: number
  outlineColor: string
}>`
  padding: 12px 16px;
  outline: none;
  border-radius: 1000px;
  width: ${({ width }) => width}px;
  font-size: ${GeneralFontSize.SIZE_16};
  color: ${GeneralColorStyle.Black};
  border: 2px solid ${({ outlineColor }) => outlineColor};
`

export type Props = {
  width: number
  placeholder: string
  value: string
  outlineColor: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputAtoms = ({
  width,
  placeholder,
  value,
  outlineColor,
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
    />
  )
}

export default InputAtoms
