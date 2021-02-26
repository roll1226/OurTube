import styled, { css } from "styled-components"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../../styles/spacer/GeneralSpacerStyle"
import {
  GeneralText,
  GeneralTextParagraph,
  GeneralFontSize,
} from "../../../styles/typography/GeneralTextStyle"

const CommentContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const CommentWraps = styled.div``

const UserPhoto = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 1000px;
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
  photoURL: string
  isMyComment: boolean
}

const CommentAtoms = ({ name, comment, photoURL, isMyComment }: Props) => {
  return (
    <CommentContainer>
      <UserPhoto src={photoURL} alt="ユーザアイコン" />

      <GeneralSpacer horizontal={4} />

      <CommentWraps>
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
      </CommentWraps>
    </CommentContainer>
  )
}

export default CommentAtoms
