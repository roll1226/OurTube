import { Timestamp } from "@google-cloud/firestore"
import firebase from "firebase/app"
import "firebase/firestore"

export class ChangeUser {
  constructor(
    readonly name: string,
    readonly createdAt: Timestamp,
    readonly changeCnt: number,
    readonly updatedAt: Timestamp
  ) {}
}

export const changeUserConverter = {
  toFirestore(post: ChangeUser): firebase.firestore.DocumentData {
    return {
      name: post.name,
      createdAt: post.createdAt,
      changeCnt: post.changeCnt,
      updatedAt: post.updatedAt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ChangeUser {
    const data = snapshot.data(options)!
    return new ChangeUser(
      data.name,
      data.createdAt,
      data.changeCnt,
      data.updatedAt
    )
  },
}
