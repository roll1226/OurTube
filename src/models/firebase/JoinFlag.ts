import { Timestamp } from "@google-cloud/firestore"
import firebase from "firebase/app"
import "firebase/firestore"

export class JoinFlag {
  constructor(
    readonly createdAt: Timestamp,
    readonly flagCnt: number,
    readonly updatedAt: Timestamp
  ) {}
}

export const joinFlagConverter = {
  toFirestore(post: JoinFlag): firebase.firestore.DocumentData {
    return {
      createdAt: post.createdAt,
      flagCnt: post.flagCnt,
      updatedAt: post.updatedAt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): JoinFlag {
    const data = snapshot.data(options)!
    return new JoinFlag(data.createdAt, data.flagCnt, data.updatedAt)
  },
}
