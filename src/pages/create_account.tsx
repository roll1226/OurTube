import { useState, ChangeEvent } from "react"
import HeadAtoms from "../components/atoms/HeadAtoms"
import InsertAccountNameMolecules from "../components/molecules/InsertAccountNameMolecules"
import styled, { keyframes } from "styled-components"
import { DefaultAnimation } from "../styles/animation/GeneralAnimationStyle"
import FirebaseStoreUtil from "../utils/lib/FirebaseStoreUtil"
import { useRouter } from "next/router"
import { OurTubePath } from "../consts/PathConsts"
import { useDispatch } from "react-redux"
import modalSlice from "../ducks/modal/slice"

const CreateAccountContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const InsertAccountNameCard = styled.div`
  transform: scale(0);
  animation: 350ms ${DefaultAnimation} 0s forwards ${keyframes`
    from { transform: scale(0) }
    to { transform: scale(1) }
  `};
`

const CreateAccount = () => {
  const [userName, setUserName] = useState("")
  const router = useRouter()
  const dispatch = useDispatch()

  const insetAccountName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const saveUserName = async () => {
    dispatch(modalSlice.actions.setLoading(true))
    await FirebaseStoreUtil.createUserName(userName)
    dispatch(modalSlice.actions.setLoading(false))
    router.replace(OurTubePath.CREATE_ROOM)
  }

  return (
    <CreateAccountContainer>
      <HeadAtoms
        title={"OurTube | アカウント作成"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={"/"}
        top={false}
      />
      <InsertAccountNameCard>
        <InsertAccountNameMolecules
          userName={userName}
          insetAccountName={insetAccountName}
          saveUserName={saveUserName}
        />
      </InsertAccountNameCard>
    </CreateAccountContainer>
  )
}

export default CreateAccount
