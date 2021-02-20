import { ReactNode } from "react"
import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import ColorUtil from "../../utils/color/ColorUtil"

const Mask = styled.div<{ isOpen: boolean }>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
  background: ${ColorUtil.addOpacity(GeneralColorStyle.Black, 0.2)};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      display: none;
    `}
`

export type Props = {
  children: ReactNode
  isOpen: boolean
  onClick?: () => void
}

const MaskAtoms = ({ children, isOpen = false, onClick }: Props) => {
  return (
    <Mask onClick={onClick} isOpen={isOpen}>
      {children}
    </Mask>
  )
}

export default MaskAtoms
