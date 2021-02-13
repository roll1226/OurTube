import styled, { css } from "styled-components"

export type GeneralSpacerStyleProps = {
  vertical?: number
  horizontal?: number
}

export const GeneralSpacer = styled.span<GeneralSpacerStyleProps>`
  ${({ vertical }) =>
    vertical &&
    css`
      margin-top: ${vertical}px;
    `}
  ${({ horizontal }) =>
    horizontal &&
    css`
      margin-left: ${horizontal}px;
    `}
`
