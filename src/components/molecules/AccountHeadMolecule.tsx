import styled, { css } from "styled-components"
import OurTubeLogoAtom, { LogoColor } from "../atoms/svg/OurTubeLogoAtom"
import SignOutButtonMolecule from "./SignOutButtonMolecule"
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

const AccountHeadMolecule = () => {
  const isWide = useMedia({ minWidth: "480px" })

  return (
    <>
      <Link href="/create_room">
        <LogoContainer isWide={isWide}>
          <OurTubeLogoAtom size={isWide ? 240 : 160} color={LogoColor.WHITE} />
        </LogoContainer>
      </Link>

      <SignOutButtonMolecule />
    </>
  )
}

export default AccountHeadMolecule
