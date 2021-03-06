import firebase from "firebase/app"
import "firebase/firestore"

export class RoomModel {
  constructor(
    readonly videoId: Array<string>,
    readonly playNow: number,
    readonly privateRoom: boolean,
    readonly play: boolean,
    readonly password: string,
    readonly hostId: string,
    readonly currentTime: number,
    readonly listCnt: number,
    readonly roomName: string,
    readonly createdAt: firebase.firestore.FieldValue,
    readonly updatedAt: firebase.firestore.FieldValue
  ) {}
}

export const roomConverter = {
  toFirestore(post: RoomModel): firebase.firestore.DocumentData {
    return {
      videoId: post.videoId,
      playNow: post.playNow,
      privateRoom: post.privateRoom,
      play: post.play,
      password: post.password,
      hostId: post.hostId,
      currentTime: post.currentTime,
      listCnt: post.listCnt,
      roomName: post.roomName,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): RoomModel {
    const data = snapshot.data(options)!
    return new RoomModel(
      data.videoId,
      data.playNow,
      data.privateRoom,
      data.play,
      data.password,
      data.hostId,
      data.currentTime,
      data.listCnt,
      data.roomName,
      data.createdAt,
      data.updatedAt
    )
  },
}
