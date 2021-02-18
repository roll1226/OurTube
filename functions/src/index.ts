import * as functions from "firebase-functions"
import * as express from "express"
import * as admin from "firebase-admin"
import * as cors from "cors"
import * as request from "request"
import * as cheerio from "cheerio"

const youTubeUrl = "https://youtu.be/"

admin.initializeApp(functions.config().firebase)

// access
const fireStore = admin.firestore()

// express
const app: express.Express = express()
app.use(cors())

// const router: express.Router = express.Router()
// app.use(router)

app.post("/api/creatRoom", (req, res) => {
  try {
    const videoId = req.body.data.videoId
    const uid = req.body.data.uid
    const password = req.body.data.password
    const isPrivateRoom = req.body.data.isPrivateRoom
    const youTubeVideoUrl = `${youTubeUrl}${videoId}`

    request(youTubeVideoUrl, async (e, resHtml, html) => {
      if (e) {
        console.error(e)
      }
      try {
        const $ = cheerio.load(html)

        const youTubeImage = $("meta[property='og:image']").attr("content")
        const youTubeTitle = $("meta[property='og:title']").attr("content")

        const timeStamp = admin.firestore.FieldValue.serverTimestamp()

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
          createdAt: timeStamp,
          updatedAt: timeStamp,
        })

        const roomId = liveRoom.id

        await livesStore.doc(roomId).collection("changeUsers").add({
          name: "",
          createdAt: timeStamp,
        })

        // await livesStore.doc(roomId).collection("joinFlag").add({
        //   createdAt: timeStamp,
        // })

        await livesStore
          .doc(roomId)
          .collection("youTubeList")
          .doc(videoId)
          .set({
            title: youTubeTitle,
            image: youTubeImage,
            createdAt: timeStamp,
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
            roomId: "",
            status: 500,
          },
        })
      }
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

app.post("/api/getYouTubeTitle", (req, res) => {
  try {
    const videoId = req.body.data.videoId
    const youTubeVideoUrl = `${youTubeUrl}${videoId}`

    request(youTubeVideoUrl, async (e, resHtml, html) => {
      if (e) {
        console.error(e)
      }
      try {
        const $ = cheerio.load(html)

        // const youTubeImage = $("meta[property='og:image']").attr("content")
        const youTubeTitle = $("meta[property='og:title']").attr("content")

        res.status(200)
        res.json({
          result: {
            text: "create youTube list collection",
            // youTubeImage,
            youTubeTitle,
            status: 200,
          },
        })
      } catch (error) {
        res.status(500)
        res.json({
          result: {
            text: error,
            youTubeTitle: "",
            // youTubeImage: "",
            status: 500,
          },
        })
      }
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

app.post("/api/addYouTubeUrl", (req, res) => {
  try {
    const videoId = req.body.data.videoId
    const roomId = req.body.data.roomId
    const youTubeVideoUrl = `${youTubeUrl}${videoId}`

    request(youTubeVideoUrl, async (e, resHtml, html) => {
      if (e) {
        console.error(e)
      }
      try {
        const $ = cheerio.load(html)

        const youTubeImage = $("meta[property='og:image']").attr("content")
        const youTubeTitle = $("meta[property='og:title']").attr("content")

        const timeStamp = admin.firestore.FieldValue.serverTimestamp()

        const livesStore = fireStore.collection("lives")

        await livesStore
          .doc(roomId)
          .collection("youTubeList")
          .doc(videoId)
          .set({
            title: youTubeTitle,
            image: youTubeImage,
            createdAt: timeStamp,
          })

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

export const apiService = functions.https.onRequest(app)
