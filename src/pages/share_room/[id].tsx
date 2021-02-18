import { useState, ChangeEvent, MouseEvent, useEffect } from "react"
import YouTube from "react-youtube"
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
import FetchYouTubeUtil from "../../utils/lib/FetchYouTubeUtil"

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
// const youTubeVideoNextNum = 0
// const youTubeVideoListNum = 0

let testBoolean = false

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

    getJoinFlag
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot(
        async (flags) => {
          flags.docChanges().forEach(async (flag) => {
            if (isPlay === null) return

            if (flag.type === "added") {
              let joinFlagYouTubePlayer = false
              if (event.target.getPlayerState() === YouTube.PlayerState.PLAYING)
                joinFlagYouTubePlayer = true

              FirebaseStoreUtil.setLiveCurrentTime(
                roomId,
                event.target.getCurrentTime(),
                `${flag.doc.data().uid}SetJoinRoomUser`,
                joinFlagYouTubePlayer
              )
            }
          })
        },
        (error) => {
          LoggerUtil.debug(`error log: ${error}`)
        }
      )

    getChangeUser
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot(
        async (users) => {
          // if (!users.metadata.hasPendingWrites) return
          if (testBoolean) return (testBoolean = false)
          testBoolean = true
          users.docChanges().forEach(async (user) => {
            if (user.type === "added") {
              stopIntervalCurrentTime()
              const changeUser = user.doc.data()
              const liveInfo = await FirebaseStoreUtil.liveInfo(roomId).get()
              const playNow = liveInfo.data().playNow
              const getStoreVideoId = liveInfo.data().videoId[playNow]
              const uid = getCurrentUser()

              if (
                isPlay !== null &&
                changeUser.name.includes("SetJoinRoomUser") &&
                changeUser.name !== `${uid}SetJoinRoomUser`
              )
                return startIntervalCurrentTime()

              if (
                isPlay !== null &&
                changeUser.name === "setYouTubePlayerBot"
              ) {
                if (isPlay && liveInfo.data().play) {
                  // startIntervalCurrentTime()
                  event.target.playVideo()
                  setListCnt(liveInfo.data().listCnt)
                  return
                }
              }

              // if (
              //   isPlay !== null &&
              //   changeUser.name === "selectYouTubeVideoBot"
              // ) {
              //   // stopIntervalCurrentTime()
              //   setListCnt(liveInfo.data().listCnt)
              //   setCurrentTime(liveInfo.data().currentTime)
              //   setIsPlayYouTube(liveInfo.data().play)
              //   setPlayNow(liveInfo.data().playNow)
              //   setVideoId(getStoreVideoId)
              //   setTimeout(() => {
              //     // startIntervalCurrentTime()
              //     event.target.playVideo()
              //   }, 300)
              //   return
              // }

              LoggerUtil.debug("おいかさい", liveInfo.data().playNow)

              setListCnt(liveInfo.data().listCnt)
              setPlayNow(liveInfo.data().playNow)
              setVideoId(getStoreVideoId)

              changeVideoStatus(liveInfo.data(), event, getStoreVideoId)
            }
          })
          testBoolean = false
        },
        (error) => {
          LoggerUtil.debug(`error log: ${error}`)
        }
      )
    const uid = getCurrentUser()
    FirebaseStoreUtil.setJoinFlag(roomId, uid)
  }

  /**
   * change video status
   * @param liveInfo
   */
  const changeVideoStatus = async (
    liveInfo: LiveModel,
    event: YouTubePlayer,
    getStoreVideoId: string | undefined
  ) => {
    if (!event) return
    isPlay === null ? setCurrentTime(0) : setCurrentTime(liveInfo.currentTime)
    isPlay = liveInfo.play
    setIsPlayYouTube(liveInfo.play)
    // stopIntervalCurrentTime()
    LoggerUtil.debug("わたしはかみ", event.target.getPlaylist())
    if (!liveInfo.play || !getStoreVideoId) return event.target.pauseVideo()

    setIsAnotherUser(true)
    setIsInitThumbnail(false)
    setCurrentTime(liveInfo.currentTime)
    setTimeout(() => {
      event.target.seekTo(liveInfo.currentTime)
      event.target.playVideo()
      // startIntervalCurrentTime()
    }, 300)
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
        LoggerUtil.debug("hobdhobho")
        stopIntervalCurrentTime()
        startIntervalCurrentTime()

        if (!isAnotherUser) return
        if (!isInitVideo) return

        setIsInitVide(false)
        event.target.seekTo(currentTime)
        setIsAnotherUser(false)
        break

      case YouTube.PlayerState.PAUSED:
        stopIntervalCurrentTime()
        break

      case YouTube.PlayerState.BUFFERING:
        stopIntervalCurrentTime()
        break

      case YouTube.PlayerState.ENDED: {
        setIsInitThumbnail(true)
        setIsPlayYouTube(false)
        setCurrentTime(0)
        event.target.seekTo(0)

        if (testBoolean) return

        const nextCnt = playNow + 1
        if (listCnt === nextCnt) {
          await FirebaseStoreUtil.setLivePlay(roomId, false, "", 0, nextCnt)
        } else if (listCnt > nextCnt) {
          await FirebaseStoreUtil.setPlayNow(roomId, 0, nextCnt)
        } else if (listCnt < nextCnt) {
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
    if (!videoId) return

    setIsPlayYouTube(true)
    setIsInitThumbnail(false)
    // await youTubeEvent.target.playVideo()
    // await youTubeEvent.target.seekTo(currentTime)

    const uid = getCurrentUser()

    FirebaseStoreUtil.setLivePlay(roomId, true, uid, currentTime)
    // startIntervalCurrentTime()
  }

  /**
   * pause youTube
   */
  const pauseYouTube = async () => {
    if (!videoId) return

    setIsPlayYouTube(false)
    await youTubeEvent.target.pauseVideo()
    const nowCurrentTime = youTubeEvent.target.getCurrentTime()
    const uid = getCurrentUser()
    FirebaseStoreUtil.setLivePlay(roomId, false, uid, nowCurrentTime)
    setCurrentTime(nowCurrentTime)
    // stopIntervalCurrentTime()
  }

  /**
   * get current time
   * @param range
   */
  const getCurrentTime = (
    range: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    if (!videoId) return

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
    if (!videoId) return

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
    if (!videoId) return

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
  const setStoreVideoId = async () => {
    const nextListCnt = listCnt + 1
    const resultVideoId = UrlParamsUtil.getVideoId(newVideoId)
    LoggerUtil.debug(nextListCnt, listCnt)

    const youTubeData = await FetchYouTubeUtil.fetchVideo(resultVideoId)

    if (youTubeData.status === 400) return

    if (listCnt === 0) {
      FirebaseStoreUtil.setVideoId(
        roomId,
        resultVideoId,
        nextListCnt,
        "",
        youTubeData.title,
        youTubeData.image,
        true
      )
      setNewVideoId("")
      return
    }

    if (listCnt === playNow) {
      FirebaseStoreUtil.setVideoId(
        roomId,
        resultVideoId,
        nextListCnt,
        "",
        youTubeData.title,
        youTubeData.image,
        true
      )
      setNewVideoId("")
    } else if (listCnt > playNow) {
      FirebaseStoreUtil.setVideoId(
        roomId,
        resultVideoId,
        nextListCnt,
        "setYouTubePlayerBot",
        youTubeData.title,
        youTubeData.image
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
          isPlay={isPlayYouTube}
          currentTime={currentTime}
        />
      </ContentWrap>

      <ContentWrap position={"right"}>
        <CommentAndSendUrlCardOrganisms
          youTubeUrl={newVideoId}
          changeYouTubeUrl={(event: ChangeEvent<HTMLInputElement>) =>
            setNewVideoId(event.target.value)
          }
          sendYouTubeUrl={setStoreVideoId}
          nowVideoId={videoId}
          stopIntervalCurrentTime={stopIntervalCurrentTime}
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
        videoId={videoId}
      />
    </ShareRoomContainer>
  )
}

export default ShareRoom
