import useMedia from "use-media"
import styled, { css } from "styled-components"
import ControlsButtonAtoms from "../atoms/controls/ControlsButtonAtoms"
import { faQuestion } from "@fortawesome/free-solid-svg-icons"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import ColorUtil from "../../utils/color/ColorUtil"
import { ItemShadow } from "../../styles/shadow/GeneralShadowStyle"
import {
  GeneralText,
  GeneralFontSize,
  GeneralFontWeight,
} from "../../styles/typography/GeneralTextStyle"
import { useState } from "react"

const AboutUseBtnContainer = styled.div<{ isWide: boolean }>`
  position: absolute;
  right: 20px;
  ${({ isWide }) =>
    isWide &&
    css`
      right: 40px;
    `}

  bottom: 100px;
`

const NotionTitle = styled.div<{ isHover: boolean; isWide: boolean }>`
  position: absolute;
  z-index: 4;
  top: 50%;
  left: -268%;
  transform: translateY(-50%) translateX(0%);
  transform-origin: center left;
  background: ${ColorUtil.addOpacity(GeneralColorStyle.Black, 0.8)};
  padding: 2px 12px;
  border-radius: 4px;
  box-shadow: ${ItemShadow};
  color: ${GeneralColorStyle.White};
  flex-shrink: 0;
  display: none;
  ${({ isHover }) =>
    isHover &&
    css`
      display: block;
    `}
`

const AboutUserBtnWrap = styled.div`
  position: relative;
`

const NotionButtonMolecules = () => {
  const isWide = useMedia({ minWidth: "480px" })
  const [isHover, setIsHover] = useState(false)

  return (
    <AboutUseBtnContainer
      isWide={isWide}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <AboutUserBtnWrap>
        <a
          href="https://www.notion.so/OurTube-f35756afcd014034a9708b7dad93b5a5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ControlsButtonAtoms size={isWide ? 44 : 56} icon={faQuestion} />
        </a>

        <NotionTitle isHover={isHover} isWide={isWide}>
          <GeneralText
            fontSize={GeneralFontSize.SIZE_12}
            fontWeight={GeneralFontWeight.BOLD}
            fontColor={GeneralColorStyle.White}
            style={{ cursor: "default" }}
          >
            OurTube使い方
          </GeneralText>
        </NotionTitle>
      </AboutUserBtnWrap>
    </AboutUseBtnContainer>
  )
}

export default NotionButtonMolecules
