import { useEffect, useState, ChangeEvent, useContext } from "react"
import SendTextMolecules from "./SendTextMolecule"
import styled, { css } from "styled-components"
import FirebaseStoreUtil from "../../../utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "../../../utils/lib/FirebaseAuthenticationUtil"
import CommentsListMolecule from "./CommentsListMolecule"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AuthContext } from "@context/AuthContext"

export type Props = {
  isActive: boolean
  roomId: string
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

const CommentsMolecule = ({ isActive = true, roomId }: Props) => {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser || !roomId) return

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
  }, [roomId, currentUser])

  const changeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const sendMessage = async () => {
    if (!comment) return

    const sendUser = FirebaseAuthenticationUtil.getCurrentUser()
    await FirebaseStoreUtil.createComment(
      roomId,
      sendUser.photoURL,
      sendUser.uid,
      sendUser.displayName,
      comment
    )
    setComment("")
  }

  return (
    <CommentsContainer isActive={isActive}>
      <CommentsListMolecule comments={comments} />

      <SendTextMolecules
        text={comment}
        onChange={changeComment}
        placeholder={"メッセージを入力"}
        onClick={sendMessage}
      />
    </CommentsContainer>
  )
}

export default dynamic(() => Promise.resolve(CommentsMolecule), {
  ssr: false,
})
