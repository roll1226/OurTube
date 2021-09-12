import CardAtom from "../atoms/CardAtom"
import MaskAtom from "../atoms/MaskAtom"
import ButtonAtom from "../atoms/ButtonAtom"
import { GeneralSpacer } from "../../styles/spacer/GeneralSpacerStyle"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import {
  GeneralFontSize,
  GeneralText,
} from "../../styles/typography/GeneralTextStyle"
import OurTubeLogoAtom, { LogoColor } from "../atoms/svg/OurTubeLogoAtom"
import InputAtom from "../atoms/InputAtom"
import { ChangeEvent, KeyboardEvent } from "react"
import useMedia from "use-media"

export type Props = {
  value: string
  title: string
  placeholder: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

const InsertRoomPasswordAndGuestMaskOrganism = ({
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
      <MaskAtom isOpen={true}>
        <CardAtom width={isWide ? 480 : 280}>
          <OurTubeLogoAtom size={isWide ? 430 : 280} color={LogoColor.BLUE} />
          <GeneralText
            fontSize={
              isWide ? GeneralFontSize.SIZE_36 : GeneralFontSize.SIZE_24
            }
            fontColor={GeneralColorStyle.DarkGreen}
          >
            {title}
          </GeneralText>

          <GeneralSpacer vertical={isWide ? 32 : 20} />

          <InputAtom
            placeholder={placeholder}
            width={isWide ? 300 : 240}
            value={value}
            outlineColor={GeneralColorStyle.Black}
            onChange={onChange}
            onKeyPress={onKeyPress}
            password={true}
          />

          <GeneralSpacer vertical={16} />

          <ButtonAtom
            bgColor={GeneralColorStyle.DarkGreen}
            text={"参加する"}
            fontColor={GeneralColorStyle.White}
            onClick={onClick}
            disabled={value ? false : true}
          />
        </CardAtom>
      </MaskAtom>
    </>
  )
}

export default InsertRoomPasswordAndGuestMaskOrganism
