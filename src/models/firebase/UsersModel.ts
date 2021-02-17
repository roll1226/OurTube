import firebase from "firebase/app"
import "firebase/firestore"

export class UserModel {
  constructor(
    readonly name: string,
    readonly createdAt: firebase.firestore.FieldValue,
    readonly updatedAt: firebase.firestore.FieldValue
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
