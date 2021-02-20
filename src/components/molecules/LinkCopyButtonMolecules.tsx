import ButtonAtoms from "../atoms/ButtonAtoms"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import IconAtoms from "../atoms/IconAtoms"
import { CopyToClipboard } from "react-copy-to-clipboard"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import { useDispatch } from "react-redux"
import toastSlice from "../../ducks/toast/slice"
import { useState, useEffect } from "react"
import { OurTubePath } from "../../consts/PathConsts"

export type Props = {
  roomId: string
}

const LinkCopyButtonMolecules = ({ roomId }: Props) => {
  const dispatch = useDispatch()

  const [originUrl, setOriginUrl] = useState("")

  useEffect(() => {
    const origin = document.location.origin
    setOriginUrl(origin)
  }, [])

  const copyLink = () => {
    dispatch(toastSlice.actions.setIsActive(true))
    dispatch(toastSlice.actions.setText("リンクをコピーしました"))
    dispatch(toastSlice.actions.setToastColor("success"))

    setTimeout(() => {
      dispatch(toastSlice.actions.setIsActive(false))
    }, 2000)
  }

  return (
    <CopyToClipboard
      text={`${originUrl}/${OurTubePath.SHARE_ROOM.replace("[id]", roomId)}`}
      onCopy={copyLink}
    >
      <ButtonAtoms
        bgColor={GeneralColorStyle.ThinBlue}
        text={"招待リンクをコピー"}
        fontColor={GeneralColorStyle.White}
        icon={
          <IconAtoms
            style={{ width: 24, color: GeneralColorStyle.White }}
            icon={faCopy}
          />
        }
        onClick={() => LoggerUtil.debug("リンクをコピー")}
      />
    </CopyToClipboard>
  )
}

export default LinkCopyButtonMolecules
