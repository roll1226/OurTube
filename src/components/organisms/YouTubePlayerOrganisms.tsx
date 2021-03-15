import { MouseEvent } from "react"
import YouTube, { Options } from "react-youtube"
import styled, { css } from "styled-components"
import ControlsButtonAtoms from "../atoms/controls/ControlsButtonAtoms"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import useMedia from "use-media"

const YouTubeContainer = styled.div<{ isWide: boolean }>`
  position: relative;
  width: 92vw;
  height: calc(92vw * 0.6);

  ${({ isWide }) =>
    isWide &&
    css`
      width: 50vw;
      height: calc(50vw * 0.6);
    `}

  iframe {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`

const YouTubePlayWrap = styled.div<{ img: string; videoId: string }>`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
  background: url(${({ img }) => img}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ videoId }) =>
    videoId &&
    css`
      cursor: pointer;
    `}
`

const YouTubePlayer = styled(YouTube)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
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
  const isWide = useMedia({ minWidth: "480px" })

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
      <YouTubeContainer isWide={isWide}>
        <YouTubePlayWrap
          onClick={clickYouTube}
          img={
            isInitThumbnail && videoId && !isPlay && currentTime === 0
              ? `http://img.youtube.com/vi/${videoId}/sddefault.jpg`
              : !videoId
              ? "/img/not_video.jpeg"
              : ""
          }
          videoId={videoId}
        >
          {videoId && !isPlayYouTube && (
            <ControlsButtonAtoms size={isWide ? 92 : 76} icon={faPlay} />
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
