import LinkCopyButtonMolecules from "../molecules/LinkCopyButtonMolecules"
import StatusUserListMolecules from "../molecules/StatusUserListMolecules"
import styled from "styled-components"
import { useEffect, useState } from "react"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import { Base64 } from "js-base64"

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

const YouTubeUnderContentOrganisms = ({ roomId, password }: Props) => {
  const [status, setStatus] = useState([])

  useEffect(() => {
    FirebaseStoreUtil.signInState(roomId).onSnapshot((statusList) => {
      if (!statusList.size) return

      const statusSave = []

      statusList.forEach((statusData) => {
        statusSave.push({
          ...statusData.data(),
        })
      })
      setStatus(statusSave)
    })
  }, [roomId])

  return (
    <YouTubeUnderContentContainer>
      <LinkCopyButtonMolecules
        roomId={roomId}
        password={Base64.encode(password)}
      />

      <GeneralSpacer horizontal={8} />

      <StatusUserListMolecules statusList={status} />
    </YouTubeUnderContentContainer>
  )
}

export default YouTubeUnderContentOrganisms
