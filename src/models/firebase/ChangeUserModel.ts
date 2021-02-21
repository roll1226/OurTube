import firebase from "firebase/app"
import "firebase/firestore"

export class ChangeUser {
  constructor(
    readonly name: string,
    readonly createdAt: firebase.firestore.FieldValue,
    readonly changeCnt: number
  ) {}
}

export const changeUserConverter = {
  toFirestore(post: ChangeUser): firebase.firestore.DocumentData {
    return {
      name: post.name,
      createdAt: post.createdAt,
      changeCnt: post.changeCnt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ChangeUser {
    const data = snapshot.data(options)!
    return new ChangeUser(data.name, data.createdAt, data.changeCnt)
  },
}
