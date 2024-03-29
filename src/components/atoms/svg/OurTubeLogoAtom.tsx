import OurTube from "../../../assets/images/ourTubeLogo1.svg"

export enum LogoColor {
  WHITE = "#fff",
  BLUE = "#54defd",
}

export type Props = {
  size: number
  color: LogoColor
}

const OurTubeLogoAtom = ({ size, color }: Props) => {
  return <OurTube width={size} height={"100%"} fill={color} />
}

export default OurTubeLogoAtom
