import { ChangeEvent } from "react"
import CardAtoms from "../atoms/CardAtoms"
import InputAtoms from "../atoms/InputAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import OurTubeLogoAtoms, { LogoColor } from "../atoms/svg/OurTubeLogoAtoms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import styled from "styled-components"
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

const ErrorTextWrap = styled.div`
  width: 388px;
  text-align: left;
`

const InsertAccountNameMolecules = ({
  userName,
  insetAccountName,
  saveUserName,
}: Props) => {
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
          placeholder={"アカウント作成(20文字以内)"}
          outlineColor={
            userName.length > 20
              ? GeneralColorStyle.Error
              : GeneralColorStyle.DarkGreen
          }
          value={userName}
          onChange={insetAccountName}
        />

        {userName.length > 20 && (
          <ErrorTextWrap>
            <GeneralText
              fontSize={GeneralFontSize.SIZE_16}
              fontColor={GeneralColorStyle.Error}
              fontWeight={GeneralFontWeight.BOLD}
            >
              ユーザ名は20文字以内です。
            </GeneralText>
          </ErrorTextWrap>
        )}

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
