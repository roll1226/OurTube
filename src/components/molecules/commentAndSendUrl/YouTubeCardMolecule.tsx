import styled, { css } from "styled-components"
import {
  GeneralTextParagraph,
  GeneralFontSize,
} from "../../../styles/typography/GeneralTextStyle"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import { GeneralSpacer } from "../../../styles/spacer/GeneralSpacerStyle"
import ColorUtil from "../../../utils/color/ColorUtil"
import { ItemShadow } from "../../../styles/shadow/GeneralShadowStyle"
import FirebaseStoreUtil from "../../../utils/lib/FirebaseStoreUtil"
import { useRouter } from "next/router"
import YouTubeThumbnailAtom from "../../atoms/YouTubeThumbnailAtom"

const YouTubeCardContainer = styled.div<{ isNowVideo: boolean }>`
  margin: 4px auto;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  border-radius: 8px;
  transition: all 150ms;

  ${({ isNowVideo }) =>
    !isNowVideo &&
    css`
      cursor: pointer;
      &:hover {
        box-shadow: ${ItemShadow};
      }
    `}

  ${({ isNowVideo }) =>
    isNowVideo &&
    css`
      background: ${ColorUtil.addOpacity(GeneralColorStyle.Grey, 0.4)};
    `}
`

export type Props = {
  title: string
  image: string
  videoId: string
  nowVideoId: string
  videoNumber: number
  stopIntervalCurrentTime: () => void
}

const YouTubeCardMolecule = ({
  title,
  image,
  videoId,
  nowVideoId,
  videoNumber,
  stopIntervalCurrentTime,
}: Props) => {
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  const threePointLeader = (letter: string) => {
    if (letter.length <= 30) return letter
    else return letter.slice(0, 28) + "..."
  }

  const isNowVideo = () => {
    return videoId === nowVideoId ? true : false
  }

  const selectYouTubeVide = () => {
    if (isNowVideo()) return
    stopIntervalCurrentTime()
    FirebaseStoreUtil.selectYouTubeVideo(roomId, videoNumber)
  }

  return (
    <>
      <YouTubeCardContainer
        isNowVideo={isNowVideo()}
        onClick={selectYouTubeVide}
      >
        <GeneralSpacer horizontal={8} />
        <YouTubeThumbnailAtom
          src={image}
          alt={title}
          width={132}
          height={69.56}
        />

        <GeneralSpacer horizontal={8} />

        <GeneralTextParagraph
          fontSize={GeneralFontSize.SIZE_16}
          fontColor={GeneralColorStyle.Black}
        >
          {threePointLeader(title)}
        </GeneralTextParagraph>
        <GeneralSpacer horizontal={8} />
      </YouTubeCardContainer>
    </>
  )
}

export default YouTubeCardMolecule
