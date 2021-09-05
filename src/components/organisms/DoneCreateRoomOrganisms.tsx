import CardAtoms from "../atoms/CardAtoms"
import MaskAtoms from "../atoms/MaskAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import IconAtoms from "../atoms/IconAtoms"
import { faCouch } from "@fortawesome/free-solid-svg-icons"
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import {
  GeneralFontSize,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import LinkCopyButtonMolecules from "../molecules/LinkCopyButtonMolecules"
import { useRouter } from "next/router"
import useMedia from "use-media"
import FirebaseStoreUtil from "@src/utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "@src/utils/lib/FirebaseAuthenticationUtil"

export type Props = {
  roomId: string
  password: string
  isOpen: boolean
}

const DoneCreateRoomOrganisms = ({ roomId, password, isOpen }: Props) => {
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
      <MaskAtoms isOpen={isOpen}>
        <CardAtoms width={isWide ? 480 : 300}>
          <GeneralText
            fontSize={
              isWide ? GeneralFontSize.SIZE_36 : GeneralFontSize.SIZE_28
            }
            fontColor={GeneralColorStyle.DarkGreen}
          >
            作成完了
          </GeneralText>
          <GeneralSpacer vertical={isWide ? 20 : 8} />

          <IconAtoms
            style={{
              width: isWide ? 120 : 80,
              color: GeneralColorStyle.DarkGreen,
            }}
            icon={faCheckCircle}
          />

          <GeneralSpacer vertical={isWide ? 36 : 20} />

          <ButtonAtoms
            bgColor={GeneralColorStyle.ThinGreen}
            text={"ルームに移動"}
            fontColor={GeneralColorStyle.White}
            icon={
              <IconAtoms
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

          <LinkCopyButtonMolecules roomId={roomId} password={password} />
        </CardAtoms>
      </MaskAtoms>
    </>
  )
}

export default DoneCreateRoomOrganisms
