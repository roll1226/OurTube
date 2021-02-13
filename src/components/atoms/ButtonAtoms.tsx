import styled, { css } from "styled-components"
import { HoverItem } from "../../styles/shadow/GeneralShadowStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import {
  GeneralText,
  GeneralFontSize,
} from "../../styles/typography/GeneralTextStyle"

export type Props = {
  bgColor: string
  outlineColor?: string
  text: string
  fontColor: string
  disabled?: boolean
  icon?: JSX.Element
  onClick: () => void
}

const ButtonContainer = styled.button<{
  bgColor: string
  outlineColor: string
  disabled: boolean
}>`
  border: ${({ bgColor }) => bgColor};
  border-radius: 12px;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: all 150ms ease-out;

  ${({ outlineColor }) =>
    outlineColor &&
    css`
      border: 1px ${outlineColor} solid;
    `}
  background: ${({ bgColor }) => bgColor};
  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        box-shadow: ${HoverItem};
      }
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px ${GeneralColorStyle.Grey} solid;
      background: ${GeneralColorStyle.Grey};
    `}
`

const ButtonAtoms = ({
  bgColor,
  outlineColor,
  text,
  fontColor,
  disabled = false,
  icon,
  onClick,
}: Props) => {
  return (
    <ButtonContainer
      onClick={onClick}
      bgColor={bgColor}
      outlineColor={outlineColor}
      disabled={disabled}
    >
      {icon && (
        <>
          {icon}
          <GeneralSpacer horizontal={4} />
        </>
      )}

      <GeneralText
        fontSize={GeneralFontSize.SIZE_16}
        fontColor={disabled ? GeneralColorStyle.White : fontColor}
      >
        {text}
      </GeneralText>
    </ButtonContainer>
  )
}

export default ButtonAtoms
