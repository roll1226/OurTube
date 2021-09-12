import { useRouter } from "next/router"
import InsertRoomPasswordAndGuestMaskOrganism from "../../components/organisms/InsertRoomPasswordAndGuestMaskOrganism"
import HeadAtom from "../../components/atoms/HeadAtom"
import { OurTubePath } from "../../consts/PathConsts"
import { ChangeEvent, useState } from "react"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import { useDispatch } from "react-redux"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import ToastUtil from "@src/utils/toast/ToastUtil"

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
      const user = FirebaseAuthenticationUtil.getCurrentUser()
      if (user) {
        FirebaseStoreUtil.setUserJoinedRoom(roomId, user.uid)
        router.replace(`${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}`)
      } else {
        router.replace(`${OurTubePath.CREATE_GUEST.replace("[id]", roomId)}`)
      }
    } else {
      ToastUtil.error("パスワードが一致しません")
    }
  }

  return (
    <>
      <HeadAtom
        title={"OurTube | ルームパスワード入力"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={`${OurTubePath.TOP}`}
        top={true}
      />

      <InsertRoomPasswordAndGuestMaskOrganism
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
