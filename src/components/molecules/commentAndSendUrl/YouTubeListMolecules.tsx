import styled from "styled-components"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import YouTubeCardAtoms from "../../atoms/commentAndSendUrl/YouTubeCardAtoms"

const YouTubeListContainer = styled.div`
  margin: 16px 24px;
  padding: 0 4px;
  width: 344px;
  height: 408px;
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
}

const YouTubeListMolecules = ({ youTubes, nowVideoId }: Props) => {
  return (
    <YouTubeListContainer>
      {youTubes.map((youTube, index) => (
        <YouTubeCardAtoms
          key={index}
          videoNumber={index}
          title={youTube.title}
          image={youTube.image}
          videoId={youTube.videoId}
          nowVideoId={nowVideoId}
        />
      ))}
    </YouTubeListContainer>
  )
}

export default YouTubeListMolecules
