import firebase from "firebase/app"
import "firebase/firestore"

export class StatusModel {
  constructor(
    readonly state: "online" | "offline",
    readonly photoURL: string,
    readonly lastChanged: firebase.firestore.FieldValue
  ) {}
}

export const statusConverter = {
  toFirestore(post: StatusModel): firebase.firestore.DocumentData {
    return {
      state: post.state,
      photoURL: post.photoURL,
      lastChanged: post.lastChanged,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): StatusModel {
    const data = snapshot.data(options)!
    return new StatusModel(data.state, data.photoURL, data.lastChanged)
  },
}
