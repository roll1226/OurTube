import CardAtoms from "../atoms/CardAtoms"
import MaskAtoms from "../atoms/MaskAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import IconAtoms from "../atoms/IconAtoms"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import {
  GeneralFontSize,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import LinkCopyButtonMolecules from "../molecules/LinkCopyButtonMolecules"
import { useRouter } from "next/router"
import SendTextMolecules from "../molecules/commentAndSendUrl/SendTextMolecules"
import { useState, ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { asyncSearchYouTube } from "../../ducks/search/asyncActions"
import { useSearchState } from "../../ducks/search/selectors"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import modalSlice from "../../ducks/modal/slice"
import styled from "styled-components"
import YouTubeClickActionCardMolecules from "../molecules/YouTubeClickActionCardMolecules"
import { useModalState } from "../../ducks/modal/selectors"
import searchSlice from "../../ducks/search/slice"

const RoomCardWrap = styled.div`
  padding: 8px;
  width: 100%;
  height: 360px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background: ${GeneralColorStyle.DarkBlue};
  }
`

const SearchCardWrap = styled.div`
  position: relative;
  z-index: 34;
`

const SearchYouTubeModalOrganisms = () => {
  const dispatch = useDispatch()
  const searchState = useSearchState().search
  const modalState = useModalState().modal
  const [searchKeyword, setSearchKeyword] = useState("")

  const insertSearchKeyWord = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }

  const searchYouTube = () => {
    if (!searchKeyword) return
    dispatch(asyncSearchYouTube(searchKeyword))
    LoggerUtil.debug(searchState.result)
  }

  const closeModal = () => {
    dispatch(modalSlice.actions.setIsActive(false))
    dispatch(searchSlice.actions.setResult([]))
    setSearchKeyword("")
  }

  return (
    <>
      <MaskAtoms isOpen={modalState.isOpen} onClick={closeModal}>
        <SearchCardWrap>
          <CardAtoms width={400}>
            <GeneralText fontSize={GeneralFontSize.SIZE_36}>
              動画検索
            </GeneralText>
            <GeneralSpacer vertical={24} />

            {searchState.result.length !== 0 && (
              <>
                <RoomCardWrap>
                  {searchState.result.map((video, index) => (
                    <YouTubeClickActionCardMolecules
                      key={index}
                      text={video.title}
                      videoId={video.id}
                      icon={faCopy}
                      youTubeUrl={video.url}
                    />
                  ))}
                </RoomCardWrap>
                <GeneralSpacer vertical={8} />
              </>
            )}

            <SendTextMolecules
              placeholder={"動画検索"}
              text={searchKeyword}
              onChange={insertSearchKeyWord}
              onClick={searchYouTube}
            />
          </CardAtoms>
        </SearchCardWrap>
      </MaskAtoms>
    </>
  )
}

export default SearchYouTubeModalOrganisms
