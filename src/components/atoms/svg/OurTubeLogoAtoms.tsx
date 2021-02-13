import OurTube from "../../../assets/images/ourTubeLogo.svg"

export enum LogoColor {
  WHITE = "#fff",
  BLUE = "#54defd",
}

export type Props = {
  size: number
  color: LogoColor
}

const OurTubeLogoAtoms = ({ size, color }: Props) => {
  return <OurTube width={size} fill={color} />
}

export default OurTubeLogoAtoms
