import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import GoogleIconAtoms from "../atoms/svg/GoogleIconAtoms"
import LoggerUtil from "../../utils/debugger/LoggerUtil"

const GoogleSignInButtonMolecules = () => {
  return (
    <ButtonAtoms
      bgColor={GeneralColorStyle.White}
      outlineColor={GeneralColorStyle.Black}
      text={"Googleでサインイン"}
      fontColor={GeneralColorStyle.Black}
      icon={<GoogleIconAtoms size={24} />}
      onClick={() => LoggerUtil.debug("hogehoge")}
    />
  )
}

export default GoogleSignInButtonMolecules
