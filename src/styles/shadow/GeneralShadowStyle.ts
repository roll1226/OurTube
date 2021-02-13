import GeneralColorStyle from "../colors/GeneralColorStyle"
import ColorUtil from "../../utils/color/ColorUtil"

export const CardShadow = `0px 0px 8px ${ColorUtil.addOpacity(
  GeneralColorStyle.Black,
  0.25
)}`

export const ItemShadow = `0px 0px 4px ${ColorUtil.addOpacity(
  GeneralColorStyle.Black,
  0.25
)}`

export const InsetShadow = `0px 0px 4px ${ColorUtil.addOpacity(
  GeneralColorStyle.Black,
  0.25
)} inset`

export const HoverItem = `0px 0px 8px ${ColorUtil.addOpacity(
  GeneralColorStyle.Black,
  0.4
)}`
