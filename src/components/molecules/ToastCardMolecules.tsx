import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { HoverItem } from "../../styles/shadow/GeneralShadowStyle"
import IconAtoms from "../atoms/IconAtoms"
import {
  GeneralText,
  GeneralFontSize,
} from "../../styles/typography/GeneralTextStyle"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import { ToastAnimation } from "../../styles/animation/GeneralAnimationStyle"
import { useToastState } from "../../ducks/toast/selectors"
import useMedia from "use-media"

const ToastCardContainer = styled.div<{
  isActive: boolean
  toastColor: string
}>`
  position: fixed;
  padding: 8px 28px;
  z-index: 100;
  top: 110%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ toastColor }) =>
    toastColor === "success"
      ? GeneralColorStyle.DarkGreen
      : GeneralColorStyle.Error};
  border-radius: 1000px;
  box-shadow: ${HoverItem};
  transition: all 300ms ${ToastAnimation};

  ${({ isActive }) =>
    isActive &&
    css`
      top: 92%;
    `}

  display: flex;
  flex-direction: row;
  align-items: center;
`

const toastIcon = (toastColor: "success" | "error" | "", isWide: boolean) => {
  if (toastColor === "success") {
    return (
      <IconAtoms
        style={{ width: isWide ? 20 : 32, color: GeneralColorStyle.White }}
        icon={faCheckCircle}
      />
    )
  } else if (toastColor === "error") {
    return (
      <IconAtoms
        style={{ width: isWide ? 20 : 32, color: GeneralColorStyle.White }}
        icon={faExclamationCircle}
      />
    )
  }
}

const ToastCardMolecules = () => {
  const isWide = useMedia({ minWidth: "480px" })
  const toastState = useToastState().toast

  return (
    <ToastCardContainer
      isActive={toastState.isActive}
      toastColor={toastState.toastColor}
    >
      {toastIcon(toastState.toastColor, isWide)}

      <GeneralSpacer horizontal={8} />

      <GeneralText
        fontSize={isWide ? GeneralFontSize.SIZE_20 : GeneralFontSize.SIZE_12}
        fontColor={GeneralColorStyle.White}
      >
        {toastState.text}
      </GeneralText>
    </ToastCardContainer>
  )
}

export default ToastCardMolecules
