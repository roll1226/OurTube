import { env } from "../../env/DotEnv"

class FetchYouTubeUtil {
  public static async fetchVideo(videoId: string) {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,status&id=${videoId}&key=${env.getYouTubeApi()}`
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
}

export default FetchYouTubeUtil
