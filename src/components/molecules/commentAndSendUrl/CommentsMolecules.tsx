import { useEffect, useState, ChangeEvent } from "react"
import SendTextMolecules from "./SendTextMolecules"
import styled, { css } from "styled-components"
import FirebaseStoreUtil from "../../../utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "../../../utils/lib/FirebaseAuthenticationUtil"
import CommentsListMolecules from "./CommentsListMolecules"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"

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
  const [comments, setComments] = useState([])
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  useEffect(() => {
    const unsubscribe = FirebaseStoreUtil.chat(roomId)
      .orderBy("createdAt", "asc")
      .onSnapshot((comments) => {
        if (!comments.size) return

        const user = FirebaseAuthenticationUtil.getCurrentUser()

        const msgs = []
        comments.forEach((comment) => {
          msgs.push({
            ...comment.data(),
            isMyComment: comment.data().uid === user.uid ? true : false,
          })
        })
        setComments(msgs)
      })

    return () => unsubscribe()
  }, [roomId])

  const changeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const sendMessage = async () => {
    if (!comment) return

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
      <CommentsListMolecules comments={comments} />

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
