import styled, { css } from "styled-components"

const YouTubeContainer = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`

const YouTubeImage = styled.img<{ width: number; height: number }>`
  /* margin-left: 16px; */
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  object-fit: cover;
  border-radius: 8px;
`

export type Props = {
  width: number
  height: number
  src: string
  alt: string
}

const YouTubeThumbnailAtom = ({ width, height, src, alt }: Props) => {
  return (
    <YouTubeContainer width={width} height={height}>
      <YouTubeImage width={width} height={height} src={src} alt={alt} />
    </YouTubeContainer>
  )
}

export default YouTubeThumbnailAtom
