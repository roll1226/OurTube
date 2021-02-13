import Google from "../../../assets/images/google-icon.svg"

export type Props = {
  size: number
}

const GoogleIconAtoms = ({ size }: Props) => {
  return <Google width={size} height={size} />
}

export default GoogleIconAtoms
