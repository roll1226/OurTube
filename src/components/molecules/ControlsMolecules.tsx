import {
  faPause,
  faPlay,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons"
import React, { ChangeEvent, MouseEvent } from "react"
import styled from "styled-components"
import IconAtoms from "../atoms/IconAtoms"

const CurrentTimeRangeInput = styled.input``

const VolumeRangeInput = styled.input``

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
        <button onClick={pause}>
          <IconAtoms icon={faPause} />
        </button>
      </>
    )
  } else {
    return (
      <>
        <button onClick={play}>
          <IconAtoms icon={faPlay} />
        </button>
      </>
    )
  }
}

/**
 * mute btn
 * @param isMute
 */
const MuteBtn = (isMute: boolean, volume: number) => {
  if (isMute) {
    return <IconAtoms icon={faVolumeMute} />
  } else {
    if (volume < 20) {
      return <IconAtoms icon={faVolumeOff} />
    } else if (20 <= volume && volume < 50) {
      return <IconAtoms icon={faVolumeDown} />
    } else {
      return <IconAtoms icon={faVolumeUp} />
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
  return (
    <>
      <div>
        <button onClick={mute}>{MuteBtn(isMute, volumeValue)}</button>

        {!isMute && (
          <VolumeRangeInput
            type="range"
            min="0"
            max="100"
            step="1"
            value={volumeValue}
            onChange={changeVolume}
          />
        )}

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
        {PlayBtn(isPlayYouTube, play, pause)}
      </div>
    </>
  )
}

export default ControlsMolecules
