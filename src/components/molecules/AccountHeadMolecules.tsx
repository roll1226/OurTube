import styled from "styled-components"
import OurTubeLogoAtoms, { LogoColor } from "../atoms/svg/OurTubeLogoAtoms"
import SignOutButtonMolecules from "./SignOutButtonMolecules"

const LogoContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
`

const AccountHeadMolecules = () => {
  return (
    <>
      <LogoContainer>
        <OurTubeLogoAtoms size={240} color={LogoColor.WHITE} />
      </LogoContainer>

      <SignOutButtonMolecules />
    </>
  )
}

export default AccountHeadMolecules
