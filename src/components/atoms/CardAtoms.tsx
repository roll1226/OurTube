import { ReactNode } from "react"
import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { CardShadow } from "../../styles/shadow/GeneralShadowStyle"

export type Props = {
  width: number | string
  height?: number | string
  children: ReactNode
  bgColor?: string
}

const CardContainer = styled.div<{
  width: number | string
  height?: number | string
  bgColor: string
}>`
  padding: 28px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: ${CardShadow};
  width: ${({ width }) => width}px;
  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}
  background: ${({ bgColor }) => bgColor}
`

const CardAtoms = ({
  width,
  height,
  children,
  bgColor = GeneralColorStyle.ColoredWhite,
}: Props) => {
  return (
    <CardContainer width={width} height={height} bgColor={bgColor}>
      {children}
    </CardContainer>
  )
}

export default CardAtoms
