import styled from "styled-components"
import GoogleSignInButtonMolecules from "../molecules/GoogleSignInButtonMolecules"
import TwitterSignInButtonMolecules from "../molecules/TwitterSignInButtonMolecules"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export type Props = {
  googleSignInClick: () => void
  twitterSignInClick: () => void
}

const SignInContainerOrganisms = ({
  googleSignInClick,
  twitterSignInClick,
}: Props) => {
  return (
    <SignInContainer>
      <GoogleSignInButtonMolecules googleSignInClick={googleSignInClick} />

      <GeneralSpacer vertical={12} />

      <TwitterSignInButtonMolecules twitterSignInClick={twitterSignInClick} />
    </SignInContainer>
  )
}

export default SignInContainerOrganisms
