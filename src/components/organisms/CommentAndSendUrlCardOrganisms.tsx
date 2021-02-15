import { useState } from "react"
import { faComments } from "@fortawesome/free-regular-svg-icons"
import { faFilm } from "@fortawesome/free-solid-svg-icons"
import CardAtoms from "../atoms/CardAtoms"
import styled from "styled-components"
import TabMolecules from "../molecules/commentAndSendUrl/TabAtoms"
import CommentsMolecules from "../molecules/commentAndSendUrl/CommentsMolecules"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  cursor: pointer;
`

const CommentAndSendUrlCardOrganisms = () => {
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
      {isCommentActive && <CommentsMolecules />}
    </CardAtoms>
  )
}

export default CommentAndSendUrlCardOrganisms
