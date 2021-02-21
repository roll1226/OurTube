import styled, { css, keyframes } from "styled-components"
import {
  GeneralText,
  GeneralFontSize,
} from "../../../styles/typography/GeneralTextStyle"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import { useState, useRef, useEffect } from "react"
import { InsetShadow } from "../../../styles/shadow/GeneralShadowStyle"

const YouTubeTitleContainer = styled.div`
  width: 400px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: ${InsetShadow};
  overflow: hidden;
`

const YouTUbeTitleMoveWrap = styled.div<{ titleWidth: number }>`
  position: relative;
  left: 100%;

  ${({ titleWidth }) =>
    css`
      animation: ${moveTime(titleWidth)}s linear 0s infinite ${keyframes`
        from { left: 100%; }
        to { left: -${titleWidth}px; }
      `};
    `}
`

const moveTime = (width: number) => {
  if (width <= 800) {
    return 8
  } else if (801 <= width && width <= 1300) {
    return 12
  } else if (1301 <= width && width <= 1800) {
    return 16
  } else if (1801 <= width && width <= 2400) {
    return 20
  } else {
    return 24
  }
}

export type Props = {
  title: string
}

const ControlsYouTubeTitleAtoms = ({ title }: Props) => {
  const ref = useRef(null)
  const [titleWidth, setTitleWidth] = useState(0)

  useEffect(() => {
    setTitleWidth(ref.current.offsetWidth)
  }, [title])

  return (
    <YouTubeTitleContainer>
      <YouTUbeTitleMoveWrap ref={ref} titleWidth={titleWidth}>
        {title && (
          <GeneralText
            fontSize={GeneralFontSize.SIZE_24}
            fontColor={GeneralColorStyle.Black}
            style={{ whiteSpace: "nowrap" }}
          >
            {title}
          </GeneralText>
        )}
      </YouTUbeTitleMoveWrap>
    </YouTubeTitleContainer>
  )
}

export default ControlsYouTubeTitleAtoms
