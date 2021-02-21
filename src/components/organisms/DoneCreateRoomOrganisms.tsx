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

export type Props = {
  roomId: string
  isOpen: boolean
}

const DoneCreateRoomOrganisms = ({ roomId, isOpen }: Props) => {
  const router = useRouter()

  const joinRoom = () => {
    router.push(`/share_room/${roomId}`)
  }

  return (
    <>
      <MaskAtoms isOpen={isOpen}>
        <CardAtoms width={480}>
          <GeneralText
            fontSize={GeneralFontSize.SIZE_36}
            fontColor={GeneralColorStyle.DarkGreen}
          >
            作成完了
          </GeneralText>
          <GeneralSpacer vertical={20} />

          <IconAtoms
            style={{ width: 120, color: GeneralColorStyle.DarkGreen }}
            icon={faCheckCircle}
          />

          <GeneralSpacer vertical={36} />

          <ButtonAtoms
            bgColor={GeneralColorStyle.ThinGreen}
            text={"ルームに移動"}
            fontColor={GeneralColorStyle.White}
            icon={
              <IconAtoms
                style={{ width: 28, color: GeneralColorStyle.White }}
                icon={faCouch}
              />
            }
            onClick={joinRoom}
          />

          <GeneralSpacer vertical={8} />

          <LinkCopyButtonMolecules roomId={roomId} />
        </CardAtoms>
      </MaskAtoms>
    </>
  )
}

export default DoneCreateRoomOrganisms
