/* eslint-disable */
import * as functions from "firebase-functions"
import * as express from "express"
import * as admin from "firebase-admin"
import * as cors from "cors"

// access
const fireStore = admin.firestore()

// timestamp
// const timestamp = admin.firestore.FieldValue.serverTimestamp()

// batch
let batch = admin.firestore().batch()

// express
const app: express.Express = express()
app.use(cors())

// ルーム作成
app.post("/changeDatabase", async (req, res) => {
  try {
    const roomsRef = fireStore.collection("rooms")
    const rooms = await roomsRef.get()

    for (let index = 0; index < rooms.size; index++) {
      const roomId = rooms.docs[index].id

      const statusRef = roomsRef.doc(roomId).collection("status")
      const status = await statusRef.get()
      for (let index = 0; index < status.size; index++) {
        if ((index + 1) % 500 === 0) {
          batch.commit()
          batch = admin.firestore().batch()
        }

        const statusId = status.docs[index].id
        const newStatusRef = statusRef.doc(statusId)
        batch.set(
          newStatusRef,
          {
            roomId,
          },
          { merge: true }
        )
      }
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
