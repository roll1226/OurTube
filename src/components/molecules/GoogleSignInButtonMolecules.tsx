import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import GoogleIconAtoms from "../atoms/svg/GoogleIconAtoms"

export type Props = {
  googleSignInClick: () => void
}

const GoogleSignInButtonMolecules = ({ googleSignInClick }: Props) => {
  return (
    <ButtonAtoms
      bgColor={GeneralColorStyle.White}
      outlineColor={GeneralColorStyle.Black}
      text={"Googleでサインイン"}
      fontColor={GeneralColorStyle.Black}
      icon={<GoogleIconAtoms size={24} />}
      onClick={googleSignInClick}
    />
  )
}

export default GoogleSignInButtonMolecules
