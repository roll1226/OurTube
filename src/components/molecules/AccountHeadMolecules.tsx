import styled, { css } from "styled-components"
import OurTubeLogoAtoms, { LogoColor } from "../atoms/svg/OurTubeLogoAtoms"
import SignOutButtonMolecules from "./SignOutButtonMolecules"
import Link from "next/link"
import useMedia from "use-media"

const LogoContainer = styled.div<{ isWide: boolean }>`
  position: absolute;
  top: 28px;
  left: 28px;
  cursor: pointer;

  ${({ isWide }) =>
    isWide &&
    css`
      top: 40px;
      left: 40px;
    `}
`

const AccountHeadMolecules = () => {
  const isWide = useMedia({ minWidth: "480px" })

  return (
    <>
      <Link href="/create_room">
        <LogoContainer isWide={isWide}>
          <OurTubeLogoAtoms size={isWide ? 240 : 160} color={LogoColor.WHITE} />
        </LogoContainer>
      </Link>

      <SignOutButtonMolecules />
    </>
  )
}

export default AccountHeadMolecules
