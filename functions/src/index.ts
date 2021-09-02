import * as functions from "firebase-functions"
import * as express from "express"
import * as admin from "firebase-admin"
import * as cors from "cors"
import { Base64 } from "js-base64"

admin.initializeApp(functions.config().firebase)

// access
const fireStore = admin.firestore()

// timestamp
const timestamp = admin.firestore.FieldValue.serverTimestamp()

// batch
// const batch = admin.firestore().batch()

// express
const app: express.Express = express()
app.use(cors())

// ルーム作成
app.post("/api/creatRoom", async (req, res) => {
  try {
    const roomName = req.body.data.roomName
    const uid = req.body.data.uid
    const password = req.body.data.password
    const isPrivateRoom = req.body.data.isPrivateRoom

    const livesStore = fireStore.collection("rooms")

    const liveRoom = await livesStore.add({
      currentTime: 0,
      hostId: uid,
      listCnt: 0,
      password: isPrivateRoom && password ? password : "",
      privateRoom: password ? isPrivateRoom : false,
      play: false,
      playNow: 0,
      videoId: [],
      roomName,
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    const roomId = liveRoom.id

    await livesStore
      .doc(roomId)
      .collection("changeUsers")
      .doc("changeDoc")
      .set({
        name: "",
        count: 0,
        type: "changeField",
        createdAt: timestamp,
      })

    await fireStore
      .collection("users")
      .doc(uid)
      .update({
        joinedRooms: admin.firestore.FieldValue.arrayUnion(roomId),
      })

    // await batch.commit()

    res.status(200)
    res.json({
      result: {
        text: "create youTube list collection",
        roomId,
        password: isPrivateRoom && password ? Base64.encode(password) : "",
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

// ルームにいるユーザのSignIn状態を監視
exports.onUserStatusChanged = functions
  .region("asia-northeast1")
  .database.ref("/rooms/{roomId}/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val()

    const userStatusFireStoreRef = fireStore
      .collection("rooms")
      .doc(context.params.roomId)
      .collection("status")
      .doc(context.params.uid)

    const statusSnapshot = await change.after.ref.once("value")
    const status = statusSnapshot.val()

    if (status.lastChanged > eventStatus.lastChanged) {
      return null
    }

    eventStatus.lastChanged = timestamp

    return userStatusFireStoreRef.set(eventStatus)
  })

export const apiService = functions.https.onRequest(app)
