import { ChangeEvent, MouseEvent, TouchEvent } from "react"
import styled, { css } from "styled-components"
import {
  HoverItem,
  ControlHover,
} from "../../../styles/shadow/GeneralShadowStyle"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"

const CurrentTimeRangeInput = styled.input<{ isActive: boolean }>`
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

  ${({ isActive }) =>
    isActive &&
    css`
      cursor: default;
    `}
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

export type Props = {
  currentTimeMax: number
  currentTimeValue: number
  changeCurrentTime: (range: ChangeEvent<HTMLInputElement>) => void
  mouseDownCurrentTime: () => void
  mouseUpCurrentTime: (
    range: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => void
  videoId: string
  onTouchEnd: (range: TouchEvent<HTMLInputElement>) => void
  onTouchStart: () => void
  onTouchMove: (event: TouchEvent<HTMLInputElement>) => void
}

const ControlsCurrentTimeRangeInputAtoms = ({
  currentTimeMax = 0,
  currentTimeValue = 0,
  changeCurrentTime,
  mouseDownCurrentTime,
  mouseUpCurrentTime,
  videoId,
  onTouchEnd,
  onTouchStart,
  onTouchMove,
}: Props) => {
  return (
    <>
      <CurrentTimeRangeInput
        type="range"
        min="0"
        max={currentTimeMax}
        step="0.0001"
        value={currentTimeValue}
        onChange={changeCurrentTime}
        onMouseDown={mouseDownCurrentTime}
        onMouseUp={mouseUpCurrentTime}
        isActive={videoId ? false : true}
        disabled={videoId ? false : true}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      />
      <CurrentTimeTimeColor
        currentTime={currentTimeValue}
        currentTimeMax={currentTimeMax}
      />
    </>
  )
}

export default ControlsCurrentTimeRangeInputAtoms
