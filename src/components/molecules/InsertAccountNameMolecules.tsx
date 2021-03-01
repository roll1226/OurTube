import { ChangeEvent } from "react"
import CardAtoms from "../atoms/CardAtoms"
import InputAtoms from "../atoms/InputAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import OurTubeLogoAtoms, { LogoColor } from "../atoms/svg/OurTubeLogoAtoms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"

export type Props = {
  userName: string
  insetAccountName: (event: ChangeEvent<HTMLInputElement>) => void
  saveUserName: () => void
}

const InsertAccountNameMolecules = ({
  userName,
  insetAccountName,
  saveUserName,
}: Props) => {
  return (
    <>
      <CardAtoms width={480}>
        <OurTubeLogoAtoms size={392} color={LogoColor.BLUE} />

        <GeneralSpacer vertical={24} />

        <GeneralText
          fontSize={GeneralFontSize.SIZE_36}
          fontColor={GeneralColorStyle.DarkGreen}
          fontWeight={GeneralFontWeight.BOLD}
        >
          アカウント名を入力
        </GeneralText>

        <GeneralText
          fontSize={GeneralFontSize.SIZE_12}
          fontColor={GeneralColorStyle.Black}
        >
          &#x203B;OurTubeでは各サービスのアイコン画像が使用されます。
        </GeneralText>

        <GeneralSpacer vertical={24} />

        <InputAtoms
          width={360}
          placeholder={"アカウント名(20文字以内)"}
          outlineColor={GeneralColorStyle.DarkGreen}
          value={userName}
          onChange={insetAccountName}
          isError={userName.length > 20}
          errorText={"アカウント名は20文字以内です。"}
        />

        <GeneralSpacer vertical={24} />

        <ButtonAtoms
          bgColor={GeneralColorStyle.DarkGreen}
          text={"アカウントを作成する"}
          fontColor={GeneralColorStyle.White}
          onClick={saveUserName}
          disabled={!userName || userName.length > 20 ? true : false}
        />
      </CardAtoms>
    </>
  )
}

export default InsertAccountNameMolecules
