import styled, { css } from "styled-components"
import { HoverItem } from "../../styles/shadow/GeneralShadowStyle"
import {
  GeneralText,
  GeneralFontSize,
} from "../../styles/typography/GeneralTextStyle"

export type Props = {
  bgColor: string
  outlineColor?: string
  text: string
  fontColor: string
  icon?: JSX.Element
  onClick: () => void
}

const ButtonContainer = styled.button<{
  bgColor: string
  outlineColor: string
}>`
  border: ${({ bgColor }) => bgColor};
  border-radius: 20px;
  padding: 12px 16px;
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
  &:hover {
    box-shadow: ${HoverItem};
  }
`

const IconSpacer = styled.div`
  margin-left: 4px;
`

const ButtonAtoms = ({
  bgColor,
  outlineColor,
  text,
  fontColor,
  icon,
  onClick,
}: Props) => {
  return (
    <ButtonContainer
      onClick={onClick}
      bgColor={bgColor}
      outlineColor={outlineColor}
    >
      {icon && (
        <>
          {icon}
          <IconSpacer />
        </>
      )}

      <GeneralText fontSize={GeneralFontSize.SIZE_16} fontColor={fontColor}>
        {text}
      </GeneralText>
    </ButtonContainer>
  )
}

export default ButtonAtoms
