/**
 * Data Util
 */
export default class DataUtil {
  /**
   * 秒数から0:00の形で返す
   *
   * @param num
   */
  public static formatData(num: number) {
    const timeH = Math.floor((num % (24 * 60 * 60)) / (60 * 60))
    const timeM = Math.floor(((num % (24 * 60 * 60)) % (60 * 60)) / 60)
    const timeS = ((num % (24 * 60 * 60)) % (60 * 60)) % 60

    const numString = (time: number) => {
      const roundTime = Math.round(time)
      const stringRoundTime = String(roundTime)

      if (stringRoundTime.length < 2) return `0${stringRoundTime}`
      return stringRoundTime
    }

    return `${timeH !== 0 ? `${numString(timeH)}:` : ""}${numString(
      timeM
    )}:${numString(timeS)}`
  }
}
