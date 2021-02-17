import firebase from "firebase/app"
import "firebase/firestore"

export class YouTubeListModel {
  constructor(
    readonly title: string,
    readonly image: string,
    readonly createdAt: firebase.firestore.FieldValue
  ) {}
}

export const youTubeListConverter = {
  toFirestore(post: YouTubeListModel): firebase.firestore.DocumentData {
    return {
      title: post.title,
      image: post.image,
      createdAt: post.createdAt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): YouTubeListModel {
    const data = snapshot.data(options)!
    return new YouTubeListModel(data.title, data.image, data.createdAt)
  },
}
