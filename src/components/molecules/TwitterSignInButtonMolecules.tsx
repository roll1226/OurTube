import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import IconAtoms from "../atoms/IconAtoms"

const TwitterSignInButtonMolecules = () => {
  return (
    <ButtonAtoms
      bgColor={GeneralColorStyle.Twitter}
      text={"Twitterでサインイン"}
      fontColor={GeneralColorStyle.White}
      icon={
        <IconAtoms
          style={{ width: "24px", color: GeneralColorStyle.White }}
          icon={faTwitter}
        />
      }
      onClick={() => LoggerUtil.debug("hogehoge")}
    />
  )
}

export default TwitterSignInButtonMolecules
