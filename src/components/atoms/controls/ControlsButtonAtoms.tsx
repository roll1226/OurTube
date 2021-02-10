import React, { ReactNode } from "react"
import styled from "styled-components"

const ControlsButtonContainer = styled.button``

export type Props = {
  children: ReactNode
}

const ControlsButtonAtoms = ({ children }: Props) => {
  return <ControlsButtonContainer>{children}</ControlsButtonContainer>
}

export default ControlsButtonAtoms
