import ButtonAtom from "../atoms/ButtonAtom"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import GoogleIconAtom from "../atoms/svg/GoogleIconAtom"

export type Props = {
  googleSignInClick: () => void
}

const GoogleSignInButtonMolecule = ({ googleSignInClick }: Props) => {
  return (
    <ButtonAtom
      bgColor={GeneralColorStyle.White}
      outlineColor={GeneralColorStyle.Black}
      text={"Googleでサインイン"}
      fontColor={GeneralColorStyle.Black}
      icon={<GoogleIconAtom size={24} />}
      onClick={googleSignInClick}
    />
  )
}

export default GoogleSignInButtonMolecule
