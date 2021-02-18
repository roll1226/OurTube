import firebase from "firebase/app"
import "firebase/firestore"

export class JoinFlag {
  constructor(
    readonly createdAt: firebase.firestore.FieldValue,
    readonly uid: string
  ) {}
}

export const joinFlagConverter = {
  toFirestore(post: JoinFlag): firebase.firestore.DocumentData {
    return {
      createdAt: post.createdAt,
      uid: post.uid,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): JoinFlag {
    const data = snapshot.data(options)!
    return new JoinFlag(data.createdAt, data.uid)
  },
}
