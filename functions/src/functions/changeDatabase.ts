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
app.post("/changeDatabase", async (req, res) => {
  try {
    const roomsRef = fireStore.collection("rooms")
    const rooms = await roomsRef.get()

    for (let index = 0; index < rooms.size; index++) {
      const roomId = rooms.docs[index].id

      const newChangeUserRef = roomsRef
        .doc(roomId)
        .collection("changeUsers")
        .doc("changeDoc")
      batch.set(newChangeUserRef, {
        name: "",
        count: 0,
        type: "changeField",
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      // const changeUsers = await roomsRef
      //   .doc(roomId)
      //   .collection("changeUsers")
      //   .get()

      // for (let index = 0; index < changeUsers.size; index++) {
      //   const changeUserRef = roomsRef
      //     .doc(roomId)
      //     .collection("changeUsers")
      //     .doc(changeUsers.docs[index].id)
      //   batch.delete(changeUserRef)
      // }
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
