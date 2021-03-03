import { useState, ChangeEvent, MouseEvent, useEffect, TouchEvent } from "react"
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
import { RoomModel } from "../../models/firebase/RoomModel"
import ControlsMolecules from "../../components/molecules/ControlsMolecules"
import CommentAndSendUrlCardOrganisms from "../../components/organisms/CommentAndSendUrlCardOrganisms"
import UrlParamsUtil from "../../utils/url/UrlParamsUtil"
import FetchYouTubeUtil from "../../utils/lib/FetchYouTubeUtil"
import useFirebaseAuthentication from "../../hooks/useFirebaseAuthentication"
import { useDispatch } from "react-redux"
import toastSlice from "../../ducks/toast/slice"
// import SearchYouTubeModalOrganisms from "../../components/organisms/SearchYouTubeModalOrganisms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import modalSlice from "../../ducks/modal/slice"
import FirebaseDatabaseUtil from "../../utils/lib/FirebaseDatabaseUtil"
import YouTubeUnderContentOrganisms from "../../components/organisms/YouTubeUnderContentOrganisms"
import {
  GeneralText,
  GeneralFontSize,
} from "../../styles/typography/GeneralTextStyle"
import useMedia from "use-media"
import { faCaretUp } from "@fortawesome/free-solid-svg-icons"
import ControlsButtonAtoms from "../../components/atoms/controls/ControlsButtonAtoms"
import mobileModalSlice from "../../ducks/mobileModal/slice"

const ShareRoomContainer = styled.div<{ isWide: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ isWide }) =>
    isWide &&
    css`
      flex-direction: row;
      justify-content: space-around;
    `}
  align-items: center;
  position: relative;
`

const ContentWrap = styled.div<{ isWide: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${({ isWide }) =>
    !isWide &&
    css`
      width: 92vw;
      margin: 0 auto;
    `}
`

export type YouTubePlayer = {
  target: any
  data: number
}

let isPlay = null
let intervalCurrentTime

const ShareRoom = () => {
  const router = useRouter()
  const isWide = useMedia({ minWidth: "480px" })
  const { id } = router.query
  const queryPassword = router.query.p as string
  const roomId = id as string

  const authUser = useFirebaseAuthentication()

  const dispatch = useDispatch()

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
  const [signInId, setSignInId] = useState("")
  const [password, setPassword] = useState("")
  const [roomTitle, setRoomTitle] = useState("")

  useEffect(() => {
    dispatch(modalSlice.actions.setLoading(true))
  }, [dispatch])

  useEffect(() => {
    if (!authUser) return
    if (!roomId) return

    const insertRoomInUser = (
      roomId: string,
      uid: string,
      photoURL: string,
      displayName: string
    ) => {
      FirebaseDatabaseUtil.onlineState()
      FirebaseStoreUtil.setRoomSignInState(roomId, uid, photoURL, displayName)
      FirebaseStoreUtil.setJoinFlag(roomId, uid)
    }

    const checkUser = async () => {
      const userData = await FirebaseStoreUtil.getUserData(authUser.uid)

      LoggerUtil.debug(userData.data())

      if (userData.data().joinedRooms.includes(roomId)) {
        insertRoomInUser(
          roomId,
          authUser.uid,
          authUser.photoURL,
          authUser.displayName
        )
      } else {
        const room = await FirebaseStoreUtil.room(roomId).get()

        if (!room.exists) router.replace(OurTubePath.NOT_FOUND)

        if (room.data().privateRoom) {
          if (room.data().hostId === authUser.uid) {
            insertRoomInUser(
              roomId,
              authUser.uid,
              authUser.photoURL,
              authUser.displayName
            )
            await FirebaseStoreUtil.setUserJoinedRoom(roomId, authUser.uid)
          } else {
            if (room.data().password !== queryPassword)
              router.push(
                `${OurTubePath.INSERT_ROOM_PASSWORD.replace("[id]", roomId)}`
              )
          }
        } else {
          insertRoomInUser(
            roomId,
            authUser.uid,
            authUser.photoURL,
            authUser.displayName
          )
          await FirebaseStoreUtil.setUserJoinedRoom(roomId, authUser.uid)
        }
      }
    }

    checkUser()
  }, [authUser, roomId, router, queryPassword])

  /**
   * get current user
   */
  const getCurrentUser = () => {
    const user = FirebaseAuthenticationUtil.getCurrentUser()
    return user ? user.uid : ""
  }

  /**
   * get live info
   * @param event
   */
  const getRoomInfo = async (event) => {
    isPlay = null
    if (!roomId) return

    const userData = getCurrentUser()

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
              FirebaseStoreUtil.setLiveCurrentTime(
                roomId,
                event.target.getCurrentTime() + 2,
                `${flag.doc.data().uid}SetJoinRoomUser`
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
          users.docChanges().forEach(async (user) => {
            if (user.type === "added") {
              const changeUser = user.doc.data()
              const room = await FirebaseStoreUtil.room(roomId).get()

              if (!room.exists) router.replace(OurTubePath.NOT_FOUND)

              const playNow = room.data().playNow
              const getStoreVideoId = room.data().videoId[playNow]
              const uid = getCurrentUser()
              setSignInId(uid)

              if (
                isPlay &&
                changeUser.name.includes("SetJoinRoomUser") &&
                changeUser.name !== `${uid}SetJoinRoomUser`
              )
                return

              if (isPlay && changeUser.name === "setYouTubePlayerBot") {
                if (room.data().play) {
                  event.target.playVideo()
                  setListCnt(room.data().listCnt)
                  return
                }
              }

              LoggerUtil.debug("now play number", room.data().playNow)

              setRoomTitle(room.data().roomName)
              setPassword(room.data().password)
              setListCnt(room.data().listCnt)
              setPlayNow(room.data().playNow)
              setVideoId(getStoreVideoId)

              changeVideoStatus(room.data(), event, getStoreVideoId)
            }
          })
        },
        (error) => {
          LoggerUtil.debug(`error log: ${error}`)
        }
      )

    if (!userData)
      return router.replace(
        `${OurTubePath.CREATE_GUEST.replace("[id]", roomId)}${
          queryPassword ? `?p=${queryPassword}` : ""
        }`
      )
  }

  /**
   * change video status
   * @param room
   */
  const changeVideoStatus = async (
    room: RoomModel,
    event: YouTubePlayer,
    getStoreVideoId: string | undefined
  ) => {
    dispatch(modalSlice.actions.setLoading(false))
    if (!event) return
    isPlay = 1
    setIsPlayYouTube(room.play)
    // stopIntervalCurrentTime()
    LoggerUtil.debug("わたしはかみ", event.target.getPlaylist())
    if (!room.play || !getStoreVideoId) {
      stopIntervalCurrentTime()
      event.target.pauseVideo()
      return
    }

    setIsAnotherUser(true)
    setIsInitThumbnail(false)
    setTimeout(async () => {
      await event.target.playVideo()
      await event.target.seekTo(room.currentTime)
      setCurrentTime(room.currentTime)
    }, 350)
  }

  /**
   * ready youTube video
   * @param event
   */
  const _onReady = async (event) => {
    await event.target.mute()
    setVolume(event.target.getVolume())
    setYouTubeEvent(event)
    getRoomInfo(event)
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
        LoggerUtil.debug("playing youtube")
        stopIntervalCurrentTime()
        startIntervalCurrentTime()

        if (!isAnotherUser) return
        if (!isInitVideo) return

        event.target.seekTo(currentTime)
        setIsInitVide(false)
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
        stopIntervalCurrentTime()
        setCurrentTime(0)
        event.target.seekTo(0)
        event.target.pauseVideo()

        const signInUserState = await FirebaseStoreUtil.getSignInUserState(
          roomId
        )

        if (signInUserState !== signInId) return

        const nextCnt = playNow + 1
        if (listCnt === nextCnt) {
          setVideoId("")
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
    FirebaseStoreUtil.setLivePlay(roomId, true, signInId, currentTime)
  }

  /**
   * pause youTube
   */
  const pauseYouTube = async () => {
    if (!videoId) return

    setIsPlayYouTube(false)
    await youTubeEvent.target.pauseVideo()
    const nowCurrentTime = youTubeEvent.target.getCurrentTime()
    FirebaseStoreUtil.setLivePlay(roomId, false, signInId, nowCurrentTime)
    setCurrentTime(nowCurrentTime)
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
    // youTubeEvent.target.seekTo(rangeCurrentTime)
    // const isPlayNow = youTubeEvent.target.getPlayerState()

    FirebaseStoreUtil.setLiveCurrentTime(
      roomId,
      rangeCurrentTime,
      signInId
      // isPlayNow === 1 ? true : false
    )
    if (!isPlayYouTube) return
    startIntervalCurrentTime()
  }

  const mobileGetCurrentTime = (range: TouchEvent<HTMLInputElement>) => {
    if (!videoId) return

    const rangeEvent = range.target as HTMLInputElement
    const rangeCurrentTime = Number(rangeEvent.value)

    setCurrentTime(rangeCurrentTime)

    FirebaseStoreUtil.setLiveCurrentTime(roomId, rangeCurrentTime, signInId)
    if (!isPlayYouTube) return
    startIntervalCurrentTime()
  }

  const mobileChangeCurrentTime = (range: TouchEvent<HTMLInputElement>) => {
    if (!videoId) return

    const rangeEvent = range.target as HTMLInputElement
    const rangeCurrentTime = Number(rangeEvent.value)

    setCurrentTime(rangeCurrentTime)
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
    stopIntervalCurrentTime()

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
    const resultVideoId = UrlParamsUtil.getVideoId(newVideoId)
    const isVideId = await FirebaseStoreUtil.checkYouTubeVideoId(
      roomId,
      resultVideoId
    )

    if (isVideId) {
      dispatch(toastSlice.actions.setText("すでにある動画です"))
      dispatch(toastSlice.actions.setIsActive(true))
      dispatch(toastSlice.actions.setToastColor("error"))
      setTimeout(() => {
        dispatch(toastSlice.actions.setIsActive(false))
      }, 2000)
      return
    }

    const nextListCnt = listCnt + 1
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
      sendToast("動画を追加しました", "success")
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
      sendToast("動画を追加しました", "success")
    } else {
      LoggerUtil.debug("error")
      sendToast("追加に失敗しました", "error")
    }
  }

  /**
   * send toast
   * @param text
   * @param toastColor
   */
  const sendToast = (text: string, toastColor: "success" | "error") => {
    dispatch(toastSlice.actions.setIsActive(true))
    dispatch(toastSlice.actions.setText(text))
    dispatch(toastSlice.actions.setToastColor(toastColor))
    setTimeout(() => {
      dispatch(toastSlice.actions.setIsActive(false))
    }, 2000)
  }

  return (
    <ShareRoomContainer isWide={isWide}>
      <HeadAtoms
        title={"OurTube | シェアルーム"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={`${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}`}
        top={false}
      />

      <AccountHeadMolecules />

      <ContentWrap isWide={isWide}>
        <GeneralText
          fontSize={isWide ? GeneralFontSize.SIZE_24 : GeneralFontSize.SIZE_20}
        >
          {roomTitle}
        </GeneralText>

        <GeneralSpacer vertical={isWide ? 8 : 4} />

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

        <GeneralSpacer vertical={isWide ? 8 : 4} />

        <YouTubeUnderContentOrganisms roomId={roomId} password={password} />

        {!isWide && (
          <ControlsButtonAtoms
            size={44}
            iconSize={28}
            icon={faCaretUp}
            onClick={() => dispatch(mobileModalSlice.actions.setIsOpen(true))}
          />
        )}
      </ContentWrap>

      <ContentWrap isWide={isWide}>
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
        onTouchEnd={(range) => mobileGetCurrentTime(range)}
        onTouchStart={stopIntervalCurrentTime}
        onTouchMove={(range) => mobileChangeCurrentTime(range)}
      />

      {/* <SearchYouTubeModalOrganisms /> */}
    </ShareRoomContainer>
  )
}

export default ShareRoom
