import React, { useState, ChangeEvent, MouseEvent } from "react"
import { useRouter } from "next/router"
import YouTube, { Options } from "react-youtube"
import dynamic from "next/dynamic"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import { LiveModel } from "../../models/firebase/LiveModel"
import styled from "styled-components"
import ControlsMolecules from "../molecules/ControlsMolecules"
import UrlParamsUtil from "../../utils/url/UrlParamsUtil"

let isPlay: boolean | null = null
let intervalCurrentTime
let initJoinFlag = true
let initJoinFlagCnt = 0

const YouTubeContainer = styled.div`
  position: relative;
  width: 640px;
  height: 390px;
`

const YouTubePlayWrap = styled.div<{ img: string }>`
  position: absolute;
  z-index: 2;
  width: 640px;
  height: 390px;
  top: 0;
  background: url(${({ img }) => img}) no-repeat center center;
  background-size: cover;
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

  const [isInitThumbnail, setIsInitThumbnail] = useState(true)

  /**
   * get live info
   * @param liveUid
   */
  const getLiveInfo = async (event) => {
    if (!liveUid) return

    const getChangeUser = FirebaseStoreUtil.changeUser(liveUid)
    const getJoinFlag = FirebaseStoreUtil.joinFlag(liveUid)

    getJoinFlag.onSnapshot(
      async (flag) => {
        if (initJoinFlag) {
          initJoinFlagCnt++
          if (initJoinFlagCnt >= 2) initJoinFlag = false

          return
        }

        let joinFlagYouTubePlayer = false
        if (event.target.getPlayerState() === YouTube.PlayerState.PLAYING)
          joinFlagYouTubePlayer = true

        FirebaseStoreUtil.setLiveCurrentTime(
          liveUid,
          event.target.getCurrentTime(),
          "",
          joinFlagYouTubePlayer
        )
      },
      (error) => {
        LoggerUtil.debug(`error log: ${error}`)
      }
    )

    getChangeUser.onSnapshot(
      async (users) => {
        const changeUser = users.data()
        if (isPlay !== null && changeUser.name === hostId) return
        // if (isPlay !== null && changeUser.name === "joinLiveYouTubeBot") return

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
    FirebaseStoreUtil.setJoinFlag(liveUid)
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
    event.target.seekTo(liveInfo.currentTime)
    if (!liveInfo.play) return event.target.pauseVideo()

    setIsAnotherUser(true)
    setIsInitThumbnail(false)
    await event.target.playVideo()
    setCurrentTime(liveInfo.currentTime)
    startIntervalCurrentTime()
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
        LoggerUtil.debug(isInitVideo)

        if (!isAnotherUser) return
        if (!isInitVideo) return

        setIsInitVide(false)
        event.target.seekTo(currentTime)
        setIsAnotherUser(false)
        break

      case YouTube.PlayerState.ENDED: {
        const nextCnt = playNow + 1
        setIsInitThumbnail(true)
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
    setIsInitThumbnail(false)
    await youTubeEvent.target.playVideo()
    await youTubeEvent.target.seekTo(currentTime)

    FirebaseStoreUtil.setLivePlay(liveUid, true, hostId, currentTime)
    startIntervalCurrentTime()
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
    startIntervalCurrentTime()
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
  const startIntervalCurrentTime = () => {
    intervalCurrentTime = setInterval(() => {
      setCurrentTime((currentTime) => currentTime + 1)
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
    const resultUrlParams = UrlParamsUtil.getURLParams(newVideoId)
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
        <YouTubePlayWrap
          onClick={clickYouTube}
          img={
            isInitThumbnail
              ? `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              : ""
          }
        />
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
