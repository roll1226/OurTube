import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import IconAtoms from "../atoms/IconAtoms"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import { useDispatch } from "react-redux"
import authSlice from "../../ducks/auth/slice"

const TwitterSignInButtonMolecules = () => {
  const dispatch = useDispatch()

  const signInTwitter = async () => {
    dispatch(authSlice.actions.setAuthLoader(true))
    await FirebaseAuthenticationUtil.signInForTwitter()
  }

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
      onClick={signInTwitter}
    />
  )
}

export default TwitterSignInButtonMolecules
