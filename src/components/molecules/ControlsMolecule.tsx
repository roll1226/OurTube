import { useEffect, TouchEvent } from "react"
import {
  faPause,
  faPlay,
  // faSearch,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons"
import React, { ChangeEvent, MouseEvent, useState } from "react"
import styled from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { CardShadow } from "../../styles/shadow/GeneralShadowStyle"
import ControlsButtonAtom from "../atoms/controls/ControlsButtonAtom"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import ControlsCurrentTimeRangeInputAtom from "../atoms/controls/ControlsCurrentTimeRangeInputAtom"
import ControlsYouTubeTitleAtom from "../atoms/controls/ControlsYouTubeTitleAtom"
import ControlsVolumeRangeInputAtom from "../atoms/controls/ControlsVolumeRangeInputAtom"
import dynamic from "next/dynamic"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import { useRouter } from "next/router"
// import { useDispatch } from "react-redux"
// import modalSlice from "../../ducks/modal/slice"
import {
  GeneralFontSize,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import DataUtil from "../../utils/date/DataUtil"
import useMedia from "use-media"

const ControlsContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 80px;

  box-shadow: ${CardShadow};
  background: ${GeneralColorStyle.White};
`

const ControlsWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  /* border-top: 4px solid transparent; */
`

const VolumeContainer = styled.div`
  position: relative;
`

const ControlItemsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export type Props = {
  changeCurrentTime: (range: ChangeEvent<HTMLInputElement>) => void
  changeVolume: (range: ChangeEvent<HTMLInputElement>) => void
  mouseDownCurrentTime: () => void
  mouseUpCurrentTime: (
    range: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => void
  currentTimeMax: number
  isPlayYouTube: boolean
  currentTimeValue: number
  play: () => void
  pause: () => void
  mute: () => void
  isMute: boolean
  volumeValue: number
  videoId: string
  onTouchEnd: (range: TouchEvent<HTMLInputElement>) => void
  onTouchStart: () => void
  onTouchMove: (event: TouchEvent<HTMLInputElement>) => void
}

/**
 * play btn
 * @param isPlay
 * @param play
 * @param pause
 */
const PlayBtn = (
  isPlay: boolean,
  play: () => void,
  pause: () => void,
  videoId: string
) => {
  if (isPlay) {
    return (
      <>
        <ControlsButtonAtom
          size={48}
          icon={faPause}
          onClick={pause}
          isActive={videoId ? true : false}
        />
      </>
    )
  } else {
    return (
      <>
        <ControlsButtonAtom
          size={48}
          icon={faPlay}
          onClick={play}
          isActive={videoId ? true : false}
        />
      </>
    )
  }
}

/**
 * mute btn
 * @param isMute
 * @param volume
 */
const MuteBtn = (isMute: boolean, volume: number) => {
  if (isMute) {
    return faVolumeMute
  } else {
    if (volume < 20) {
      return faVolumeOff
    } else if (20 <= volume && volume < 65) {
      return faVolumeDown
    } else {
      return faVolumeUp
    }
  }
}

/**
 * volume icon size
 * @param isMute
 * @param volume
 */
const VolumeIconSize = (isMute: boolean, volume: number) => {
  if (isMute) {
    return 28
  } else {
    if (volume < 20) {
      return 16
    } else if (20 <= volume && volume < 65) {
      return 24
    } else {
      return 32
    }
  }
}

const ControlsMolecule = ({
  changeCurrentTime,
  mouseDownCurrentTime,
  mouseUpCurrentTime,
  currentTimeMax = 0,
  isPlayYouTube,
  currentTimeValue = 0,
  play,
  pause,
  mute,
  isMute,
  volumeValue,
  changeVolume,
  videoId,
  onTouchEnd,
  onTouchStart,
  onTouchMove,
}: Props) => {
  const isWide = useMedia({ minWidth: "480px" })
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  // const dispatch = useDispatch()
  const [isVolumeHover, setIsVolumeHover] = useState(false)
  const [youTubeTitle, setYouTubeTitle] = useState("")
  const isOpenVolumeControl = (isHover: boolean, isMute: boolean) => {
    if (!isMute) setIsVolumeHover(isHover)
  }

  useEffect(() => {
    const getTitle = async () => {
      if (!videoId) return setYouTubeTitle("")

      const title = await FirebaseStoreUtil.getYouTubeTitle(roomId, videoId)
      setYouTubeTitle(title)
    }

    getTitle()
  }, [videoId, roomId])

  // const openSearchModal = () => {
  //   dispatch(modalSlice.actions.setIsActive(true))
  // }

  return (
    <ControlsContainer>
      <ControlsWrap>
        <ControlItemsWrap>
          <GeneralSpacer horizontal={40} />

          {PlayBtn(isPlayYouTube, play, pause, videoId)}

          <GeneralSpacer horizontal={28} />

          <VolumeContainer
            onMouseOver={() => isOpenVolumeControl(true, isMute)}
            onMouseOut={() => isOpenVolumeControl(false, isMute)}
          >
            <div>
              <ControlsButtonAtom
                size={48}
                iconSize={VolumeIconSize(isMute, volumeValue)}
                onClick={mute}
                icon={MuteBtn(isMute, volumeValue)}
              />
            </div>
            {!isMute && isWide && (
              <ControlsVolumeRangeInputAtom
                isVolumeHover={isVolumeHover}
                onMouseOver={() => isOpenVolumeControl(true, isMute)}
                onMouseOut={() => isOpenVolumeControl(false, isMute)}
                volumeValue={volumeValue}
                changeVolume={changeVolume}
              />
            )}
          </VolumeContainer>
        </ControlItemsWrap>

        <ControlItemsWrap>
          {/* <ControlsButtonAtom
            size={48}
            icon={faSearch}
            onClick={openSearchModal}
          /> */}

          <GeneralText fontSize={GeneralFontSize.SIZE_16}>
            {DataUtil.formatData(currentTimeValue)} /{" "}
            {videoId
              ? DataUtil.formatData(currentTimeMax)
              : DataUtil.formatData(0)}
          </GeneralText>

          <GeneralSpacer horizontal={28} />

          {isWide && (
            <>
              <ControlsYouTubeTitleAtom title={youTubeTitle} />

              <GeneralSpacer horizontal={40} />
            </>
          )}
        </ControlItemsWrap>

        <ControlsCurrentTimeRangeInputAtom
          currentTimeMax={currentTimeMax}
          currentTimeValue={currentTimeValue}
          changeCurrentTime={changeCurrentTime}
          mouseDownCurrentTime={mouseDownCurrentTime}
          mouseUpCurrentTime={mouseUpCurrentTime}
          videoId={videoId}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        />
      </ControlsWrap>
    </ControlsContainer>
  )
}

export default dynamic(() => Promise.resolve(ControlsMolecule), {
  ssr: false,
})
