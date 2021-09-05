/* eslint-disable */
import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

// access
const fireStore = admin.firestore()

// timestamp
const timestamp = admin.firestore.FieldValue.serverTimestamp()

// ルームにいるユーザのSignIn状態を監視
module.exports = functions
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
/* eslint-enable */
