import firebase from "firebase/app"
import styled, { css } from "styled-components"
import StatusUserAtom from "../atoms/StatusUserAtom"
import useMedia from "use-media"

const StatusUserListContainer = styled.div<{ isWide: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  overflow-x: auto;
  white-space: nowrap;
  width: 36vw;
  ${({ isWide }) =>
    isWide &&
    css`
      width: 32vw;
    `}
  padding: 3px 0;
`

const UserStatusWrap = styled.div`
  margin-right: 8px;
`

export type Props = {
  statusList: {
    state: "online" | "offline"
    photoURL: string
    displayName: string
    lastChanged: firebase.firestore.FieldValue
    userId: string
  }[]
  roomId: string
}

const StatusUserListMolecule = ({ statusList, roomId }: Props) => {
  const isWide = useMedia({ minWidth: "480px" })

  return (
    <StatusUserListContainer isWide={isWide}>
      {statusList.map((status, index) => (
        <UserStatusWrap key={index}>
          <StatusUserAtom
            userId={status.userId}
            state={status.state}
            displayName={status.displayName}
            photoURL={status.photoURL}
            roomId={roomId}
          />
        </UserStatusWrap>
      ))}
    </StatusUserListContainer>
  )
}

export default StatusUserListMolecule
