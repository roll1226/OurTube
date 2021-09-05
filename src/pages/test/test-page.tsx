import { useEffect } from "react"
import LoggerUtil from "../../utils/debugger/LoggerUtil"
import axios from "axios"

const TestPage = () => {
  useEffect(() => {
    const test = async () => {
      const res = await axios.get(
        "https://noembed.com/embed?url=https://www.youtube.com/watch?v=dy90tA3TT1c"
      )

      LoggerUtil.debug(res.data)
    }

    test()
  }, [])

  return <div></div>
}

export default TestPage
