import React, { CSSProperties } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

export type Props = {
  icon: IconProp
  style?: CSSProperties
}

const IconAtom = ({ icon, style }: Props) => {
  return <FontAwesomeIcon style={style} icon={icon} />
}

export default IconAtom
