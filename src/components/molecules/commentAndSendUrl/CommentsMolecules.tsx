import { useEffect, useState, ChangeEvent } from "react"
import firebase from "firebase/app"
import SendTextMolecules from "./SendTextMolecules"
import styled, { css } from "styled-components"
import FirebaseStoreUtil from "../../../utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "../../../utils/lib/FirebaseAuthenticationUtil"
import CommentsListMolecules from "./CommentsListMolecules"
import dynamic from "next/dynamic"
import LoggerUtil from "../../../utils/debugger/LoggerUtil"
import { useRouter } from "next/router"

const commentsList = []
let user: firebase.User | null = null

export type Props = {
  isActive: boolean
}

const CommentsContainer = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  display: none;
  ${({ isActive }) =>
    isActive &&
    css`
      display: block;
    `};
`

const CommentsMolecules = ({ isActive = true }: Props) => {
  const [comment, setComment] = useState("")
  const [commentsListSave, setCommentsListSave] = useState([])
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  useEffect(() => {
    FirebaseStoreUtil.chat(roomId)
      .orderBy("createdAt", "asc")
      .onSnapshot((comments) => {
        if (!comments.size) return
        comments.docChanges().forEach((comment) => {
          if (comment.type === "added") {
            const commentData = comment.doc.data()
            if (!user) user = FirebaseAuthenticationUtil.getCurrentUser()

            commentsList.push({
              comment: commentData.comment,
              name: commentData.name,
              isMyComment: commentData.uid === user.uid ? true : false,
            })
            setCommentsListSave([
              ...commentsList,
              {
                comment: commentData.comment,
                name: user.displayName,
                isMyComment: commentData.uid === user.uid ? true : false,
              },
            ])
          }
        })
      })
  }, [roomId])

  const changeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const sendMessage = async () => {
    LoggerUtil.debug(commentsListSave)
    const sendUser = FirebaseAuthenticationUtil.getCurrentUser()
    await FirebaseStoreUtil.createComment(
      roomId,
      sendUser.uid,
      sendUser.displayName,
      comment
    )
    setComment("")
  }

  return (
    <CommentsContainer isActive={isActive}>
      <CommentsListMolecules comments={commentsList} />

      <SendTextMolecules
        text={comment}
        onChange={changeComment}
        placeholder={"メッセージを入力"}
        onClick={sendMessage}
      />
    </CommentsContainer>
  )
}

export default dynamic(() => Promise.resolve(CommentsMolecules), {
  ssr: false,
})
