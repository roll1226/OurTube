import { useRef, useEffect } from "react"
import styled from "styled-components"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import CommentAtoms from "../../atoms/commentAndSendUrl/CommentAtoms"
import {
  GeneralFontSize,
  GeneralText,
} from "../../../styles/typography/GeneralTextStyle"

const CommentsListContainer = styled.div`
  margin: 16px 28px;
  width: 344px;
  height: 360px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background: ${GeneralColorStyle.DarkBlue};
  }
`

export type Props = {
  comments: {
    name: string
    isMyComment: boolean
    comment: string
  }[]
}

const CommentsListMolecules = ({ comments }: Props) => {
  const commentEndRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (commentEndRef.current) {
      commentEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [comments])

  return (
    <CommentsListContainer>
      {comments.map((comment, index) => (
        <CommentAtoms
          key={index}
          name={comment.name}
          isMyComment={comment.isMyComment}
          comment={comment.comment}
        />
      ))}

      {!comments.length && (
        <>
          <GeneralText fontSize={GeneralFontSize.SIZE_16}>
            コメントはまだありません
          </GeneralText>
        </>
      )}
      <span ref={commentEndRef} />
    </CommentsListContainer>
  )
}

export default CommentsListMolecules
