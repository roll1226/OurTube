import React from "react"
import styled, { css } from "styled-components"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import IconAtoms from "../IconAtoms"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import { DefaultAnimation } from "../../../styles/animation/GeneralAnimationStyle"
import { ControlHover } from "../../../styles/shadow/GeneralShadowStyle"

const ControlsButtonContainer = styled.button<{
  size: number
  isActive: boolean
}>`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 1000px;
  outline: none;
  background: ${GeneralColorStyle.ThinBlue};
  border: none;
  cursor: pointer;
  transition: all 150ms ${DefaultAnimation};
  position: relative;
  z-index: 6;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  ${({ isActive }) =>
    !isActive &&
    css`
      cursor: default;
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      &:hover {
        box-shadow: ${ControlHover};
      }
    `}
`

export type Props = {
  size: number
  iconSize?: number
  icon: IconProp
  onClick?: () => void
  isActive?: boolean
}

const ControlsButtonAtoms = ({
  size,
  iconSize,
  icon,
  onClick,
  isActive = true,
}: Props) => {
  return (
    <ControlsButtonContainer size={size} onClick={onClick} isActive={isActive}>
      <IconAtoms
        style={{
          width: iconSize ? iconSize : size / 2 - 2,
          color: GeneralColorStyle.White,
        }}
        icon={icon}
      />
    </ControlsButtonContainer>
  )
}

export default ControlsButtonAtoms
