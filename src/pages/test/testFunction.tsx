import FirebaseInitUtil from "../../utils/lib/FirebaseInitUtil"
import LoggerUtil from "../../utils/debugger/LoggerUtil"

const testFunction = () => {
  const test = async () => {
    const functions = FirebaseInitUtil.firebaseFunctions()
    const func = functions.httpsCallable("apiService/api/setYouTubeTitle")
    await func({
      videoId: "JyZHpUK9Bfc",
      roomId: "bzryiqkQPGT3WM6LUFgL",
    }).then((res) => {
      LoggerUtil.debug(res.data)
    })
  }
  return (
    <>
      <button onClick={test}>TestYouTube</button>
    </>
  )
}

export default testFunction
