import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import GoogleIconAtoms from "../atoms/svg/GoogleIconAtoms"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"

const GoogleSignInButtonMolecules = () => {
  const signInGoogle = async () => {
    await FirebaseAuthenticationUtil.signInForGoogle()
  }

  return (
    <ButtonAtoms
      bgColor={GeneralColorStyle.White}
      outlineColor={GeneralColorStyle.Black}
      text={"Googleでサインイン"}
      fontColor={GeneralColorStyle.Black}
      icon={<GoogleIconAtoms size={24} />}
      onClick={signInGoogle}
    />
  )
}

export default GoogleSignInButtonMolecules
