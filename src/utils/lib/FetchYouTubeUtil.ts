import axios from "axios"
import { env } from "../../env/DotEnv"
import LoggerUtil from "../debugger/LoggerUtil"

class FetchYouTubeUtil {
  /**
   * fetch video
   * @param videoId
   */
  public static async fetchVideo(videoId: string) {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${env.getYouTubeApi()}`
    )
    const json = await res.json()

    if (json.items[0]) {
      return {
        title: json.items[0].snippet.title,
        image: json.items[0].snippet.thumbnails.default.url,
        status: 200,
      }
    } else {
      return {
        title: "",
        image: "",
        status: 400,
      }
    }
  }

  public static async nextFetchVideo(videoId: string) {
    try {
      const res = await axios.get(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
      )
      const data = res.data
      if (data.error) {
        throw new TypeError("動画が見つかりませんでした")
      }
      return {
        title: data.title,
        image: data.thumbnail_url,
        status: 200,
      }
    } catch (error) {
      return {
        title: "",
        image: "",
        status: 400,
      }
    }
  }

  public static async searchYouTubeVide(keyword: string) {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&videoDimension=2d&maxResults=20&regionCode=jp&q=${keyword}&key=${env.getYouTubeApi()}`
    )
    const json = await res.json()

    const resultVideos = [] as {
      url: string
      id: string
      title: string
      thumbnail: string
    }[]

    LoggerUtil.debug(json.items)
    json.items.forEach((item) => {
      const video = {
        url: `https://youtu.be/${item.id.videoId}`,
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      }
      resultVideos.push(video)
    })
    LoggerUtil.debug(resultVideos)
    return resultVideos
  }
}

export default FetchYouTubeUtil
