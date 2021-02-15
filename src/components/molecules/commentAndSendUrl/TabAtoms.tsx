import styled, { css } from "styled-components"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import IconAtoms from "../../atoms/IconAtoms"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"

const TabContainer = styled.div<{
  isActive: boolean
  position: "left" | "right"
}>`
  background: ${({ isActive }) =>
    isActive ? GeneralColorStyle.White : GeneralColorStyle.DarkBlue};
  width: 50%;
  height: 60px;
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

export type Props = {
  icon: IconProp
  isActive: boolean
  position: "left" | "right"
  onClick: () => void
}

const TabMolecules = ({
  icon,
  isActive = false,
  position = "left",
  onClick,
}: Props) => {
  return (
    <TabContainer isActive={isActive} position={position} onClick={onClick}>
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
    </TabContainer>
  )
}

export default TabMolecules
