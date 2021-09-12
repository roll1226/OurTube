import Link from "next/link"
import styled from "styled-components"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import YouTubeThumbnailAtom from "../atoms/YouTubeThumbnailAtom"
import OurTubeInfoCardMolecule from "./OurTubeInfoCardMolecule"
import { HoverItem, ItemShadow } from "../../styles/shadow/GeneralShadowStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import IconAtom from "../atoms/IconAtom"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { useRouter } from "next/router"
import { CopyToClipboard } from "react-copy-to-clipboard"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import { useDispatch } from "react-redux"
import ToastUtil from "@src/utils/toast/ToastUtil"
import FirebaseAuthenticationUtil from "@src/utils/lib/FirebaseAuthenticationUtil"
import FirebaseStoreUtil from "@src/utils/lib/FirebaseStoreUtil"

const YouTubeClickActionCardContainer = styled.div`
  padding: 12px 0;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  box-shadow: ${ItemShadow};
  border-radius: 8px;
  width: 100%;
  transition: all 150ms;
  cursor: pointer;

  &:hover {
    box-shadow: ${HoverItem};
  }
`

export type Props = {
  text: string
  videoId: string
  icon: IconProp
  roomId?: string
  youTubeUrl?: string
  isDemo?: boolean
}

const YouTubeCLickAction = (videoId: string, text: string, icon: IconProp) => {
  return (
    <YouTubeClickActionCardContainer>
      <GeneralSpacer horizontal={16} />

      <YouTubeThumbnailAtom
        src={
          videoId
            ? `http://img.youtube.com/vi/${videoId}/mqdefault.jpg`
            : "/img/not_thumbnail.jpeg"
        }
        alt={"サムネイル"}
        width={124}
        height={69.56}
      />

      <GeneralSpacer horizontal={8} />

      <OurTubeInfoCardMolecule text={text} />

      <GeneralSpacer horizontal={8} />

      <IconAtom
        style={{ width: 48, color: GeneralColorStyle.DarkGreen }}
        icon={icon}
      />

      <GeneralSpacer horizontal={16} />
    </YouTubeClickActionCardContainer>
  )
}

const YouTubeClickActionCardMolecule = ({
  text,
  videoId,
  icon,
  roomId,
  youTubeUrl,
  isDemo = false,
}: Props) => {
  const router = useRouter()

  const pageTransition = () => {
    ToastUtil.success("コピーしました")
  }

  const pushRoom = async (roomId: string, isDemo: boolean) => {
    const currentUser = FirebaseAuthenticationUtil.getCurrentUser()
    await FirebaseStoreUtil.users(currentUser.uid).update({
      nowRoomId: roomId,
      updatedAt: FirebaseStoreUtil.getTimeStamp(),
    })
    if (roomId === "demoRoom") return router.push("/demo_room")
    router.push(`/share_room/${roomId}`)
  }

  if (roomId) {
    return (
      <div onClick={() => pushRoom(roomId, isDemo)}>
        {YouTubeCLickAction(videoId, text, icon)}
      </div>
    )
  }

  return (
    <CopyToClipboard text={youTubeUrl} onCopy={pageTransition}>
      {YouTubeCLickAction(videoId, text, icon)}
    </CopyToClipboard>
  )
}

export default YouTubeClickActionCardMolecule
