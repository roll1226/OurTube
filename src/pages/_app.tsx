import { AppProps, AppContext } from "next/app"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { Provider } from "react-redux"
import createStore from "../ducks/createStore"
import GeneralColorStyle from "../styles/colors/GeneralColorStyle"
import LoggerUtil from "../utils/debugger/LoggerUtil"
import FirebaseAuthenticationUtil from "../utils/lib/FirebaseAuthenticationUtil"

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
  position: relative;
`

const ComponentContainer = styled.div`
  position: relative;
  z-index: 3;
`

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Provider store={createStore()}>
        <GlobalStyle />
        <CircleContainer>
          <div>hogehogehogehoge</div>

          <ComponentContainer>
            <Component {...pageProps} />
          </ComponentContainer>
        </CircleContainer>
      </Provider>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const isLogin = FirebaseAuthenticationUtil.getCurrentUser()
  if (ctx.pathname !== "/" && ctx.pathname !== "/_error") {
    if (!isLogin) {
      LoggerUtil.debug(isLogin)
      ctx.res.statusCode = 302
      ctx.res.setHeader("Location", "/")
    } else {
      LoggerUtil.debug(isLogin)
    }
  }
  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      pathname: ctx.pathname,
    },
  }
}

export default App
