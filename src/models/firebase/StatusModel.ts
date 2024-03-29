import firebase from "firebase/app"
import "firebase/firestore"

export class StatusModel {
  constructor(
    readonly state: "online" | "offline",
    readonly roomId: string,
    readonly photoURL: string,
    readonly displayName: string,
    readonly lastChanged: firebase.firestore.FieldValue
  ) {}
}

export const statusConverter = {
  toFirestore(post: StatusModel): firebase.firestore.DocumentData {
    return {
      state: post.state,
      roomId: post.roomId,
      photoURL: post.photoURL,
      displayName: post.displayName,
      lastChanged: post.lastChanged,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): StatusModel {
    const data = snapshot.data(options)!
    return new StatusModel(
      data.state,
      data.roomId,
      data.photoURL,
      data.displayName,
      data.lastChanged
    )
  },
}
