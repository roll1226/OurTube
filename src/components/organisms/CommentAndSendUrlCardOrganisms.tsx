import { useState, ChangeEvent } from "react"
import { faComments } from "@fortawesome/free-regular-svg-icons"
import { faFilm } from "@fortawesome/free-solid-svg-icons"
import CardAtoms from "../atoms/CardAtoms"
import styled from "styled-components"
import TabMolecules from "../molecules/commentAndSendUrl/TabAtoms"
import CommentsMolecules from "../molecules/commentAndSendUrl/CommentsMolecules"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import UrlSendMolecules from "../molecules/commentAndSendUrl/UrlSendMolecules "

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  cursor: pointer;
`

export type Props = {
  youTubeUrl: string
  changeYouTubeUrl: (event: ChangeEvent<HTMLInputElement>) => void
  sendYouTubeUrl: () => void
  nowVideoId: string
}

const CommentAndSendUrlCardOrganisms = ({
  youTubeUrl,
  changeYouTubeUrl,
  sendYouTubeUrl,
  nowVideoId,
}: Props) => {
  const [isCommentActive, setIsCommentActive] = useState(true)
  const [isSendUrl, setIsSendUrl] = useState(false)

  const selectTab = (isSelect: boolean) => {
    setIsCommentActive(isSelect)
    setIsSendUrl(!isSelect)
  }

  return (
    <CardAtoms width={400} isPadding={false} bgColor={GeneralColorStyle.White}>
      <TabsContainer>
        <TabMolecules
          icon={faComments}
          position={"left"}
          isActive={isCommentActive}
          onClick={() => selectTab(true)}
        />

        <TabMolecules
          icon={faFilm}
          position={"right"}
          isActive={isSendUrl}
          onClick={() => selectTab(false)}
        />
      </TabsContainer>
      <CommentsMolecules isActive={isCommentActive} />

      <UrlSendMolecules
        isActive={isSendUrl}
        youTubeUrl={youTubeUrl}
        changeYouTubeUrl={changeYouTubeUrl}
        sendYouTubeUrl={sendYouTubeUrl}
        nowVideoId={nowVideoId}
      />
    </CardAtoms>
  )
}

export default CommentAndSendUrlCardOrganisms
