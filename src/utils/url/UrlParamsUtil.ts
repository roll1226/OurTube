/**
 * Url Params Util
 */
export default class UrlParamsUtil {
  /**
   * 動画URLからParamを取得(ない場合はfalse)
   *
   * @param path
   */
  public static getURLParams(path: string): any {
    if (!path) return false

    const param = path.match(/\?([^?]*)$/)

    if (!param || param[1] === "") return false

    const tmpParams = param[1].split("&")
    let keyValue = []
    const params = {}

    for (let i = 0, len = tmpParams.length; i < len; i++) {
      keyValue = tmpParams[i].split("=")
      params[keyValue[0]] = keyValue[1]
    }

    return params
  }

  public static getVideoId(url: string) {
    const resultUrlParams = UrlParamsUtil.getURLParams(url)

    if (resultUrlParams) return resultUrlParams.v
    else if (url.includes("youtu.be/"))
      return url.substring(url.indexOf("youtu.be/")).replace("youtu.be/", "")
  }
}
