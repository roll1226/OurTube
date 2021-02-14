import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import GoogleIconAtoms from "../atoms/svg/GoogleIconAtoms"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import { useRouter } from "next/router"
import { OurTubePath } from "../../consts/PathConsts"

const GoogleSignInButtonMolecules = () => {
  const router = useRouter()
  const signInGoogle = async () => {
    const { user } = await FirebaseAuthenticationUtil.signInForGoogle()
    const isName = await FirebaseStoreUtil.checkUserName(user.uid)
    if (isName) router.push(OurTubePath.CREATE_ROOM)
    else router.push(OurTubePath.CREATE_ACCOUNT)
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
