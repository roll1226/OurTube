/* eslint-disable */
import * as functions from "firebase-functions"
import * as express from "express"
import * as admin from "firebase-admin"
import * as cors from "cors"

// access
const fireStore = admin.firestore()

// timestamp
const timestamp = admin.firestore.FieldValue.serverTimestamp()

// batch
const batch = admin.firestore().batch()

// express
const app: express.Express = express()
app.use(cors())

// ルーム作成
app.post("/changeUser", async (req, res) => {
  try {
    const usersRef = fireStore.collection("users")
    const users = await usersRef.get()

    for (let index = 0; index < users.size; index++) {
      const userId = users.docs[index].id
      const userRef = usersRef.doc(userId)
      batch.set(
        userRef,
        {
          nowRoomId: "",
          updatedAt: timestamp,
        },
        { merge: true }
      )
    }

    await batch.commit()

    res.status(200)
    res.json({
      result: {
        text: "create youTube list collection",
        status: 200,
      },
    })
  } catch (error) {
    res.status(500)
    res.json({
      result: {
        text: error,
        status: 500,
      },
    })
  }
})

module.exports = functions.https.onRequest(app)
/* eslint-enable */
