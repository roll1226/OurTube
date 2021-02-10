import { Timestamp } from "@google-cloud/firestore"
import firebase from "firebase/app"
import "firebase/firestore"

export class ChangeUser {
  constructor(
    readonly createdAt: Timestamp,
    readonly userListCnt: number,
    readonly updatedAt: Timestamp,
    readonly users: Array<string>
  ) {}
}

export const changeUserConverter = {
  toFirestore(post: ChangeUser): firebase.firestore.DocumentData {
    return {
      createdAt: post.createdAt,
      userListCnt: post.userListCnt,
      updatedAt: post.updatedAt,
      users: post.users,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ChangeUser {
    const data = snapshot.data(options)!
    return new ChangeUser(
      data.createdAt,
      data.userListCnt,
      data.updatedAt,
      data.users
    )
  },
}
