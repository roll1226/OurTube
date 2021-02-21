import firebase from "firebase/app"
import "firebase/firestore"

export class JoinFlagModel {
  constructor(
    readonly createdAt: firebase.firestore.FieldValue,
    readonly uid: string
  ) {}
}

export const joinFlagConverter = {
  toFirestore(post: JoinFlagModel): firebase.firestore.DocumentData {
    return {
      createdAt: post.createdAt,
      uid: post.uid,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): JoinFlagModel {
    const data = snapshot.data(options)!
    return new JoinFlagModel(data.createdAt, data.uid)
  },
}
