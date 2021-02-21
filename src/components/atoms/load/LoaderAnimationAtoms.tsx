import styled, { keyframes } from "styled-components"
import GeneralColorStyle from "../../../styles/colors/GeneralColorStyle"
import { HoverItem } from "../../../styles/shadow/GeneralShadowStyle"

const CssLoadRota = `
  from {
  }
  to {
    transform: rotate(360deg);
  }
`

const CssLoadOpa = `
  0% {
  }
  12.0% {
    opacity: 0.8;
  }
  19.5% {
    opacity: 0.88;
  }
  37.2% {
    opacity: 0.64;
  }
  40.5% {
    opacity: 0.52;
  }
  52.7% {
    opacity: 0.69;
  }
  60.2% {
    opacity: 0.6;
  }
  66.6% {
    opacity: 0.52;
  }
  70.0% {
    opacity: 0.63;
  }
  79.9% {
    opacity: 0.6;
  }
  84.2% {
    opacity: 0.75;
  }
  91.0% {
    opacity: 0.87;
  }
`

const LoaderAnimationContainer = styled.div`
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

const LoaderAnimationWrap = styled.div`
  /* position: absolute;
  top: 45%;
  bottom: 45%;
  left: 25%;
  right: 25%; */
`

const LoaderAnimationBokeh = styled.ul`
  font-size: 113px;
  width: 1em;
  height: 1em;
  position: relative;
  margin: 0 auto;
  list-style: none;
  padding: 0;
  border-radius: 50%;
`

const LoaderAnimationCircle = styled.li`
  position: absolute;
  width: 0.2em;
  height: 0.2em;
  border-radius: 50%;
  /* box-shadow: ${HoverItem}; */
`

const LoaderAnimationCircleOne = styled(LoaderAnimationCircle)`
  left: 50%;
  top: 0;
  margin: 0 0 0 -0.1em;
  background: ${GeneralColorStyle.DarkBlue};
  transform-origin: 50% 250%;
  animation: 0.9565s linear infinite ${keyframes`${CssLoadRota}`},
    3.1235s ease-in-out infinite alternate ${keyframes`${CssLoadOpa}`};
`

const LoaderAnimationCircleTwo = styled(LoaderAnimationCircle)`
  left: 50%;
  top: 0;
  margin: 0 0 0 -0.1em;
  background: ${GeneralColorStyle.ThinBlue};
  transform-origin: 50% 250%;
  animation: 1.583s linear infinite ${keyframes`${CssLoadRota}`},
    3.6445s ease-in-out infinite alternate ${keyframes`${CssLoadOpa}`};
`

const LoaderAnimationCircleThree = styled(LoaderAnimationCircle)`
  left: 50%;
  top: 0;
  margin: 0 0 0 -0.1em;
  background: ${GeneralColorStyle.DarkGreen};
  transform-origin: 50% 250%;
  animation: 1.2325s linear infinite ${keyframes`${CssLoadRota}`},
    4.356s ease-in-out infinite alternate ${keyframes`${CssLoadOpa}`};
`

const LoaderAnimationCircleFour = styled(LoaderAnimationCircle)`
  left: 50%;
  top: 0;
  margin: 0 0 0 -0.1em;
  background: ${GeneralColorStyle.ThinGreen};
  transform-origin: 50% 250%;
  animation: 1.466s linear infinite ${keyframes`${CssLoadRota}`},
    4.4625s ease-in-out infinite alternate ${keyframes`${CssLoadOpa}`};
`

const LoaderAnimationAtoms = () => {
  return (
    <LoaderAnimationContainer>
      <LoaderAnimationWrap>
        <LoaderAnimationBokeh>
          <LoaderAnimationCircleOne />
          <LoaderAnimationCircleTwo />
          <LoaderAnimationCircleThree />
          <LoaderAnimationCircleFour />
        </LoaderAnimationBokeh>
      </LoaderAnimationWrap>
    </LoaderAnimationContainer>
  )
}

export default LoaderAnimationAtoms
