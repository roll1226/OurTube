import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import IconAtoms from "../atoms/IconAtoms"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import styled from "styled-components"

const SignOutButtonContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
`

const SignOutButtonMolecules = () => {
  return (
    <SignOutButtonContainer>
      <ButtonAtoms
        text={"サインアウトする"}
        bgColor={GeneralColorStyle.White}
        outlineColor={GeneralColorStyle.Black}
        fontColor={GeneralColorStyle.Black}
        icon={
          <IconAtoms
            style={{ color: GeneralColorStyle.Black, width: 24 }}
            icon={faSignOutAlt}
          />
        }
        onClick={() => LoggerUtil.debug("hogehoge")}
      />
    </SignOutButtonContainer>
  )
}

export default SignOutButtonMolecules
