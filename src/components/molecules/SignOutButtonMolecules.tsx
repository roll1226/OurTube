import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import IconAtoms from "../atoms/IconAtoms"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import { useRouter } from "next/router"
import { OurTubePath } from "../../consts/PathConsts"

const SignOutButtonContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
`

const SignOutButtonMolecules = () => {
  const router = useRouter()

  const singOut = async () => {
    await FirebaseAuthenticationUtil.SingOut()
  }

  return (
    <SignOutButtonContainer>
      <ButtonAtoms
        text={"サインアウトする"}
        bgColor={GeneralColorStyle.White}
        outlineColor={GeneralColorStyle.Black}
        fontColor={GeneralColorStyle.Black}
        icon={
          <IconAtoms
            style={{ color: GeneralColorStyle.Black, width: 24 }}
            icon={faSignOutAlt}
          />
        }
        onClick={singOut}
      />
    </SignOutButtonContainer>
  )
}

export default SignOutButtonMolecules
