import firebase from "firebase/app"
import styled from "styled-components"
import StatusUserAtoms from "../atoms/StatusUserAtoms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"

const StatusUserListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  overflow-x: auto;
  white-space: nowrap;
  width: 500px;
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
  return (
    <StatusUserListContainer>
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
