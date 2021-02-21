import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import IconAtoms from "../atoms/IconAtoms"

export type Props = {
  twitterSignInClick: () => void
}

const TwitterSignInButtonMolecules = ({ twitterSignInClick }: Props) => {
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
      onClick={twitterSignInClick}
    />
  )
}

export default TwitterSignInButtonMolecules
