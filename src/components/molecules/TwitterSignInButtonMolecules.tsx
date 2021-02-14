import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import IconAtoms from "../atoms/IconAtoms"
import FirebaseAuthenticationUtil from "../../utils/lib/FirebaseAuthenticationUtil"
import FirebaseStoreUtil from "../../utils/lib/FirebaseStoreUtil"
import { useRouter } from "next/router"
import { OurTubePath } from "../../consts/PathConsts"

const TwitterSignInButtonMolecules = () => {
  const router = useRouter()
  const signInTwitter = async () => {
    const { user } = await FirebaseAuthenticationUtil.signInForTwitter()
    const isName = await FirebaseStoreUtil.checkUserName(user.uid)
    if (isName) router.push(OurTubePath.CREATE_ROOM)
    else router.push(OurTubePath.CREATE_ACCOUNT)
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
