import * as admin from "firebase-admin"
admin.initializeApp()

const funcs = {
  apiService: "./functions/createRoom",
  onUserStatusChanged: "./functions/changeStatus",
}

const loadFunction = (funcsObj: { [key: string]: string }) => {
  for (let name in funcsObj) {
    if (
      !process.env.FUNCTION_NAME ||
      process.env.FUNCTION_NAME.startsWith(name)
    ) {
      exports[name] = require(funcsObj[name])
    }
  }
}

loadFunction(funcs)
