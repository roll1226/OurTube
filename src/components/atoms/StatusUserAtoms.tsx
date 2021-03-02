import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { ItemShadow } from "../../styles/shadow/GeneralShadowStyle"
import ColorUtil from "../../utils/color/ColorUtil"
import { useState, useRef } from "react"
import {
  GeneralFontSize,
  GeneralText,
  GeneralFontWeight,
} from "../../styles/typography/GeneralTextStyle"

const StatusUserContainer = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
`

const StatusUserWrap = styled.div`
  position: relative;
  z-index: 3;
  width: 52px;
  height: 52px;
`

const UserPhoto = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 1000px;
  background: ${GeneralColorStyle.White};
  border: solid 2px ${GeneralColorStyle.Black};
`

const Status = styled.div<{ state: "online" | "offline" }>`
  position: absolute;
  z-index: 4;
  width: 18px;
  height: 18px;
  border-radius: 1000px;
  top: 0;
  right: 0;
  background: ${GeneralColorStyle.Grey};
  box-shadow: 0px 0px 4px ${ColorUtil.addOpacity(GeneralColorStyle.Black, 0.3)};
  cursor: default;

  ${({ state }) =>
    state === `online` &&
    css`
      background: ${GeneralColorStyle.ActiveUser};
    `}
`

const DisplayNameWrap = styled.div<{ isHover: boolean }>`
  position: absolute;
  z-index: 4;
  top: 50%;
  left: 30%;
  transform: translateY(-50%) translateX(0%) scaleX(0);
  transform-origin: center left;
  background: ${ColorUtil.addOpacity(GeneralColorStyle.Black, 0.8)};
  padding: 2px 12px;
  border-radius: 4px;
  box-shadow: ${ItemShadow};

  ${({ isHover }) =>
    isHover &&
    css`
      transform: translateY(-50%) translateX(0%) scaleX(1);
    `}
`

export type Props = {
  photoURL: string
  displayName: string
  state: "online" | "offline"
}

const StatusUserAtoms = ({
  photoURL,
  displayName,
  state = "offline",
}: Props) => {
  const [isHover, setIsHover] = useState(false)
  const imgRef = useRef(null)

  return (
    <StatusUserContainer
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={() => {
        setIsHover(true)

        setTimeout(() => {
          setIsHover(false)
        }, 2000)
      }}
    >
      <StatusUserWrap>
        <UserPhoto
          src={
            photoURL
              ? photoURL
              : "https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png"
          }
          onError={() => {
            imgRef.current.src =
              "https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png"
          }}
          alt="ユーザアイコン"
          ref={imgRef}
        />
        <Status state={state} />
      </StatusUserWrap>

      <DisplayNameWrap isHover={isHover}>
        <GeneralText
          fontSize={GeneralFontSize.SIZE_12}
          fontWeight={GeneralFontWeight.BOLD}
          fontColor={GeneralColorStyle.White}
          style={{ cursor: "default" }}
        >
          {displayName}
        </GeneralText>
      </DisplayNameWrap>
    </StatusUserContainer>
  )
}

export default StatusUserAtoms
