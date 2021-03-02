import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import IconAtoms from "../atoms/IconAtoms"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import styled, { css } from "styled-components"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import { useRouter } from "next/router"
import { OurTubePath } from "../../consts/PathConsts"
import FirebaseDatabaseUtil from "../../utils/lib/FirebaseDatabaseUtil"
import useMedia from "use-media"

const SignOutButtonContainer = styled.div<{ isWide: boolean }>`
  position: absolute;
  top: 28px;
  right: 20px;

  ${({ isWide }) =>
    isWide &&
    css`
      top: 48px;
      right: 40px;
    `}
`

const SignOutButtonMolecules = () => {
  const router = useRouter()
  const isWide = useMedia({ minWidth: "480px" })

  const singOut = async () => {
    FirebaseDatabaseUtil.offlineState()

    await FirebaseAuthenticationUtil.SingOut()
    router.replace(OurTubePath.TOP)
  }

  return (
    <SignOutButtonContainer isWide={isWide}>
      <ButtonAtoms
        text={"サインアウトする"}
        bgColor={GeneralColorStyle.White}
        outlineColor={GeneralColorStyle.Black}
        fontColor={GeneralColorStyle.Black}
        icon={
          <IconAtoms
            style={{ color: GeneralColorStyle.Black, width: isWide ? 24 : 20 }}
            icon={faSignOutAlt}
          />
        }
        onClick={singOut}
      />
    </SignOutButtonContainer>
  )
}

export default SignOutButtonMolecules
