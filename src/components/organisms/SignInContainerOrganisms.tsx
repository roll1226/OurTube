import styled from "styled-components"
import GoogleSignInButtonMolecules from "../molecules/GoogleSignInButtonMolecules"
import TwitterSignInButtonMolecules from "../molecules/TwitterSignInButtonMolecules"

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SignInSpacer = styled.div`
  margin-top: 12px;
`

const SignInContainerOrganisms = () => {
  return (
    <SignInContainer>
      <GoogleSignInButtonMolecules />
      <SignInSpacer />
      <TwitterSignInButtonMolecules />
    </SignInContainer>
  )
}

export default SignInContainerOrganisms
