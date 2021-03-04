import styled, { css } from "styled-components"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import IconAtoms from "../../atoms/IconAtoms"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import { useState } from "react"
import ColorUtil from "../../../utils/color/ColorUtil"
import { ItemShadow } from "../../../styles/shadow/GeneralShadowStyle"
import {
  GeneralText,
  GeneralFontSize,
  GeneralFontWeight,
} from "../../../styles/typography/GeneralTextStyle"

const TabContainer = styled.div`
  width: 50%;
  height: 60px;
  position: relative;
`

const TabWrap = styled.div<{
  isActive: boolean
  position: "left" | "right"
}>`
  background: ${({ isActive }) =>
    isActive ? GeneralColorStyle.White : GeneralColorStyle.DarkBlue};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: all 150ms linear;
  border-radius: 20px 0 0 0;
  cursor: pointer;

  ${({ position }) => position === "left" && css``}
  ${({ position }) =>
    position === "right" &&
    css`
      border-radius: 0 20px 0 0;
    `}
`

const TabName = styled.div<{ isHover: boolean }>`
  position: absolute;
  z-index: 4;
  top: -50%;
  left: 25%;
  /* transform: translateY(0%) translateX(-50%); */
  transform-origin: center left;
  background: ${ColorUtil.addOpacity(GeneralColorStyle.Black, 0.8)};
  padding: 2px 12px;
  border-radius: 4px;
  box-shadow: ${ItemShadow};
  flex-shrink: 0;
  display: none;
  ${({ isHover }) =>
    isHover &&
    css`
      display: block;
    `}
`

export type Props = {
  icon: IconProp
  isActive: boolean
  position: "left" | "right"
  onClick: () => void
  name: string
}

const TabMolecules = ({
  icon,
  isActive = false,
  position = "left",
  onClick,
  name,
}: Props) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <TabContainer
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <TabName isHover={isHover}>
        <GeneralText
          fontSize={GeneralFontSize.SIZE_12}
          fontWeight={GeneralFontWeight.BOLD}
          fontColor={GeneralColorStyle.White}
          style={{ cursor: "default" }}
        >
          {name}
        </GeneralText>
      </TabName>

      <TabWrap isActive={isActive} position={position}>
        <IconAtoms
          style={{
            width: 52,
            color: isActive
              ? GeneralColorStyle.DarkBlue
              : GeneralColorStyle.White,
            transition: "all 150ms linear",
          }}
          icon={icon}
        />
      </TabWrap>
    </TabContainer>
  )
}

export default TabMolecules
