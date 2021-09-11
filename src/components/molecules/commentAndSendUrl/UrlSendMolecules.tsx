import { ChangeEvent } from "react"
import styled, { css } from "styled-components"
import SendTextMolecules from "./SendTextMolecules"
import YouTubeListMolecules from "./YouTubeListMolecules"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import FirebaseStoreUtil from "../../../utils/lib/FirebaseStoreUtil"
import LoggerUtil from "../../../utils/debugger/LoggerUtil"
import { useRouter } from "next/router"

const UrlSendContainer = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  display: none;
  ${({ isActive }) =>
    isActive &&
    css`
      display: block;
    `};
`

export type Props = {
  youTubeUrl: string
  changeYouTubeUrl: (event: ChangeEvent<HTMLInputElement>) => void
  sendYouTubeUrl: () => void
  isActive: boolean
  nowVideoId: string
  stopIntervalCurrentTime: () => void
  roomId: string
}

let youTubeList = []

const UrlSendMolecules = ({
  youTubeUrl,
  changeYouTubeUrl,
  sendYouTubeUrl,
  isActive = true,
  nowVideoId,
  stopIntervalCurrentTime,
  roomId,
}: Props) => {
  const [youTubesList, setYouTubeList] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!roomId) return
    const unsubscribe = FirebaseStoreUtil.youTubeList(roomId)
      .orderBy("createdAt", "asc")
      .onSnapshot((youTubes) => {
        youTubes.docChanges().forEach((youTube) => {
          if (youTube.type === "added") {
            const youTubeData = youTube.doc.data()

            const init = {
              title: youTubeData.title,
              image: youTubeData.image,
              videoId: youTube.doc.id,
            }
            setYouTubeList((youTubesList) => [...youTubesList, init])
          }
        })
      })
    return () => unsubscribe()
  }, [roomId])

  return (
    <UrlSendContainer isActive={isActive}>
      <YouTubeListMolecules
        youTubes={youTubesList}
        nowVideoId={nowVideoId}
        stopIntervalCurrentTime={stopIntervalCurrentTime}
      />

      <SendTextMolecules
        text={youTubeUrl}
        placeholder={"動画URLを入力"}
        onChange={changeYouTubeUrl}
        onClick={sendYouTubeUrl}
      />
    </UrlSendContainer>
  )
}

export default UrlSendMolecules
