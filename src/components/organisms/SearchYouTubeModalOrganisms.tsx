import CardAtoms from "../atoms/CardAtoms"
import MaskAtoms from "../atoms/MaskAtoms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import {
  GeneralFontSize,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
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

const SearchedYouTubeWrap = styled.div`
  padding: 4px;
  width: 90%;
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
    setSearchKeyword("")
  }

  const closeModal = () => {
    dispatch(modalSlice.actions.setIsActive(false))
    dispatch(searchSlice.actions.setResult([]))
    setSearchKeyword("")
  }

  return (
    <>
      <MaskAtoms isOpen={modalState.isOpen} onClick={closeModal}>
        <CardAtoms width={500} isPadding={false}>
          <GeneralSpacer vertical={28} />

          <GeneralText fontSize={GeneralFontSize.SIZE_36}>動画検索</GeneralText>
          <GeneralSpacer vertical={24} />

          {searchState.result.length !== 0 && (
            <>
              <GeneralText fontSize={GeneralFontSize.SIZE_16}>
                ここに場合はYouTube公式からコピーしてください
              </GeneralText>
              <SearchedYouTubeWrap>
                {searchState.result.map((video, index) => (
                  <YouTubeClickActionCardMolecules
                    key={index}
                    text={video.title}
                    videoId={video.id}
                    icon={faCopy}
                    youTubeUrl={video.url}
                  />
                ))}
              </SearchedYouTubeWrap>
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
      </MaskAtoms>
    </>
  )
}

export default SearchYouTubeModalOrganisms
