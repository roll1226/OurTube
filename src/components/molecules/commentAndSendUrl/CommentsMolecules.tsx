import { useEffect, useState, ChangeEvent, useRef } from "react"
import firebase from "firebase/app"
import SendTextMolecules from "./SendTextMolecules"
import { useRouter } from "next/router"
import FirebaseStoreUtil from "../../../utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "../../../utils/lib/FirebaseAuthenticationUtil"
import CommentsListMolecules from "./CommentsListMolecules"

const commentsList = []
let user: firebase.User | null = null

const CommentsMolecules = () => {
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  const [comment, setComment] = useState("")
  const [commentsListSave, setCommentsListSave] = useState([])

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
              name: user.displayName,
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
    <>
      <CommentsListMolecules comments={commentsList} />

      <SendTextMolecules
        text={comment}
        onChange={changeComment}
        placeholder={"メッセージを入力"}
        onClick={sendMessage}
      />
    </>
  )
}

export default CommentsMolecules
