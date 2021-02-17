import firebase from "firebase/app"
import "firebase/firestore"

export class ChatModel {
  constructor(
    readonly comment: string,
    readonly name: string,
    readonly uid: string,
    readonly createdAt: firebase.firestore.FieldValue
  ) {}
}

export const chatConverter = {
  toFirestore(post: ChatModel): firebase.firestore.DocumentData {
    return {
      comment: post.comment,
      name: post.name,
      uid: post.uid,
      createdAt: post.createdAt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ChatModel {
    const data = snapshot.data(options)!
    return new ChatModel(data.comment, data.name, data.uid, data.createdAt)
  },
}
