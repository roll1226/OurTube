import React, { useState, ChangeEvent, MouseEvent } from "react"
import { useRouter } from "next/router"
import YouTube, { Options } from "react-youtube"
import dynamic from "next/dynamic"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import { LiveModel } from "../../models/firebase/LiveModel"
import styled from "styled-components"
import ControlsMolecules from "../molecules/ControlsMolecules"

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

export type YouTubePlayer = {
  target: any
  data: number
}

const YouTubeVideo = (props) => {
  /**
   * router
   */
  const router = useRouter()
  const { h, i } = router.query
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
  const [isAnotherUser, setIsAnotherUser] = useState(false)
  const [isMute, setIsMute] = useState(true)
  const [isInitVideo, setIsInitVide] = useState(true)
  const [videoId, setVideoId] = useState("")
  const [volume, setVolume] = useState(0)

  const [listCnt, setListCnt] = useState(0)
  const [playNow, setPlayNow] = useState(0)

  const [newVideoId, setNewVideoId] = useState("")

  /**
   * get live info
   * @param liveUid
   */
  const getLiveInfo = async (event) => {
    if (!liveUid) return
    const getChangeUser = FirebaseStoreUtil.changeUser(liveUid)

    getChangeUser.onSnapshot(
      async (users) => {
        const changeUser = users.data()
        if (isPlay !== null && changeUser.name === hostId) return

        const liveInfo = await FirebaseStoreUtil.liveInfo(liveUid).get()
        const playNow = liveInfo.data().playNow

        if (isPlay !== null && changeUser.name === "setYouTubePlayerBot")
          return setListCnt(liveInfo.data().listCnt)

        setListCnt(liveInfo.data().listCnt)
        setPlayNow(liveInfo.data().playNow)
        setVideoId(liveInfo.data().videoId[playNow])
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
  const changeVideoStatus = async (
    liveInfo: LiveModel,
    event: YouTubePlayer
  ) => {
    if (!event) return
    isPlay === null ? setCurrentTime(0) : setCurrentTime(liveInfo.currentTime)
    isPlay = liveInfo.play
    setIsPlayYouTube(liveInfo.play)
    stopIntervalCurrentTime()
    if (!liveInfo.play) return event.target.pauseVideo()

    setIsAnotherUser(true)
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
    setVolume(event.target.getVolume())
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
  const changeState = (event: YouTubePlayer) => {
    const ytStatus = event.data

    switch (ytStatus) {
      case YouTube.PlayerState.PLAYING:
        setDurationTime(event.target.getDuration())

        if (!isAnotherUser) return
        if (!isInitVideo) return

        setIsInitVide(false)
        event.target.seekTo(currentTime)
        setIsAnotherUser(false)
        break

      case YouTube.PlayerState.ENDED: {
        const nextCnt = playNow + 1
        setIsPlayYouTube(false)
        setCurrentTime(0)
        event.target.seekTo(0)
        if (listCnt === nextCnt) {
          FirebaseStoreUtil.setLivePlay(liveUid, false, "", 0, nextCnt)
        } else {
          FirebaseStoreUtil.setPlayNow(liveUid, 0, nextCnt)
        }
        break
      }

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
  const getCurrentTime = (
    range: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    const rangeEvent = range.target as HTMLInputElement
    const rangeCurrentTime = Number(rangeEvent.value)

    setCurrentTime(rangeCurrentTime)
    youTubeEvent.target.seekTo(rangeCurrentTime)
    const isPlayNow = youTubeEvent.target.getPlayerState()
    FirebaseStoreUtil.setLiveCurrentTime(
      liveUid,
      rangeCurrentTime,
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
  const stopIntervalCurrentTime = () => {
    clearInterval(intervalCurrentTime)
  }

  /**
   * start interval current time
   * @param event
   */
  const startIntervalCurrentTime = (event: YouTubePlayer) => {
    intervalCurrentTime = setInterval(() => {
      const nowCurrentTime = event.target.getCurrentTime()
      setCurrentTime(nowCurrentTime + 1)
    }, 1000)
  }

  /**
   * change current time
   * @param range
   */
  const changeCurrentTime = (range: ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(range.target.value))
  }

  /**
   * video change mute
   */
  const videoChangeMute = () => {
    if (youTubeEvent.target.isMuted()) {
      youTubeEvent.target.unMute()
      setIsMute(false)
    } else {
      youTubeEvent.target.mute()
      setIsMute(true)
    }
  }

  const getURLParams = (path: string): any => {
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

  /**
   * change volume
   * @param range
   */
  const changeVolume = (range: ChangeEvent<HTMLInputElement>) => {
    const rangeVolume = Number(range.target.value)
    youTubeEvent.target.setVolume(rangeVolume)
    setVolume(rangeVolume)
  }

  const setStoreVideoId = () => {
    const nextListCnt = listCnt + 1
    const resultUrlParams = getURLParams(newVideoId)
    let getNewVideoId: string

    if (resultUrlParams) {
      getNewVideoId = resultUrlParams.v
    } else if (newVideoId.includes("youtu.be/")) {
      getNewVideoId = newVideoId
        .substring(newVideoId.indexOf("youtu.be/"))
        .replace("youtu.be/", "")
    }

    if (listCnt === 0) {
      FirebaseStoreUtil.setVideoId(
        liveUid,
        getNewVideoId,
        nextListCnt,
        "",
        true
      )
      setNewVideoId("")
      return
    }

    if (listCnt === playNow) {
      FirebaseStoreUtil.setVideoId(
        liveUid,
        getNewVideoId,
        nextListCnt,
        "",
        true
      )
      setNewVideoId("")
    } else if (listCnt > playNow) {
      FirebaseStoreUtil.setVideoId(
        liveUid,
        getNewVideoId,
        nextListCnt,
        "setYouTubePlayerBot"
      )
      setNewVideoId("")
    } else {
      LoggerUtil.debug("error")
    }
  }

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

      <ControlsMolecules
        mute={videoChangeMute}
        isMute={isMute}
        isPlayYouTube={isPlayYouTube}
        play={playYouTube}
        pause={pauseYouTube}
        changeCurrentTime={(range) => changeCurrentTime(range)}
        mouseDownCurrentTime={stopIntervalCurrentTime}
        mouseUpCurrentTime={(range) => getCurrentTime(range)}
        currentTimeMax={duration}
        currentTimeValue={currentTime}
        volumeValue={volume}
        changeVolume={(range) => changeVolume(range)}
      />

      <input
        type="text"
        value={newVideoId}
        onChange={(range) => {
          setNewVideoId(range.target.value)
        }}
      />
      <button onClick={setStoreVideoId}>送信</button>
    </>
  )
}

export default dynamic(() => Promise.resolve(YouTubeVideo), {
  ssr: false,
})
