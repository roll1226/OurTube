import styled from "styled-components"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"

const YouTubeListContainer = styled.div`
  margin: 16px 28px;
  width: 344px;
  height: 428px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background: ${GeneralColorStyle.DarkBlue};
  }
`

const YouTubeListMolecules = () => {
  return <YouTubeListContainer></YouTubeListContainer>
}

export default YouTubeListMolecules
