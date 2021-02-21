import { ReactNode } from "react"
import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import ColorUtil from "../../utils/color/ColorUtil"

const MaskContainer = styled.div<{ isOpen: boolean }>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      display: none;
    `}
`

const ChildrenWrap = styled.div`
  position: relative;
  z-index: 33;
`

const Mask = styled.div`
  position: absolute;
  z-index: 31;
  width: 100vw;
  height: 100vh;
  background: ${ColorUtil.addOpacity(GeneralColorStyle.Black, 0.4)};
  top: 0;
  left: 0;
`

export type Props = {
  children: ReactNode
  isOpen: boolean
  onClick?: () => void
}

const MaskAtoms = ({ children, isOpen = false, onClick }: Props) => {
  return (
    <MaskContainer isOpen={isOpen}>
      <Mask onClick={onClick} />
      <ChildrenWrap>{children}</ChildrenWrap>
    </MaskContainer>
  )
}

export default MaskAtoms
