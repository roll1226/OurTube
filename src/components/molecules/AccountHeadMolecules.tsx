import styled from "styled-components"
import OurTubeLogoAtoms, { LogoColor } from "../atoms/svg/OurTubeLogoAtoms"
import SignOutButtonMolecules from "./SignOutButtonMolecules"
import Link from "next/link"

const LogoContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  cursor: pointer;
`

const AccountHeadMolecules = () => {
  return (
    <>
      <Link href="/create_room">
        <LogoContainer>
          <OurTubeLogoAtoms size={240} color={LogoColor.WHITE} />
        </LogoContainer>
      </Link>

      <SignOutButtonMolecules />
    </>
  )
}

export default AccountHeadMolecules
