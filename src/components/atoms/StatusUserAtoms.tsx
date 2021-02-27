import styled, { css } from "styled-components"
import GeneralColorStyle from "../../styles/colors/GeneralColorStyle"
import ColorUtil from "../../utils/color/ColorUtil"

const StatusUserContainer = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
`

const UserPhoto = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 1000px;
  background: ${GeneralColorStyle.White};
  border: solid 2px ${GeneralColorStyle.Black};
`

const Status = styled.div<{ state: "online" | "offline" }>`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 1000px;
  top: 0;
  right: 0;
  background: ${GeneralColorStyle.Grey};
  box-shadow: 0px 0px 4px ${ColorUtil.addOpacity(GeneralColorStyle.Black, 0.3)};

  ${({ state }) =>
    state === `online` &&
    css`
      background: ${GeneralColorStyle.ActiveUser};
    `}
`

export type Props = {
  photoURL: string
  state: "online" | "offline"
}

const StatusUserAtoms = ({ photoURL, state = "offline" }: Props) => {
  return (
    <StatusUserContainer>
      <UserPhoto
        src={
          photoURL
            ? photoURL
            : "https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png"
        }
      />
      <Status state={state} />
    </StatusUserContainer>
  )
}

export default StatusUserAtoms
