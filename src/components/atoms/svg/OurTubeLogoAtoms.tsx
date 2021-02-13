import OurTube from "../../../assets/images/ourTube.svg"

export enum LogoColor {
  WHITE = "#fff",
  DARK_BLUE = "#49c6e5",
}

export type Props = {
  size: number
  color: LogoColor
}

const OurTubeLogoAtoms = ({ size, color }: Props) => {
  return <OurTube width={size} fill={color} />
}

export default OurTubeLogoAtoms
