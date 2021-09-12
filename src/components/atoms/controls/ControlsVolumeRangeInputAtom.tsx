import { ChangeEvent } from "react"
import styled, { css } from "styled-components"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import { ControlHover } from "../../../styles/shadow/GeneralShadowStyle"

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

export type Props = {
  isVolumeHover: boolean
  onMouseOver: () => void
  onMouseOut: () => void
  volumeValue: number
  changeVolume: (range: ChangeEvent<HTMLInputElement>) => void
}

const ControlsVolumeRangeInputAtom = ({
  isVolumeHover,
  onMouseOver,
  onMouseOut,
  volumeValue,
  changeVolume,
}: Props) => {
  return (
    <VolumeRangeInputWrap
      isHover={isVolumeHover}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
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
  )
}

export default ControlsVolumeRangeInputAtom
