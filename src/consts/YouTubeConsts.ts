export enum YouTubeNotUserChangeBot {
  SET_PLAYER_BOT = "setYouTubePlayerBot",
}

export enum YouTubeThumbnail {
  THUMBNAIL_URL = "youtu.be/",
}

export enum ThumbnailSize {
  MAX,
  MQ,
}

export function getYouTubeThumbnailUrl(id: string, size: ThumbnailSize) {
  if (id === undefined) return ""

  switch (size) {
    case ThumbnailSize.MQ:
      return `http://img.youtube.com/vi/${id}/mqdefault.jpg`

    case ThumbnailSize.MAX:
      return `http://img.youtube.com/vi/${id}/maxresdefault.jpg`
  }
}
