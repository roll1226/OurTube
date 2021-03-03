import { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { Provider } from "react-redux"
import createStore from "../ducks/createStore"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import LoggerUtil from "../utils/debugger/LoggerUtil"
import { firebaseAuth } from "../utils/lib/FirebaseAuthenticationUtil"
import CircleAtoms from "../components/atoms/CircleAtoms"
import { OurTubePath } from "../consts/PathConsts"
import FirebaseStoreUtil from "../utils/lib/FirebaseStoreUtil"
import ToastCardMolecules from "../components/molecules/ToastCardMolecules"
import LoaderAnimationMaskMolecules from "../components/molecules/LoaderAnimationMaskMolecules"
import { useModalState } from "../ducks/modal/selectors"
import FirebaseDatabaseUtil from "../utils/lib/FirebaseDatabaseUtil"
import useMedia from "use-media"

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family:
      "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro", "Hiragino Maru Gothic Pro", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
    background-color: ${GeneralColorStyle.ColoredWhite};
  }
`

const CircleContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
`

const ComponentContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  z-index: 3;
`

const DarkBlueCircle = styled(CircleAtoms)``

const DarkGreenCircle = styled(CircleAtoms)``

const AppBackground = () => {
  const router = useRouter()
  const isWide = useMedia({ minWidth: "480px" })

  const [nowPathname, setNowPathname] = useState("/")

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(async (user) => {
      const pathname = router.pathname

      if (!user) {
        if (
          pathname !== OurTubePath.TOP &&
          pathname !== OurTubePath.INSERT_ROOM_PASSWORD &&
          pathname !== OurTubePath.CREATE_GUEST &&
          pathname !== OurTubePath.ERROR &&
          pathname !== OurTubePath.SHARE_ROOM
        ) {
          router.replace("/")
          LoggerUtil.debug(router)
        }
      } else {
        const userName = await FirebaseStoreUtil.checkUserName(user.uid)

        if (pathname === OurTubePath.SHARE_ROOM) return
        if (pathname === OurTubePath.INSERT_ROOM_PASSWORD) return
        if (pathname === OurTubePath.CREATE_GUEST) return
        if (pathname === OurTubePath.ERROR) return

        if (userName) router.push(OurTubePath.CREATE_ROOM)
        else router.push(OurTubePath.CREATE_ACCOUNT)
      }
    })
  }, [])

  useEffect(() => {
    const pathname = router.pathname
    setNowPathname(pathname)
  }, [router])

  return (
    <CircleContainer>
      <DarkBlueCircle
        color={GeneralColorStyle.DarkBlue}
        size={isWide ? 80 : 160}
        path={nowPathname}
        scale={1}
      />

      <DarkGreenCircle
        color={GeneralColorStyle.DarkGreen}
        size={isWide ? 60 : 120}
        path={nowPathname}
        scale={1}
      />
    </CircleContainer>
  )
}

const GlobalLoader = () => {
  const modalState = useModalState().modal

  return (
    <>
      {modalState.loading && (
        <LoaderAnimationMaskMolecules isOpen={modalState.loading} />
      )}
    </>
  )
}

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={createStore()}>
      <GlobalStyle />
      <AppBackground />

      <ComponentContainer>
        <Component {...pageProps} />
      </ComponentContainer>

      <ToastCardMolecules />

      <GlobalLoader />
    </Provider>
  )
}

export default App
