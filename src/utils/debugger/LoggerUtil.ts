/**
 * console.logを使う場合はこちらを利用する
 *
 */
export default class LoggerUtil {
  public static debug(message?: any, ...optionalParams: any[]) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log(message, optionalParams)
    }
  }
}
