import styled from "styled-components"
import GoogleSignInButtonMolecules from "../molecules/GoogleSignInButtonMolecules"
import TwitterSignInButtonMolecules from "../molecules/TwitterSignInButtonMolecules"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SignInContainerOrganisms = () => {
  return (
    <SignInContainer>
      <GoogleSignInButtonMolecules />

      <GeneralSpacer vertical={12} />

      <TwitterSignInButtonMolecules />
    </SignInContainer>
  )
}

export default SignInContainerOrganisms
