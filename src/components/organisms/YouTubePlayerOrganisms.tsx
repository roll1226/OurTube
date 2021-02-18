import { MouseEvent } from "react"
import YouTube, { Options } from "react-youtube"
import styled from "styled-components"
import ControlsButtonAtoms from "../atoms/controls/ControlsButtonAtoms"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

const YouTubeContainer = styled.div`
  position: relative;
  width: 724px;
  height: 408px;
`

const YouTubePlayWrap = styled.div<{ img: string }>`
  position: absolute;
  z-index: 2;
  width: 724px;
  height: 408px;
  top: 0;
  background: url(${({ img }) => img}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const YouTubePlayer = styled(YouTube)`
  position: absolute;
  top: 0;
  z-index: 1;
`

export type YouTubePlayer = {
  target: any
  data: number
}

export type Props = {
  clickYouTube: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => void
  isInitThumbnail: boolean
  videoId: string
  isPlayYouTube: boolean
  _onReady: (event: YouTubePlayer) => void
  changeState: (event: YouTubePlayer) => void
  isPlay: boolean
  currentTime: number
}

const YouTubePlayerOrganisms = ({
  clickYouTube,
  isInitThumbnail,
  videoId,
  isPlayYouTube,
  _onReady,
  changeState,
  isPlay,
  currentTime,
}: Props) => {
  /**
   * consts
   */
  const opts: Options = {
    width: "724",
    height: "408",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      fs: 0,
      controls: 0,
      disablekb: 1,
      iv_load_policy: 3,
      playsinline: 1,
      modestbranding: 1,
      rel: 0,
    },
  }

  return (
    <>
      <YouTubeContainer>
        <YouTubePlayWrap
          onClick={clickYouTube}
          img={
            isInitThumbnail && videoId && !isPlay && currentTime === 0
              ? `http://img.youtube.com/vi/${videoId}/sddefault.jpg`
              : !videoId
              ? "https://firebasestorage.googleapis.com/v0/b/our-tubes.appspot.com/o/not_video.jpg?alt=media&token=689d2cf6-59e9-4287-a05f-1fb3640dddd8"
              : ""
          }
        >
          {videoId && !isPlayYouTube && (
            <ControlsButtonAtoms size={92} icon={faPlay} />
          )}
        </YouTubePlayWrap>
        <YouTubePlayer
          videoId={videoId}
          opts={opts}
          onReady={_onReady}
          onStateChange={changeState}
        />
      </YouTubeContainer>
    </>
  )
}

export default YouTubePlayerOrganisms
