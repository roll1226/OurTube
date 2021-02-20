import { useState, useRef, useEffect } from "react"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import styled, { css, keyframes } from "styled-components"
import {
  GeneralFontSize,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"

const RoomNameContainer = styled.div`
  width: 100%;
  overflow: hidden;
`

const RoomNameWrap = styled.div<{ roomNameWidth: number }>`
  position: relative;
  left: 100%;

  ${({ roomNameWidth }) =>
    css`
      animation: ${moveTime(roomNameWidth)}s linear 0s infinite ${keyframes`
        from { left: 100%; }
        to { left: -${roomNameWidth}px; }
      `};
    `}
`

const moveTime = (width: number) => {
  if (width <= 200) {
    return 8
  } else if (201 <= width && width <= 400) {
    return 12
  } else if (401 <= width && width <= 600) {
    return 16
  } else if (601 <= width && width <= 800) {
    return 20
  } else if (801 <= width && width <= 1000) {
    return 24
  } else if (1001 <= width && width <= 1200) {
    return 28
  } else if (1201 <= width && width <= 1400) {
    return 32
  } else if (1401 <= width && width <= 1600) {
    return 36
  } else if (1601 <= width && width <= 1800) {
    return 40
  } else if (1801 <= width && width <= 2000) {
    return 44
  } else {
    return 48
  }
}

export type Props = {
  text: string
}

const OurTubeInfoCardMolecules = ({ text }: Props) => {
  const ref = useRef(null)
  const [roomNameWidth, setRoomNameWidth] = useState(0)

  useEffect(() => {
    if (text) setRoomNameWidth(ref.current.offsetWidth)
  }, [text])

  return (
    <RoomNameContainer>
      <RoomNameWrap roomNameWidth={roomNameWidth}>
        <GeneralText
          fontSize={GeneralFontSize.SIZE_16}
          fontColor={GeneralColorStyle.Black}
          style={{ whiteSpace: "nowrap" }}
          ref={ref}
        >
          {text}
        </GeneralText>
      </RoomNameWrap>
    </RoomNameContainer>
  )
}

export default OurTubeInfoCardMolecules
