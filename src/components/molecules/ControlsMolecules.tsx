import {
  faPause,
  faPlay,
  faSearch,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons"
import React, { ChangeEvent, MouseEvent } from "react"
import styled, { css, keyframes } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import {
  CardShadow,
  HoverItem,
  ControlHover,
  InsetShadow,
} from "../../styles/shadow/GeneralShadowStyle"
import ControlsButtonAtoms from "../atoms/controls/ControlsButtonAtoms"
import { useState } from "react"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import { GeneralText } from "../../styles/typography/GeneralTextStyle"

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

const CurrentTimeTimeColor = styled.div<{
  currentTime: number
  currentTimeMax: number
}>`
  position: absolute;
  left: 0;
  top: -3px;
  width: ${(props) => (props.currentTime / props.currentTimeMax) * 100}%;
  height: 6px;
  background: ${GeneralColorStyle.ThinBlue};
`

const CurrentTimeRangeInput = styled.input`
  margin: 0;
  position: absolute;
  left: 0;
  top: -3px;
  -webkit-appearance: none; // 🚩これ無しだとスタイルがほぼ全く反映されないので注意
  appearance: none;
  cursor: pointer; // カーソルを分かりやすく
  outline: none; // スライダーのアウトラインは目障りになるので消す
  background: transparent; // バーの背景色
  width: 100%;
  height: 6px; // バーの高さ
  border-radius: 0; // バーの端の丸み

  // -webkit-向けのつまみ
  &::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none; // 🚩デフォルトのつまみのスタイルを解除
    background-color: ${GeneralColorStyle.ThinBlue};
    background-size: cover;
    width: 16px; // 幅
    height: 16px; // 高さ
    border-radius: 50%; // 円形に
    box-shadow: ${ControlHover}; // 影
  }

  // -moz-向けのつまみ
  &::-moz-range-thumb {
    background-size: cover;
    background-color: ${GeneralColorStyle.ThinBlue};
    width: 16px; // 幅
    height: 16px; // 高さ
    border-radius: 50%; // 円形に
    box-shadow: ${ControlHover}; // 影
    border: none; // デフォルトの線を消す
  }

  // Firefoxで点線が周りに表示されてしまう問題の解消
  &::-moz-focus-outer {
    border: 0;
  }

  // つまみをドラッグしているときのスタイル
  &:active::-webkit-slider-thumb {
    box-shadow: ${HoverItem};
  }
`

const VolumeContainer = styled.div`
  position: relative;
`

const VolumeRangeInputWrap = styled.div<{ isHover: boolean }>`
  padding: 0px;
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  transform-origin: top left;
  position: absolute;
  overflow: hidden;
  z-index: 5;
  bottom: -48px;
  left: 0;
  transform: rotate(-90deg);
  transition: all 150ms cubic-bezier(0.14, 0.67, 0.43, 0.99);

  ${({ isHover }) =>
    isHover &&
    css`
      width: 120px;
      padding: 0px 16px;
      padding-left: 52px;
    `}
  background: ${GeneralColorStyle.ThinBlue};
`

const VolumeRangeInput = styled.input`
  width: 100px;

  -webkit-appearance: none; // 🚩これ無しだとスタイルがほぼ全く反映されないので注意
  appearance: none;
  cursor: pointer; // カーソルを分かりやすく
  outline: none; // スライダーのアウトラインは目障りになるので消す
  background: ${GeneralColorStyle.White}; // バーの背景色
  height: 8px; // バーの高さ
  border-radius: 1000px; // バーの端の丸み

  // -webkit-向けのつまみ
  &::-webkit-slider-thumb {
    -webkit-appearance: none; // 🚩デフォルトのつまみのスタイルを解除
    background: ${GeneralColorStyle.ThinBlue}; // 背景色
    border: solid 2px ${GeneralColorStyle.White};
    width: 20px; // 幅
    height: 20px; // 高さ
    border-radius: 50%; // 円形に
    box-shadow: ${ControlHover}; // 影
  }

  // -moz-向けのつまみ
  &::-moz-range-thumb {
    background: ${GeneralColorStyle.ThinBlue}; // 背景色
    border: solid 2px ${GeneralColorStyle.White};
    width: 20px; // 幅
    height: 20px; // 高さ
    border-radius: 50%; // 円形に
    box-shadow: ${ControlHover}; // 影
    border: none; // デフォルトの線を消す
  }

  // Firefoxで点線が周りに表示されてしまう問題の解消
  &::-moz-focus-outer {
    border: 0;
  }

  // つまみをドラッグしているときのスタイル
  &:active::-webkit-slider-thumb {
    background: ${GeneralColorStyle.DarkBlue};
  }
`

const ControlItemsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const YouTubeTitleContainer = styled.div`
  width: 400px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: ${InsetShadow};
  overflow: hidden;
`

const YouTUbeTitleMoveWrap = styled.div`
  position: relative;
  left: 100%;
  animation: 10s linear 2s infinite ${keyframes`
    from { left: 100%; }
    to { left: -100%;) }
  `};
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
}

/**
 * play btn
 * @param isPlay
 * @param play
 * @param pause
 */
const PlayBtn = (isPlay: boolean, play: () => void, pause: () => void) => {
  if (isPlay) {
    return (
      <>
        <ControlsButtonAtoms size={48} icon={faPause} onClick={pause} />
      </>
    )
  } else {
    return (
      <>
        <ControlsButtonAtoms size={48} icon={faPlay} onClick={play} />
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
      return 14
    } else if (20 <= volume && volume < 65) {
      return 20
    } else {
      return 28
    }
  }
}

const ControlsMolecules = ({
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
}: Props) => {
  const [isVolumeHover, setIsVolumeHover] = useState(false)
  const isOpenVolumeControl = (isHover: boolean, isMute: boolean) => {
    if (!isMute) setIsVolumeHover(isHover)
  }

  return (
    <ControlsContainer>
      <ControlsWrap>
        <ControlItemsWrap>
          <GeneralSpacer horizontal={40} />

          {PlayBtn(isPlayYouTube, play, pause)}

          <GeneralSpacer horizontal={28} />

          <VolumeContainer
            onMouseOver={() => isOpenVolumeControl(true, isMute)}
            onMouseOut={() => isOpenVolumeControl(false, isMute)}
          >
            <div>
              <ControlsButtonAtoms
                size={48}
                iconSize={VolumeIconSize(isMute, volumeValue)}
                onClick={mute}
                icon={MuteBtn(isMute, volumeValue)}
              />
            </div>
            {!isMute && (
              <VolumeRangeInputWrap
                isHover={isVolumeHover}
                onMouseOver={() => isOpenVolumeControl(true, isMute)}
                onMouseOut={() => isOpenVolumeControl(false, isMute)}
              >
                <VolumeRangeInput
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={volumeValue}
                  onChange={changeVolume}
                />
              </VolumeRangeInputWrap>
            )}
          </VolumeContainer>
        </ControlItemsWrap>

        <ControlItemsWrap>
          <ControlsButtonAtoms size={48} icon={faSearch} />

          <GeneralSpacer horizontal={28} />

          <YouTubeTitleContainer>
            <YouTUbeTitleMoveWrap>
              <GeneralText fontSize={24} fontColor={GeneralColorStyle.Black}>
                ホゲホゲ
              </GeneralText>
            </YouTUbeTitleMoveWrap>
          </YouTubeTitleContainer>

          <GeneralSpacer horizontal={40} />
        </ControlItemsWrap>

        <CurrentTimeRangeInput
          type="range"
          min="0"
          max={currentTimeMax}
          step="1"
          value={currentTimeValue}
          onChange={changeCurrentTime}
          onMouseDown={mouseDownCurrentTime}
          onMouseUp={mouseUpCurrentTime}
        />
        <CurrentTimeTimeColor
          currentTime={currentTimeValue}
          currentTimeMax={currentTimeMax}
        />
      </ControlsWrap>
    </ControlsContainer>
  )
}

export default ControlsMolecules
