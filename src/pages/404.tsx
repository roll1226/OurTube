import HeadAtoms from "../components/atoms/HeadAtoms"
import styled, { css } from "styled-components"
import AccountHeadMolecules from "../components/molecules/AccountHeadMolecules"
import {
  GeneralText,
  GeneralFontSize,
} from "../styles/typography/GeneralTextStyle"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import useMedia from "use-media"
import ButtonAtoms from "../components/atoms/ButtonAtoms"
import IconAtoms from "../components/atoms/IconAtoms"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

const Custom404Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const HorizonBar = styled.div`
  margin: 0 40px;
  width: 4px;
  height: 100px;
  background: ${GeneralColorStyle.Black};
`

const TextWrap = styled.div<{ isWide: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ isWide }) =>
    isWide &&
    css`
      flex-direction: row;
    `}

  justify-content: center;
  align-items: center;
`

const Custom404 = () => {
  const isWide = useMedia({ minWidth: "480px" })

  return (
    <Custom404Container>
      <HeadAtoms
        title={"OurTube | 404 Not Found"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={"/"}
        top={true}
      />
      <AccountHeadMolecules />

      <TextWrap isWide={isWide}>
        <GeneralText
          fontSize={isWide ? GeneralFontSize.SIZE_80 : GeneralFontSize.SIZE_52}
        >
          404
        </GeneralText>

        {isWide && <HorizonBar />}

        <GeneralText
          fontSize={isWide ? GeneralFontSize.SIZE_80 : GeneralFontSize.SIZE_52}
        >
          Not Found
        </GeneralText>
      </TextWrap>

      <ButtonAtoms
        bgColor={GeneralColorStyle.White}
        outlineColor={GeneralColorStyle.Black}
        fontColor={GeneralColorStyle.Black}
        text={"戻る"}
        icon={
          <IconAtoms
            style={{ color: GeneralColorStyle.Black, width: isWide ? 16 : 12 }}
            icon={faChevronLeft}
          />
        }
      />
    </Custom404Container>
  )
}

export default Custom404
