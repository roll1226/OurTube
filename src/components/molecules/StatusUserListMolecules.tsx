import firebase from "firebase/app"
import styled, { css } from "styled-components"
import StatusUserAtoms from "../atoms/StatusUserAtoms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
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

export type Props = {
  statusList: {
    state: "online" | "offline"
    photoURL: string
    displayName: string
    lastChanged: firebase.firestore.FieldValue
  }[]
}

const StatusUserListMolecules = ({ statusList }: Props) => {
  const isWide = useMedia({ minWidth: "480px" })

  return (
    <StatusUserListContainer isWide={isWide}>
      {statusList.map((status, index) => (
        <>
          <div>
            <StatusUserAtoms
              key={index}
              state={status.state}
              displayName={status.displayName}
              photoURL={status.photoURL}
            />
          </div>
          <GeneralSpacer horizontal={8} />
        </>
      ))}
    </StatusUserListContainer>
  )
}

export default StatusUserListMolecules
