import styled, { css } from "styled-components"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../../styles/spacer/GeneralSpacerStyle"
import { useRef } from "react"
import {
  GeneralText,
  GeneralTextParagraph,
  GeneralFontSize,
} from "../../../styles/typography/GeneralTextStyle"

const CommentContainer = styled.div`
  margin: 0 auto 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
`

const CommentWraps = styled.div``

const UserPhoto = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 1000px;
  border: solid 2px ${GeneralColorStyle.Black};
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
  const imgRef = useRef(null)

  return (
    <CommentContainer>
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
