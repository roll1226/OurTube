import firebase from "firebase/app"
import "firebase/firestore"

export class YouTubeListCntMode {
  constructor(
    readonly createdAt: firebase.firestore.FieldValue,
    readonly cnt: number
  ) {}
}

export const youTubeListCntConverter = {
  toFirestore(post: YouTubeListCntMode): firebase.firestore.DocumentData {
    return {
      createdAt: post.createdAt,
      cnt: post.cnt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): YouTubeListCntMode {
    const data = snapshot.data(options)!
    return new YouTubeListCntMode(data.createdAt, data.cnt)
  },
}
