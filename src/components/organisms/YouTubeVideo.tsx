import React, { useState } from "react"
import { useRouter } from "next/router"
import YouTube, { Options } from "react-youtube"
import dynamic from "next/dynamic"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import { LiveModel } from "../../models/firebase/LiveModel"
import styled from "styled-components"

let isPlay: boolean | null = null
let intervalCurrentTime

const YouTubeContainer = styled.div`
  position: relative;
  width: 640px;
  height: 390px;
`

const YouTubePlayWrap = styled.div`
  position: absolute;
  z-index: 2;
  width: 640px;
  height: 390px;
  top: 0;
`

const YouTubePlayer = styled(YouTube)`
  position: absolute;
  top: 0;
  z-index: 1;
`

const YouTubeVideo = (props) => {
  /**
   * router
   */
  const router = useRouter()
  const { v, h, i } = router.query
  const videoId = v as string
  const hostId = h as string
  const liveUid = i as string

  /**
   * consts
   */
  const opts: Options = {
    height: "390",
    width: "640",
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

  /**
   * use state
   */
  const [youTubeEvent, setYouTubeEvent] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlayYouTube, setIsPlayYouTube] = useState(false)

  /**
   * get live info
   * @param liveUid
   */
  const getLiveInfo = async (event) => {
    if (!liveUid) return
    const getChangeUser = FirebaseStoreUtil.getChangeUser(liveUid)

    getChangeUser.onSnapshot(
      async (users) => {
        const changeUser = users.data()
        if (isPlay !== null && changeUser.name === hostId) return

        const liveInfo = await FirebaseStoreUtil.getLiveInfo(liveUid).get()
        changeVideoStatus(liveInfo.data(), event)
      },
      (error) => {
        LoggerUtil.debug(`error log: ${error}`)
      }
    )
  }

  /**
   * change video status
   * @param liveInfo
   */
  const changeVideoStatus = async (liveInfo: LiveModel, event) => {
    if (!event) return
    isPlay === null ? setCurrentTime(0) : setCurrentTime(liveInfo.currentTime)
    isPlay = liveInfo.play
    setIsPlayYouTube(liveInfo.play)
    stopIntervalCurrentTime()
    if (!liveInfo.play) return event.target.pauseVideo()

    await event.target.playVideo()
    event.target.seekTo(liveInfo.currentTime)
    setCurrentTime(liveInfo.currentTime)
    startIntervalCurrentTime(event)
  }

  /**
   * ready youTube video
   * @param event
   */
  const _onReady = async (event) => {
    await event.target.mute()
    setYouTubeEvent(event)
    getLiveInfo(event)
  }

  /**
   * set duration time
   */
  const setDurationTime = (duration: number) => setDuration(duration)

  /**
   * change state
   * @param event
   */
  const changeState = (event) => {
    const ytStatus = event.data

    switch (ytStatus) {
      case YouTube.PlayerState.PLAYING:
        setDurationTime(event.target.getDuration())
        break

      default:
        break
    }
  }

  /**
   * play youTube
   */
  const playYouTube = async () => {
    setIsPlayYouTube(true)
    await youTubeEvent.target.playVideo()
    youTubeEvent.target.seekTo(currentTime)
    const nowCurrentTime = youTubeEvent.target.getCurrentTime()
    FirebaseStoreUtil.setLivePlay(liveUid, true, hostId, nowCurrentTime)
    startIntervalCurrentTime(youTubeEvent)
  }

  /**
   * pause youTube
   */
  const pauseYouTube = async () => {
    setIsPlayYouTube(false)
    await youTubeEvent.target.pauseVideo()
    const nowCurrentTime = youTubeEvent.target.getCurrentTime()
    FirebaseStoreUtil.setLivePlay(liveUid, false, hostId, nowCurrentTime)
    setCurrentTime(nowCurrentTime)
    clearInterval(intervalCurrentTime)
  }

  /**
   * get current time
   * @param range
   */
  const getCurrentTime = (range) => {
    setCurrentTime(range.target.value)
    youTubeEvent.target.seekTo(range.target.value)
    const isPlayNow = youTubeEvent.target.getPlayerState()
    FirebaseStoreUtil.setLiveCurrentTime(
      liveUid,
      range.target.value,
      hostId,
      isPlayNow === 1 ? true : false
    )
    startIntervalCurrentTime(youTubeEvent)
  }

  /**
   * click youTube
   */
  const clickYouTube = () => {
    if (isPlayYouTube) return pauseYouTube()
    playYouTube()
  }

  /**
   * stop interval current time
   */
  const stopIntervalCurrentTime = () => clearInterval(intervalCurrentTime)

  /**
   * start interval current time
   * @param event
   */
  const startIntervalCurrentTime = (event) => {
    intervalCurrentTime = setInterval(() => {
      const nowCurrentTime = event.target.getCurrentTime()
      setCurrentTime(nowCurrentTime + 1)
    }, 1000)
  }

  /**
   * change current time
   * @param range
   */
  const changeCurrentTime = (range) => setCurrentTime(range.target.value)

  return (
    <>
      <YouTubeContainer>
        <YouTubePlayWrap onClick={clickYouTube} />
        <YouTubePlayer
          videoId={videoId}
          opts={opts}
          onReady={_onReady}
          onStateChange={changeState}
        />
      </YouTubeContainer>
      <button onClick={playYouTube}>スタート</button>
      <button onClick={pauseYouTube}>ストップ</button>
      {duration > 0 && (
        <input
          id="typeinp"
          type="range"
          min="0"
          max={duration}
          step="1"
          defaultValue="0"
          value={currentTime}
          onChange={(range) => changeCurrentTime(range)}
          onMouseDown={stopIntervalCurrentTime}
          onMouseUp={(range) => getCurrentTime(range)}
        />
      )}
      {duration}
    </>
  )
}

export default dynamic(() => Promise.resolve(YouTubeVideo), {
  ssr: false,
})
