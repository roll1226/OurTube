import Link from "next/link"
import styled from "styled-components"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import YouTubeThumbnailAtoms from "../atoms/YouTubeThumbnailAtoms"
import OurTubeInfoCardMolecules from "./OurTubeInfoCardMolecules"
import { HoverItem, ItemShadow } from "../../styles/shadow/GeneralShadowStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import IconAtoms from "../atoms/IconAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { useRouter } from "next/router"
import { CopyToClipboard } from "react-copy-to-clipboard"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import { useDispatch } from "react-redux"
import toastSlice from "../../ducks/toast/slice"

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
}

const YouTubeCLickAction = (videoId: string, text: string, icon: IconProp) => {
  return (
    <YouTubeClickActionCardContainer>
      <GeneralSpacer horizontal={16} />

      <YouTubeThumbnailAtoms
        src={
          videoId
            ? `http://img.youtube.com/vi/${videoId}/mqdefault.jpg`
            : "https://firebasestorage.googleapis.com/v0/b/our-tubes.appspot.com/o/signIn%2Fnot_thumbnail.jpg?alt=media&token=013ab526-b66f-4345-8682-ab0bc7caa3c0"
        }
        alt={"サムネイル"}
        width={124}
        height={69.56}
      />

      <GeneralSpacer horizontal={8} />

      <OurTubeInfoCardMolecules text={text} />

      <GeneralSpacer horizontal={8} />

      <IconAtoms
        style={{ width: 48, color: GeneralColorStyle.DarkGreen }}
        icon={icon}
      />

      <GeneralSpacer horizontal={16} />
    </YouTubeClickActionCardContainer>
  )
}

const YouTubeClickActionCardMolecules = ({
  text,
  videoId,
  icon,
  roomId,
  youTubeUrl,
}: Props) => {
  const dispatch = useDispatch()

  const pageTransition = () => {
    dispatch(toastSlice.actions.setIsActive(true))
    dispatch(toastSlice.actions.setText("コピーしました"))
    dispatch(toastSlice.actions.setToastColor("success"))

    setTimeout(() => {
      dispatch(toastSlice.actions.setIsActive(false))
    }, 2000)
  }

  if (roomId) {
    return (
      <Link href={`/share_room/${roomId}`}>
        {YouTubeCLickAction(videoId, text, icon)}
      </Link>
    )
  }

  return (
    <CopyToClipboard text={youTubeUrl} onCopy={pageTransition}>
      {YouTubeCLickAction(videoId, text, icon)}
    </CopyToClipboard>
  )
}

export default YouTubeClickActionCardMolecules
