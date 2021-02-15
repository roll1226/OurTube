export default class DotEnv {
  /**
   * firebaseのconfig
   */
  public getFirebaseConfig = () => {
    return {
      apiKey: process.env.FIREBASE_API_KEY as string,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
      databaseURL: process.env.FIREBASE_DATABASE_URL as string,
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
      appId: process.env.FIREBASE_APP_ID as string,
    }
  }

  public getYouTubeApi = (): string => {
    return process.env.YOU_TUBE_API_KEY as string
  }
}

export const env = new DotEnv()
