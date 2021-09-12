import ButtonAtom from "../atoms/ButtonAtom"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import IconAtom from "../atoms/IconAtom"

export type Props = {
  twitterSignInClick: () => void
}

const TwitterSignInButtonMolecule = ({ twitterSignInClick }: Props) => {
  return (
    <ButtonAtom
      bgColor={GeneralColorStyle.Twitter}
      text={"Twitterでサインイン"}
      fontColor={GeneralColorStyle.White}
      icon={
        <IconAtom
          style={{ width: "24px", color: GeneralColorStyle.White }}
          icon={faTwitter}
        />
      }
      onClick={twitterSignInClick}
    />
  )
}

export default TwitterSignInButtonMolecule
