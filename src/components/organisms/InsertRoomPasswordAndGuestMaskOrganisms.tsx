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
import useMedia from "use-media"

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
  const isWide = useMedia({ minWidth: "480px" })

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!value) return
    if (event.key === "Enter") onClick()
  }

  return (
    <>
      <MaskAtoms isOpen={true}>
        <CardAtoms width={isWide ? 480 : 280}>
          <OurTubeLogoAtoms size={isWide ? 430 : 280} color={LogoColor.BLUE} />
          <GeneralText
            fontSize={
              isWide ? GeneralFontSize.SIZE_36 : GeneralFontSize.SIZE_24
            }
            fontColor={GeneralColorStyle.DarkGreen}
          >
            {title}
          </GeneralText>

          <GeneralSpacer vertical={isWide ? 32 : 20} />

          <InputAtoms
            placeholder={placeholder}
            width={isWide ? 300 : 240}
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
