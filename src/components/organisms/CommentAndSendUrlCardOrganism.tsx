import { useState, ChangeEvent } from "react"
import { faComments } from "@fortawesome/free-regular-svg-icons"
import { faFilm } from "@fortawesome/free-solid-svg-icons"
import CardAtom from "../atoms/CardAtom"
import styled from "styled-components"
import TabMolecule from "../molecules/commentAndSendUrl/TabMolecule"
import CommentsMolecule from "../molecules/commentAndSendUrl/CommentsMolecule"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import UrlSendMolecule from "../molecules/commentAndSendUrl/UrlSendMolecule"
import useMedia from "use-media"
import MaskAtom from "../atoms/MaskAtom"
import { useMobileModalState } from "../../ducks/mobileModal/selectors"
import { useDispatch } from "react-redux"
import mobileModalSlice from "../../ducks/mobileModal/slice"

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
  stopIntervalCurrentTime: () => void
  roomId: string
}

const CommentAndSendUrlCardOrganism = ({
  youTubeUrl,
  changeYouTubeUrl,
  sendYouTubeUrl,
  nowVideoId,
  stopIntervalCurrentTime,
  roomId,
}: Props) => {
  const isWide = useMedia({ minWidth: "480px" })
  const dispatch = useDispatch()
  const [isCommentActive, setIsCommentActive] = useState(true)
  const [isSendUrl, setIsSendUrl] = useState(false)
  const mobileModalState = useMobileModalState().mobileModal

  const selectTab = (isSelect: boolean) => {
    setIsCommentActive(isSelect)
    setIsSendUrl(!isSelect)
  }

  return (
    <>
      {isWide && (
        <CardAtom
          width={"28"}
          height={"60"}
          isPadding={false}
          bgColor={GeneralColorStyle.White}
        >
          <TabsContainer>
            <TabMolecule
              icon={faComments}
              position={"left"}
              isActive={isCommentActive}
              onClick={() => selectTab(true)}
              name={"チャット"}
            />

            <TabMolecule
              icon={faFilm}
              position={"right"}
              isActive={isSendUrl}
              onClick={() => selectTab(false)}
              name={"動画リスト"}
            />
          </TabsContainer>
          <CommentsMolecule isActive={isCommentActive} roomId={roomId} />

          <UrlSendMolecule
            isActive={isSendUrl}
            youTubeUrl={youTubeUrl}
            changeYouTubeUrl={changeYouTubeUrl}
            sendYouTubeUrl={sendYouTubeUrl}
            nowVideoId={nowVideoId}
            stopIntervalCurrentTime={stopIntervalCurrentTime}
            roomId={roomId}
          />
        </CardAtom>
      )}

      {!isWide && (
        <MaskAtom
          isOpen={mobileModalState.isOpen}
          onClick={() => dispatch(mobileModalSlice.actions.setIsOpen(false))}
        >
          <CardAtom
            width={"90"}
            height={"60"}
            isPadding={false}
            bgColor={GeneralColorStyle.White}
          >
            <TabsContainer>
              <TabMolecule
                icon={faComments}
                position={"left"}
                isActive={isCommentActive}
                onClick={() => selectTab(true)}
                name={"コメント"}
              />

              <TabMolecule
                icon={faFilm}
                position={"right"}
                isActive={isSendUrl}
                onClick={() => selectTab(false)}
                name={"動画リスト"}
              />
            </TabsContainer>
            <CommentsMolecule isActive={isCommentActive} roomId={roomId} />

            <UrlSendMolecule
              isActive={isSendUrl}
              youTubeUrl={youTubeUrl}
              changeYouTubeUrl={changeYouTubeUrl}
              sendYouTubeUrl={sendYouTubeUrl}
              nowVideoId={nowVideoId}
              stopIntervalCurrentTime={stopIntervalCurrentTime}
              roomId={roomId}
            />
          </CardAtom>
        </MaskAtom>
      )}
    </>
  )
}

export default CommentAndSendUrlCardOrganism
