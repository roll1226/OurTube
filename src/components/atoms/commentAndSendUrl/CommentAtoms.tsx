import styled, { css } from "styled-components"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import {
  GeneralText,
  GeneralTextParagraph,
  GeneralFontSize,
} from "../../../styles/typography/GeneralTextStyle"

const CommentContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const CommentWrap = styled.div<{ isMyComment: boolean }>`
  padding: 8px 16px;
  width: auto;
  border-radius: 0 24px 24px 24px;
  background: ${GeneralColorStyle.ThinBlue};

  ${({ isMyComment }) =>
    isMyComment &&
    css`
      background: ${GeneralColorStyle.ThinGreen};
    `};
`

export type Props = {
  name: string
  comment: string
  isMyComment: boolean
}

const CommentAtoms = ({ name, comment, isMyComment }: Props) => {
  return (
    <CommentContainer>
      <GeneralText
        fontSize={GeneralFontSize.SIZE_12}
        fontColor={GeneralColorStyle.Black}
      >
        {name}
      </GeneralText>

      <CommentWrap isMyComment={isMyComment}>
        <GeneralTextParagraph
          fontSize={GeneralFontSize.SIZE_16}
          fontColor={GeneralColorStyle.White}
        >
          {comment}
        </GeneralTextParagraph>
      </CommentWrap>
    </CommentContainer>
  )
}

export default CommentAtoms
