import styled from "styled-components"
import GoogleSignInButtonMolecule from "../molecules/GoogleSignInButtonMolecule"
import TwitterSignInButtonMolecule from "../molecules/TwitterSignInButtonMolecule"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export type Props = {
  googleSignInClick: () => void
  twitterSignInClick: () => void
}

const SignInContainerOrganism = ({
  googleSignInClick,
  twitterSignInClick,
}: Props) => {
  return (
    <SignInContainer>
      <GoogleSignInButtonMolecule googleSignInClick={googleSignInClick} />

      <GeneralSpacer vertical={12} />

      <TwitterSignInButtonMolecule twitterSignInClick={twitterSignInClick} />
    </SignInContainer>
  )
}

export default SignInContainerOrganism
