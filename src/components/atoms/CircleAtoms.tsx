import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { OurTubePath } from "../../consts/PathConsts"

const getPosition = (scale: number, color: string, path: string) => {
  if (color === GeneralColorStyle.DarkBlue) {
    switch (path) {
      case OurTubePath.TOP:
        return css`
          top: 50%;
          left: 50%;
          transform: translate(0%, -50%) scale(${scale});
        `

      case OurTubePath.CREATE_ACCOUNT:
        return css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(${scale});
        `

      case OurTubePath.CREATE_ROOM:
        return css`
          top: 50%;
          left: 0%;
          transform: translate(-50%, -50%) scale(${scale});
        `

      default:
        return css`
          top: 0%;
          left: 5%;
          transform: translate(-50%, -50%) scale(${scale});
        `
    }
  } else if (color === GeneralColorStyle.DarkGreen) {
    switch (path) {
      case OurTubePath.SHARE_ROOM:
        return css`
          bottom: 0%;
          right: 0%;
          transform: translate(50%, 50%) scale(${scale});
        `

      case OurTubePath.INSERT_ROOM_PASSWORD:
        return css`
          bottom: 0%;
          right: 0%;
          transform: translate(50%, 50%) scale(${scale});
        `

      case OurTubePath.CREATE_GUEST:
        return css`
          bottom: 0%;
          right: 0%;
          transform: translate(50%, 50%) scale(${scale});
        `

      default:
        return css`
          bottom: 0%;
          right: 0%;
          transform: translate(50%, 50%) scale(0);
        `
    }
  }
}

const CircleContainer = styled.div<{
  size: number
  color: string
  path: string
  scale: number
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 100%;
  background: ${({ color }) => color};
  position: absolute;
  transform-origin: center center;
  transform: translate(0%, -50%) scale(0);
  transition: all 300ms cubic-bezier(0.15, 0.74, 0.34, 1.07);
  ${(props) => getPosition(props.scale, props.color, props.path)};
`

export type Props = {
  size: number
  color: string
  path: string
  scale: number
}

const CircleAtoms = ({ size, color, path, scale }: Props) => {
  return <CircleContainer size={size} color={color} path={path} scale={scale} />
}

export default CircleAtoms
