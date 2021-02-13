import { useState, ChangeEvent } from "react"
import CardAtoms from "../atoms/CardAtoms"
import InputAtoms from "../atoms/InputAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import OurTubeLogoAtoms, { LogoColor } from "../atoms/svg/OurTubeLogoAtoms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"

const InsertAccountNameMolecules = () => {
  const [accountName, setAccountName] = useState("")

  const insetAccountName = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountName(event.target.value)
  }

  return (
    <>
      <CardAtoms width={480}>
        <OurTubeLogoAtoms size={392} color={LogoColor.BLUE} />

        <GeneralSpacer vertical={52} />

        <GeneralText
          fontSize={GeneralFontSize.SIZE_36}
          fontColor={GeneralColorStyle.DarkGreen}
          fontWeight={GeneralFontWeight.BOLD}
        >
          アカウント作成
        </GeneralText>

        <GeneralSpacer vertical={24} />

        <InputAtoms
          width={360}
          placeholder={"アカウント作成"}
          outlineColor={GeneralColorStyle.DarkGreen}
          value={accountName}
          onChange={insetAccountName}
        />

        <GeneralSpacer vertical={24} />

        <ButtonAtoms
          bgColor={GeneralColorStyle.DarkGreen}
          text={"アカウントを作成する"}
          fontColor={GeneralColorStyle.White}
          onClick={() => LoggerUtil.debug("hogehoge")}
        />
      </CardAtoms>
    </>
  )
}

export default InsertAccountNameMolecules
