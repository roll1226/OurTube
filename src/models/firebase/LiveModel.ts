import firebase from "firebase/app"
import "firebase/firestore"

export class LiveModel {
  constructor(
    readonly videoId: string,
    readonly users: [],
    readonly privateRoom: boolean,
    readonly play: boolean,
    readonly password: string,
    readonly hostId: string,
    readonly currentTime: number
  ) {}
}

export const liveConverter = {
  toFirestore(post: LiveModel): firebase.firestore.DocumentData {
    return {
      videoId: post.videoId,
      user: post.users,
      privateRoom: post.privateRoom,
      play: post.videoId,
      password: post.users,
      hostId: post.hostId,
      currentTime: post.privateRoom,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): LiveModel {
    const data = snapshot.data(options)!
    return new LiveModel(
      data.videoId,
      data.users,
      data.privateRoom,
      data.play,
      data.password,
      data.hostId,
      data.currentTime
    )
  },
}
