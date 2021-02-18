import * as functions from "firebase-functions"
import * as express from "express"
import * as admin from "firebase-admin"
import * as cors from "cors"

admin.initializeApp(functions.config().firebase)

// access
const fireStore = admin.firestore()

// timestamp
const timestamp = admin.firestore.FieldValue.serverTimestamp()

// express
const app: express.Express = express()
app.use(cors())

app.post("/api/creatRoom", async (req, res) => {
  try {
    const videoId = req.body.data.videoId
    const uid = req.body.data.uid
    const password = req.body.data.password
    const isPrivateRoom = req.body.data.isPrivateRoom

    const livesStore = fireStore.collection("lives")

    const liveRoom = await livesStore.add({
      currentTime: 0,
      hostId: uid,
      listCnt: 1,
      password: isPrivateRoom ? password : "",
      privateRoom: isPrivateRoom,
      play: false,
      playNow: 0,
      videoId: [videoId],
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    const roomId = liveRoom.id

    await livesStore.doc(roomId).collection("changeUsers").add({
      name: "",
      createdAt: timestamp,
    })

    res.status(200)
    res.json({
      result: {
        text: "create youTube list collection",
        roomId,
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

exports.onUserStatusChanged = functions
  .region("asia-northeast1")
  .database.ref("{roomId}/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val()

    const userStatusFirestoreRef = fireStore.collection(
      `${context.params.roomId}/status/${context.params.uid}`
    )

    const statusSnapshot = await change.after.ref.once("value")
    const status = statusSnapshot.val()

    if (status.last_changed > eventStatus.last_changed) {
      return null
    }

    eventStatus.last_changed = new Date(eventStatus.last_changed)

    return userStatusFirestoreRef.add(eventStatus)
  })

export const apiService = functions.https.onRequest(app)
