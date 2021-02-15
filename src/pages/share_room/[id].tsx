import { useState, ChangeEvent, MouseEvent, useEffect } from "react"
import YouTube, { Options } from "react-youtube"
import { useRouter } from "next/router"
import styled, { css } from "styled-components"
import HeadAtoms from "../../components/atoms/HeadAtoms"
import { OurTubePath } from "../../consts/PathConsts"
import AccountHeadMolecules from "../../components/molecules/AccountHeadMolecules"
import YouTubePlayerOrganisms from "../../components/organisms/YouTubePlayerOrganisms"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import { LiveModel } from "../../models/firebase/LiveModel"
import ControlsMolecules from "../../components/molecules/ControlsMolecules"
import CommentAndSendUrlCardOrganisms from "../../components/organisms/CommentAndSendUrlCardOrganisms"
import UrlParamsUtil from "../../utils/url/UrlParamsUtil"

const ShareRoomContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const ContentWrap = styled.div<{ position: "left" | "right" }>`
  ${({ position }) =>
    position === "left" &&
    css`
      margin-left: 40px;
    `}
  ${({ position }) =>
    position === "right" &&
    css`
      margin-right: 40px;
    `}
`

export type YouTubePlayer = {
  target: any
  data: number
}

let isPlay: boolean | null = null
let intervalCurrentTime
let initJoinFlag = true
let initJoinFlagCnt = 0

const ShareRoom = () => {
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  /**
   * use state
   */
  const [youTubeEvent, setYouTubeEvent] = useState(null)
  const [isPlayYouTube, setIsPlayYouTube] = useState(false)
  const [isAnotherUser, setIsAnotherUser] = useState(false)
  const [isInitThumbnail, setIsInitThumbnail] = useState(true)
  const [isMute, setIsMute] = useState(true)
  const [isInitVideo, setIsInitVide] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0)
  const [listCnt, setListCnt] = useState(0)
  const [playNow, setPlayNow] = useState(0)
  const [videoId, setVideoId] = useState("")
  const [newVideoId, setNewVideoId] = useState("")

  /**
   * get current user
   */
  const getCurrentUser = () => {
    const user = FirebaseAuthenticationUtil.getCurrentUser()
    return user.uid
  }

  /**
   * get live info
   * @param event
   */
  const getLiveInfo = async (event) => {
    if (!roomId) return

    const getChangeUser = FirebaseStoreUtil.changeUser(roomId)
    const getJoinFlag = FirebaseStoreUtil.joinFlag(roomId)

    getJoinFlag.onSnapshot(
      async (flag) => {
        LoggerUtil.debug(flag)
        if (initJoinFlag) {
          initJoinFlagCnt++
          if (initJoinFlagCnt >= 2) initJoinFlag = false

          return
        }

        let joinFlagYouTubePlayer = false
        if (event.target.getPlayerState() === YouTube.PlayerState.PLAYING)
          joinFlagYouTubePlayer = true

        FirebaseStoreUtil.setLiveCurrentTime(
          roomId,
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
        const liveInfo = await FirebaseStoreUtil.liveInfo(roomId).get()
        const userId = getCurrentUser()
        if (isPlay !== null && changeUser.name === userId) return

        const playNow = liveInfo.data().playNow

        if (isPlay !== null && changeUser.name === "setYouTubePlayerBot")
          return setListCnt(liveInfo.data().listCnt)

        LoggerUtil.debug("おいかさい", liveInfo.data().playNow)
        setListCnt(liveInfo.data().listCnt)
        setPlayNow(liveInfo.data().playNow)
        setVideoId(liveInfo.data().videoId[playNow])
        changeVideoStatus(liveInfo.data(), event)
      },
      (error) => {
        LoggerUtil.debug(`error log: ${error}`)
      }
    )
    FirebaseStoreUtil.setJoinFlag(roomId)
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
    setCurrentTime(liveInfo.currentTime)
    setTimeout(() => {
      event.target.playVideo()
      startIntervalCurrentTime()
    }, 500)
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
  const changeState = async (event: YouTubePlayer) => {
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
          await FirebaseStoreUtil.setLivePlay(roomId, false, "", 0, nextCnt)
        } else {
          await FirebaseStoreUtil.setPlayNow(roomId, 0, nextCnt)
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

    const uid = getCurrentUser()

    FirebaseStoreUtil.setLivePlay(roomId, true, uid, currentTime)
    startIntervalCurrentTime()
  }

  /**
   * pause youTube
   */
  const pauseYouTube = async () => {
    setIsPlayYouTube(false)
    await youTubeEvent.target.pauseVideo()
    const nowCurrentTime = youTubeEvent.target.getCurrentTime()
    const uid = getCurrentUser()
    FirebaseStoreUtil.setLivePlay(roomId, false, uid, nowCurrentTime)
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
    const uid = getCurrentUser()
    FirebaseStoreUtil.setLiveCurrentTime(
      roomId,
      rangeCurrentTime,
      uid,
      isPlayNow === 1 ? true : false
    )
    if (!isPlayYouTube) return
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

  /**
   * set store video id
   */
  const setStoreVideoId = () => {
    const nextListCnt = listCnt + 1
    const resultVideoId = UrlParamsUtil.getVideoId(newVideoId)

    if (listCnt === 0) {
      FirebaseStoreUtil.setVideoId(roomId, resultVideoId, nextListCnt, "", true)
      setNewVideoId("")
      return
    }

    if (listCnt === playNow) {
      FirebaseStoreUtil.setVideoId(roomId, resultVideoId, nextListCnt, "", true)
      setNewVideoId("")
    } else if (listCnt > playNow) {
      FirebaseStoreUtil.setVideoId(
        roomId,
        resultVideoId,
        nextListCnt,
        "setYouTubePlayerBot"
      )
      setNewVideoId("")
    } else {
      LoggerUtil.debug("error")
    }
  }

  return (
    <ShareRoomContainer>
      <HeadAtoms
        title={"OurTube | シェアルーム"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={`${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}`}
        top={false}
      />

      <AccountHeadMolecules />

      <ContentWrap position={"left"}>
        <YouTubePlayerOrganisms
          clickYouTube={clickYouTube}
          isInitThumbnail={isInitThumbnail}
          videoId={videoId}
          isPlayYouTube={isPlayYouTube}
          _onReady={_onReady}
          changeState={changeState}
        />
      </ContentWrap>

      <ContentWrap position={"right"}>
        <CommentAndSendUrlCardOrganisms
          roomId={roomId}
          youTubeUrl={newVideoId}
          changeYouTubeUrl={(event: ChangeEvent<HTMLInputElement>) =>
            setNewVideoId(event.target.value)
          }
          sendYouTubeUrl={setStoreVideoId}
        />
      </ContentWrap>

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
    </ShareRoomContainer>
  )
}

export default ShareRoom
