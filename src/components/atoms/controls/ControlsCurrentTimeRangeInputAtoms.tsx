import { ChangeEvent, MouseEvent, TouchEvent } from "react"
import styled, { css } from "styled-components"
import {
  HoverItem,
  ControlHover,
} from "../../../styles/shadow/GeneralShadowStyle"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import useMedia from "use-media"

const CurrentTimeRangeInput = styled.input<{
  isActive: boolean
  isWide: boolean
}>`
  margin: 0;
  position: absolute;
  left: 0;
  top: -3px;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  outline: none;
  background: transparent;
  width: 100%;
  height: 6px;
  border-radius: 0;

  // -webkit-向けのつまみ
  &::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    background-color: ${GeneralColorStyle.ThinBlue};
    background-size: cover;
    width: 24px;
    height: 24px;
    ${({ isWide }) =>
      isWide &&
      css`
        width: 16px;
        height: 16px;
      `}
    border-radius: 50%;
    box-shadow: ${ControlHover};
    border: none;
  }

  // -moz-向けのつまみ
  &::-moz-range-thumb {
    background-size: cover;
    background-color: ${GeneralColorStyle.ThinBlue};
    width: 24px;
    height: 24px;
    ${({ isWide }) =>
      isWide &&
      css`
        width: 16px;
        height: 16px;
      `}
    border-radius: 50%;
    box-shadow: ${ControlHover};
    border: none;
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
  isWide: boolean
}>`
  position: absolute;
  left: 0;
  top: -4px;
  width: ${(props) => (props.currentTime / props.currentTimeMax) * 100}%;
  height: 8px;
  background: ${GeneralColorStyle.ThinBlue};
  ${({ isWide }) =>
    isWide &&
    css`
      top: -3px;
      height: 6px;
    `}
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
  const isWide = useMedia({ minWidth: "480px" })

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
        isWide={isWide}
      />
      <CurrentTimeTimeColor
        currentTime={currentTimeValue}
        currentTimeMax={currentTimeMax}
        isWide={isWide}
      />
    </>
  )
}

export default ControlsCurrentTimeRangeInputAtoms
