import { ChangeEvent } from "react"
import styled, { css } from "styled-components"
import SendTextMolecules from "./SendTextMolecules"
import YouTubeListMolecules from "./YouTubeListMolecules"
import dynamic from "next/dynamic"

const UrlSendContainer = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  display: none;
  ${({ isActive }) =>
    isActive &&
    css`
      display: block;
    `};
`

export type Props = {
  youTubeUrl: string
  changeYouTubeUrl: (event: ChangeEvent<HTMLInputElement>) => void
  sendYouTubeUrl: () => void
  isActive: boolean
}

const UrlSendMolecules = ({
  youTubeUrl,
  changeYouTubeUrl,
  sendYouTubeUrl,
  isActive = true,
}: Props) => {
  return (
    <UrlSendContainer isActive={isActive}>
      <YouTubeListMolecules />

      <SendTextMolecules
        text={youTubeUrl}
        placeholder={"動画URLを入力"}
        onChange={changeYouTubeUrl}
        onClick={sendYouTubeUrl}
      />
    </UrlSendContainer>
  )
}

export default dynamic(() => Promise.resolve(UrlSendMolecules), {
  ssr: false,
})
