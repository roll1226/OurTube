import firebase from "firebase/app"
import "firebase/firestore"

export class ChangeUser {
  constructor(
    readonly name: string,
    readonly count: number,
    readonly type: "changeField",
    readonly createdAt: firebase.firestore.FieldValue
  ) {}
}

export const changeUserConverter = {
  toFirestore(post: ChangeUser): firebase.firestore.DocumentData {
    return {
      name: post.name,
      count: post.count,
      type: post.type,
      createdAt: post.createdAt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ChangeUser {
    const data = snapshot.data(options)!
    return new ChangeUser(data.name, data.count, data.type, data.createdAt)
  },
}
