import styled from "styled-components"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import YouTubeCardMolecule from "./YouTubeCardMolecule"
import {
  GeneralText,
  GeneralFontSize,
} from "../../../styles/typography/GeneralTextStyle"

const YouTubeListContainer = styled.div`
  margin: 16px auto;
  width: 90%;
  height: calc(56vh - 132px);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background: ${GeneralColorStyle.DarkBlue};
  }
`

export type Props = {
  youTubes: {
    title: string
    image: string
    videoId: string
  }[]
  nowVideoId: string
  stopIntervalCurrentTime: () => void
}

const YouTubeListMolecule
 = ({
  youTubes,
  nowVideoId,
  stopIntervalCurrentTime,
}: Props) => {
  return (
    <YouTubeListContainer>
      {youTubes.map((youTube, index) => (
        <YouTubeCardMolecule
          key={index}
          videoNumber={index}
          title={youTube.title}
          image={youTube.image}
          videoId={youTube.videoId}
          nowVideoId={nowVideoId}
          stopIntervalCurrentTime={stopIntervalCurrentTime}
        />
      ))}

      {!youTubes.length && (
        <>
          <GeneralText fontSize={GeneralFontSize.SIZE_16}>
            動画はまだありません
          </GeneralText>
        </>
      )}
    </YouTubeListContainer>
  )
}

export default YouTubeListMolecule
