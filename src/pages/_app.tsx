import { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { Provider } from "react-redux"
import createStore from "../ducks/createStore"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import LoggerUtil from "../utils/debugger/LoggerUtil"
import FirebaseAuthenticationUtil from "../utils/lib/FirebaseAuthenticationUtil"
import CircleAtoms from "../components/atoms/CircleAtoms"
import { OurTubePath } from "../consts/PathConsts"

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

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter()

  const [nowPathname, setNowPathname] = useState("/")

  useEffect(() => {
    LoggerUtil.debug(router)
    const pathname = router.pathname
    setNowPathname(pathname)

    if (
      pathname !== OurTubePath.TOP &&
      pathname !== OurTubePath.INSERT_ROOM_PASSWORD &&
      pathname !== OurTubePath.CREATE_GUEST &&
      pathname !== OurTubePath.ERROR
    ) {
      const isLogin = FirebaseAuthenticationUtil.getCurrentUser()

      if (!isLogin) {
        router.replace("/")
      }
    }
  }, [router])

  return (
    <Provider store={createStore()}>
      <GlobalStyle />
      <CircleContainer>
        <DarkBlueCircle
          color={GeneralColorStyle.DarkBlue}
          size={1200}
          path={nowPathname}
          scale={1}
        />

        <DarkGreenCircle
          color={GeneralColorStyle.DarkGreen}
          size={900}
          path={nowPathname}
          scale={1}
        />
      </CircleContainer>

      <ComponentContainer>
        <Component {...pageProps} />
      </ComponentContainer>
    </Provider>
  )
}

export default App
