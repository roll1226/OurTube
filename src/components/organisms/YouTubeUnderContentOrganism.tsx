import LinkCopyButtonMolecule from "../molecules/LinkCopyButtonMolecule"
import StatusUserListMolecule from "../molecules/StatusUserListMolecule"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import { Base64 } from "js-base64"
import { AuthContext } from "@context/AuthContext"

const YouTubeUnderContentContainer = styled.div`
  display: flex;
  /* flex-direction: row; */
  /* justify-content: flex-start; */
  align-items: center;
`

export type Props = {
  roomId: string
  password: string
}

const YouTubeUnderContentOrganism = ({ roomId, password }: Props) => {
  const [status, setStatus] = useState([])
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser || !roomId) return
    FirebaseStoreUtil.signInState(roomId).onSnapshot((statusList) => {
      if (!statusList.size) return

      const statusSave = []

      statusList.forEach((statusData) => {
        statusSave.push({
          ...statusData.data(),
          userId: statusData.id,
        })
      })
      setStatus(statusSave)
    })
  }, [roomId, currentUser])

  return (
    <YouTubeUnderContentContainer>
      <LinkCopyButtonMolecule
        roomId={roomId}
        password={Base64.encode(password)}
      />

      <GeneralSpacer horizontal={8} />

      <StatusUserListMolecule statusList={status} roomId={roomId} />
    </YouTubeUnderContentContainer>
  )
}

export default YouTubeUnderContentOrganism
