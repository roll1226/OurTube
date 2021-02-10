import firebase from "firebase/app"
import "firebase/firestore"
import { Timestamp } from "@google-cloud/firestore"

export class LiveModel {
  constructor(
    readonly videoId: Array<string>,
    readonly playNow: number,
    readonly privateRoom: boolean,
    readonly play: boolean,
    readonly password: string,
    readonly hostId: string,
    readonly currentTime: number,
    readonly listCnt: number,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp
  ) {}
}

export const liveConverter = {
  toFirestore(post: LiveModel): firebase.firestore.DocumentData {
    return {
      videoId: post.videoId,
      playNow: post.playNow,
      privateRoom: post.privateRoom,
      play: post.play,
      password: post.password,
      hostId: post.hostId,
      currentTime: post.currentTime,
      listCnt: post.listCnt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): LiveModel {
    const data = snapshot.data(options)!
    return new LiveModel(
      data.videoId,
      data.playNow,
      data.privateRoom,
      data.play,
      data.password,
      data.hostId,
      data.currentTime,
      data.listCnt,
      data.createdAt,
      data.updatedAt
    )
  },
}
