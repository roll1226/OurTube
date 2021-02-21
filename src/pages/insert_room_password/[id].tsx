import { useRouter } from "next/router"
import InsertRoomPasswordAndGuestMaskOrganisms from "../../components/organisms/InsertRoomPasswordAndGuestMaskOrganisms"
import HeadAtoms from "../../components/atoms/HeadAtoms"
import { OurTubePath } from "../../consts/PathConsts"
import { ChangeEvent, useState } from "react"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import { useDispatch } from "react-redux"
import toastSlice from "../../ducks/toast/slice"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"

const InsertRoomPassword = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  const [roomPassword, setRoomPassword] = useState("")

  const insertRoomPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomPassword(event.target.value)
  }

  const checkRoomPassword = async () => {
    const room = await FirebaseStoreUtil.room(roomId).get()

    if (room.data().password === roomPassword) {
      // dispatch(toastSlice.actions.setText("パスワードが一致しました"))
      // dispatch(toastSlice.actions.setIsActive(true))
      // dispatch(toastSlice.actions.setToastColor("success"))
      // setTimeout(() => {
      //   dispatch(toastSlice.actions.setIsActive(false))
      // }, 2000)

      const user = FirebaseAuthenticationUtil.getCurrentUser()
      if (user) {
        FirebaseStoreUtil.setUserJoinedRoom(roomId, user.uid)
        router.replace(`${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}`)
      } else {
        router.replace(`${OurTubePath.CREATE_GUEST.replace("[id]", roomId)}`)
      }
    } else {
      dispatch(toastSlice.actions.setText("パスワードが一致しません"))
      dispatch(toastSlice.actions.setIsActive(true))
      dispatch(toastSlice.actions.setToastColor("error"))
      setTimeout(() => {
        dispatch(toastSlice.actions.setIsActive(false))
      }, 2000)
    }
  }

  return (
    <>
      <HeadAtoms
        title={"OurTube | ルームパスワード入力"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={`${OurTubePath.TOP}`}
        top={true}
      />

      <InsertRoomPasswordAndGuestMaskOrganisms
        title={"ルームパスワードを入力"}
        placeholder={"ルームパスワードを入力"}
        value={roomPassword}
        onChange={insertRoomPassword}
        onClick={checkRoomPassword}
      />
    </>
  )
}

export default InsertRoomPassword
