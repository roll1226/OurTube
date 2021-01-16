/**
 * Color Util
 */
export default class ColorUtil {
  /**
   * 色にopacityの値を追加した文字列を返す
   *
   * @param color
   * @param opacity
   */
  public static addOpacity(color: string, opacity: number): string {
    const colorHex = color.replace(/#/, "")
    const firstRgb = parseInt(`${colorHex.charAt(0)}${colorHex.charAt(1)}`, 16)
    const secondRgb = parseInt(`${colorHex.charAt(2)}${colorHex.charAt(3)}`, 16)
    const thirdRgb = parseInt(`${colorHex.charAt(4)}${colorHex.charAt(5)}`, 16)
    return `rgba(${firstRgb}, ${secondRgb}, ${thirdRgb}, ${opacity})`
  }
}
