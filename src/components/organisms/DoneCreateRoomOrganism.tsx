import CardAtom from "../atoms/CardAtom"
import MaskAtom from "../atoms/MaskAtom"
import ButtonAtom from "../atoms/ButtonAtom"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import IconAtom from "../atoms/IconAtom"
import { faCouch } from "@fortawesome/free-solid-svg-icons"
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import {
  GeneralFontSize,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import LinkCopyButtonMolecule from "../molecules/LinkCopyButtonMolecule"
import { useRouter } from "next/router"
import useMedia from "use-media"
import FirebaseStoreUtil from "@src/utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "@src/utils/lib/FirebaseAuthenticationUtil"

export type Props = {
  roomId: string
  password: string
  isOpen: boolean
}

const DoneCreateRoomOrganism = ({ roomId, password, isOpen }: Props) => {
  const router = useRouter()
  const isWide = useMedia({ minWidth: "480px" })

  const joinRoom = async (roomId: string) => {
    const currentUser = FirebaseAuthenticationUtil.getCurrentUser()
    await FirebaseStoreUtil.users(currentUser.uid).update({
      nowRoomId: roomId,
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
    router.push(`/share_room/${roomId}`)
  }

  return (
    <>
      <MaskAtom isOpen={isOpen}>
        <CardAtom width={isWide ? 480 : 300}>
          <GeneralText
            fontSize={
              isWide ? GeneralFontSize.SIZE_36 : GeneralFontSize.SIZE_28
            }
            fontColor={GeneralColorStyle.DarkGreen}
          >
            作成完了
          </GeneralText>
          <GeneralSpacer vertical={isWide ? 20 : 8} />

          <IconAtom
            style={{
              width: isWide ? 120 : 80,
              color: GeneralColorStyle.DarkGreen,
            }}
            icon={faCheckCircle}
          />

          <GeneralSpacer vertical={isWide ? 36 : 20} />

          <ButtonAtom
            bgColor={GeneralColorStyle.ThinGreen}
            text={"ルームに移動"}
            fontColor={GeneralColorStyle.White}
            icon={
              <IconAtom
                style={{
                  width: isWide ? 28 : 24,
                  color: GeneralColorStyle.White,
                }}
                icon={faCouch}
              />
            }
            onClick={() => joinRoom(roomId)}
          />

          <GeneralSpacer vertical={8} />

          <LinkCopyButtonMolecule roomId={roomId} password={password} />
        </CardAtom>
      </MaskAtom>
    </>
  )
}

export default DoneCreateRoomOrganism
