import MaskAtom from "../atoms/MaskAtom"
import CardAtom from "../atoms/CardAtom"
import {
  GeneralFontSize,
  GeneralText,
  GeneralFontWeight,
} from "../../styles/typography/GeneralTextStyle"
import styled from "styled-components"
import IconAtom from "../atoms/IconAtom"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import ButtonAtom from "../atoms/ButtonAtom"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { useHowToUseState } from "../../ducks/howToUse/selectors"
import { useDispatch } from "react-redux"
import howToUseSlice from "../../ducks/howToUse/slice"
import { useState, useEffect } from "react"
import LoggerUtil from "../../utils/debugger/LoggerUtil"

const HowToUseImgWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const HowToUseModalOrganism = () => {
  const dispatch = useDispatch()
  const howToUseState = useHowToUseState().howToUse
  const [pageNum, setPageNum] = useState(1)

  const initialState = localStorage.getItem("isAlreadyOpen")
    ? JSON.parse(localStorage.getItem("isAlreadyOpen"))
    : {
        isAlready: false,
      }
  const [isAlreadyOpen, setIsAlreadyOpen] = useState(initialState)

  useEffect(() => {
    if (isAlreadyOpen.isAlready) return
    LoggerUtil.debug(isAlreadyOpen)
    dispatch(howToUseSlice.actions.setIsOpen(true))
    localStorage.setItem(
      "isAlreadyOpen",
      JSON.stringify({
        isAlready: true,
      })
    )
  }, [isAlreadyOpen, dispatch])

  const closeModal = () => {
    dispatch(howToUseSlice.actions.setIsOpen(false))
  }

  const prev = () => {
    if (pageNum === 1) return
    setPageNum(1)
  }

  const next = () => {
    if (pageNum === 2) return
    setPageNum(2)
  }

  return (
    <MaskAtom isOpen={howToUseState.isOpen} onClick={closeModal}>
      <CardAtom width={1040}>
        <GeneralText
          fontSize={GeneralFontSize.SIZE_36}
          fontColor={GeneralColorStyle.DarkGreen}
          fontWeight={GeneralFontWeight.BOLD}
        >
          OurTubeの使い方
        </GeneralText>

        <HowToUseImgWrap>
          <div
            onClick={prev}
            style={{
              opacity: pageNum === 1 ? 0 : 1,
              cursor: pageNum === 1 ? "default" : "pointer",
            }}
          >
            <IconAtom style={{ width: 32 }} icon={faAngleLeft} />
          </div>

          {pageNum === 1 && (
            <img src="/img/howToUse1.jpg" alt="画像" width={840} />
          )}
          {pageNum === 2 && (
            <img src="/img/howToUse2.jpg" alt="画像" width={840} />
          )}

          <div
            onClick={next}
            style={{
              opacity: pageNum === 2 ? 0 : 1,
              cursor: pageNum === 2 ? "default" : "pointer",
            }}
          >
            <IconAtom style={{ width: 32 }} icon={faAngleRight} />
          </div>
        </HowToUseImgWrap>

        <ButtonAtom
          bgColor={GeneralColorStyle.ThinBlue}
          text={"とじる"}
          fontColor={GeneralColorStyle.White}
          onClick={closeModal}
        />
      </CardAtom>
    </MaskAtom>
  )
}

export default HowToUseModalOrganism
