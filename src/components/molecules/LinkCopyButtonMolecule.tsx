import ButtonAtom from "../atoms/ButtonAtom"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import IconAtom from "../atoms/IconAtom"
import { CopyToClipboard } from "react-copy-to-clipboard"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { OurTubePath } from "../../consts/PathConsts"
import useMedia from "use-media"
import ToastUtil from "@src/utils/toast/ToastUtil"
import { useRouter } from "next/router"

export type Props = {
  roomId: string
  password?: string
}

const LinkCopyButtonMolecule = ({ roomId, password }: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isWide = useMedia({ minWidth: "480px" })
  const [originUrl, setOriginUrl] = useState("")

  useEffect(() => {
    const origin = document.location.origin
    setOriginUrl(origin)
  }, [])

  const copyLink = () => {
    ToastUtil.success("リンクをコピーしました")
  }

  return (
    <CopyToClipboard
      text={`${originUrl}${router.pathname.replace("[id]", roomId)}${
        password ? `?p=${password}` : ""
      }`}
      onCopy={copyLink}
    >
      <ButtonAtom
        bgColor={GeneralColorStyle.ThinBlue}
        text={"招待リンクをコピー"}
        fontColor={GeneralColorStyle.White}
        icon={
          <IconAtom
            style={{ width: isWide ? 24 : 20, color: GeneralColorStyle.White }}
            icon={faCopy}
          />
        }
        onClick={() => LoggerUtil.debug("リンクをコピー")}
      />
    </CopyToClipboard>
  )
}

export default LinkCopyButtonMolecule
