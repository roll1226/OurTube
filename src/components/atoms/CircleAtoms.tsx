import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { OurTubePath } from "../../consts/PathConsts"
import { DefaultAnimation } from "../../styles/animation/GeneralAnimationStyle"
import useMedia from "use-media"

const getPosition = (
  scale: number,
  color: string,
  path: string,
  isWide: boolean
) => {
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
          top: 0%;
          left: 5%;
          transform: translate(-50%, -50%) scale(${scale});

          ${isWide &&
          css`
            top: 50%;
            left: 0%;
            transform: translate(-50%, -50%) scale(${scale});
          `}
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
  isWide: boolean
}>`
  width: ${({ size }) => size}vw;
  height: ${({ size }) => size}vw;
  border-radius: 100%;
  background: ${({ color }) => color};
  position: absolute;
  transform-origin: center center;
  transform: translate(0%, -50%) scale(0);
  transition: all 350ms ${DefaultAnimation};
  ${(props) => getPosition(props.scale, props.color, props.path, props.isWide)};
`

export type Props = {
  size: number
  color: string
  path: string
  scale: number
}

const CircleAtoms = ({ size, color, path, scale }: Props) => {
  const isWide = useMedia({ minWidth: "480px" })

  return (
    <CircleContainer
      size={size}
      color={color}
      path={path}
      scale={scale}
      isWide={isWide}
    />
  )
}

export default CircleAtoms
