import { useState, useEffect } from "react"
import styled from "styled-components"
import CardAtoms from "../atoms/CardAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import YouTubeClickActionCardMolecules from "../molecules/YouTubeClickActionCardMolecules"
import useFirebaseAuthentication from "../../hooks/useFirebaseAuthentication"
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import useMedia from "use-media"

const RoomCardWrap = styled.div`
  padding: 8px;
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background: ${GeneralColorStyle.DarkBlue};
  }
`

const JoinedRoomOrganisms = () => {
  const authUser = useFirebaseAuthentication()
  const [joinedRooms, setJoinedRooms] = useState([])
  const isWide = useMedia({ minWidth: "480px" })

  useEffect(() => {
    if (!authUser) return

    const getUser = async () => {
      const user = await FirebaseStoreUtil.users(authUser.uid).get()
      const joinedRoomsList = user.data().joinedRooms
      const roomList = []

      for (let index = 0; index < joinedRoomsList.length; index++) {
        const roomId = joinedRoomsList[index]
        const room = await FirebaseStoreUtil.room(roomId).get()
        const roomData = {
          id: roomId,
          roomName: room.data().roomName,
          videoId: room.data().videoId[0] ? room.data().videoId[0] : "",
        }

        roomList.push(roomData)
      }

      setJoinedRooms(roomList)
    }

    getUser()
  }, [authUser])

  return (
    <>
      <CardAtoms width={isWide ? 440 : 300} height={isWide ? 480 : 280}>
        <GeneralText
          fontSize={isWide ? GeneralFontSize.SIZE_36 : GeneralFontSize.SIZE_24}
          fontColor={GeneralColorStyle.DarkGreen}
          fontWeight={GeneralFontWeight.BOLD}
        >
          参加履歴
        </GeneralText>

        <GeneralSpacer vertical={isWide ? 20 : 12} />

        <RoomCardWrap>
          {joinedRooms.map((joinedRoom, index) => (
            <YouTubeClickActionCardMolecules
              key={index}
              text={joinedRoom.roomName}
              videoId={joinedRoom.videoId}
              icon={faChevronCircleRight}
              roomId={joinedRoom.id}
            />
          ))}
        </RoomCardWrap>
      </CardAtoms>
    </>
  )
}

export default JoinedRoomOrganisms
