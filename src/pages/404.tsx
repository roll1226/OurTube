import HeadAtom from "../components/atoms/HeadAtom"
import Link from "next/link"
import styled, { css } from "styled-components"
import AccountHeadMolecule from "../components/molecules/AccountHeadMolecule"
import {
  GeneralText,
  GeneralFontSize,
} from "../styles/typography/GeneralTextStyle"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import useMedia from "use-media"
import ButtonAtom from "../components/atoms/ButtonAtom"
import IconAtom from "../components/atoms/IconAtom"
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
      <HeadAtom
        title={"OurTube | 404 Not Found"}
        description={"お気に入りの動画を家族、恋人、友人とともに"}
        keyword={"OurTube, YouTubeShare, 動画, share"}
        url={"/"}
        top={true}
      />
      <AccountHeadMolecule />

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

      <Link href="/create_room">
        <ButtonAtom
          bgColor={GeneralColorStyle.White}
          outlineColor={GeneralColorStyle.Black}
          fontColor={GeneralColorStyle.Black}
          text={"戻る"}
          icon={
            <IconAtom
              style={{
                color: GeneralColorStyle.Black,
                width: isWide ? 16 : 12,
              }}
              icon={faChevronLeft}
            />
          }
        />
      </Link>
    </Custom404Container>
  )
}

export default Custom404
