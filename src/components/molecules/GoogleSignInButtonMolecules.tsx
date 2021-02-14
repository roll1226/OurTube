import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import GoogleIconAtoms from "../atoms/svg/GoogleIconAtoms"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import { useDispatch } from "react-redux"
import authSlice from "../../ducks/auth/slice"

const GoogleSignInButtonMolecules = () => {
  const dispatch = useDispatch()

  const signInGoogle = async () => {
    dispatch(authSlice.actions.setAuthLoader(true))
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
