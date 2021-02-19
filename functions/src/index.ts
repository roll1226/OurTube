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

// app.post("/api/deleteYouTubeListCnt", async (req, res) => {
//   const roomId = req.body.data.roomId

//   setTimeout(async () => {
//     const youTubeListCnt = fireStore
//       .collection("lives")
//       .doc(roomId)
//       .collection("youTubeListCnt")

//     const deleteDoc = await youTubeListCnt.get()

//     deleteDoc.forEach(async (doc) => {
//       await youTubeListCnt.doc(doc.id).delete()
//     })

//     res.status(200)
//     res.json({
//       result: {
//         text: "delete youTubeListCnt",
//         status: 200,
//       },
//     })
//   }, 1000)
// })

exports.onUserStatusChanged = functions
  .region("asia-northeast1")
  .database.ref("/lives/{roomId}/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val()

    const userStatusFireStoreRef = fireStore
      .collection("lives")
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

// export const onCreate = functions.firestore
//   .document("/lives/{roomId}/youTubeListCnt/{youTubeListCntId}")
//   .onCreate(async (snapshot, context) => {
//     // do anything
//     console.log(`user ${context.params.roomId} created.`)

//     const youTubeListCnt = fireStore
//       .collection("lives")
//       .doc(context.params.roomId)
//       .collection("youTubeListCnt")

//     const deleteDoc = await youTubeListCnt.get()

//     setTimeout(() => {
//       deleteDoc.forEach(async (doc) => {
//         doc.exists && youTubeListCnt.doc(doc.id).delete()
//       })
//     }, 3000)
//   })

export const apiService = functions.https.onRequest(app)
