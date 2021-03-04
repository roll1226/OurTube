import CardAtoms from "../atoms/CardAtoms"
import MaskAtoms from "../atoms/MaskAtoms"
import ButtonAtoms from "../atoms/ButtonAtoms"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import {
  GeneralFontSize,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import OurTubeLogoAtoms, { LogoColor } from "../atoms/svg/OurTubeLogoAtoms"
import InputAtoms from "../atoms/InputAtoms"
import { ChangeEvent, KeyboardEvent } from "react"

export type Props = {
  value: string
  title: string
  placeholder: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

const InsertRoomPasswordAndGuestMaskOrganisms = ({
  value,
  title,
  placeholder,
  onChange,
  onClick,
}: Props) => {
  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!value) return
    if (event.key === "Enter") onClick()
  }

  return (
    <>
      <MaskAtoms isOpen={true}>
        <CardAtoms width={480}>
          <OurTubeLogoAtoms size={430} color={LogoColor.BLUE} />
          <GeneralText
            fontSize={GeneralFontSize.SIZE_36}
            fontColor={GeneralColorStyle.DarkGreen}
          >
            {title}
          </GeneralText>

          <GeneralSpacer vertical={32} />

          <InputAtoms
            placeholder={placeholder}
            width={300}
            value={value}
            outlineColor={GeneralColorStyle.Black}
            onChange={onChange}
            onKeyPress={onKeyPress}
            password={true}
          />

          <GeneralSpacer vertical={16} />

          <ButtonAtoms
            bgColor={GeneralColorStyle.DarkGreen}
            text={"参加する"}
            fontColor={GeneralColorStyle.White}
            onClick={onClick}
            disabled={value ? false : true}
          />
        </CardAtoms>
      </MaskAtoms>
    </>
  )
}

export default InsertRoomPasswordAndGuestMaskOrganisms
