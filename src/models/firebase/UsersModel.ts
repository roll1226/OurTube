import firebase from "firebase/app"
import "firebase/firestore"
import { Timestamp } from "@google-cloud/firestore"

export class UserModel {
  constructor(
    readonly name: string,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp
  ) {}
}

export const UserConverter = {
  toFirestore(post: UserModel): firebase.firestore.DocumentData {
    return {
      name: post.name,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): UserModel {
    const data = snapshot.data(options)!
    return new UserModel(data.name, data.createdAt, data.updatedAt)
  },
}
