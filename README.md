<h1 align="center">
  <br />
  <img src="https://user-images.githubusercontent.com/47688057/108629834-1e32be80-74a5-11eb-945a-82dd7486139a.png" alt="OurTube" width="600">
</h1>

## OurTubeとは
YouTube上にある動画を複数人で共有しながら、コメントをしあえるサービス。

## インストール
```zsh
$ yarn
```

## 起動方法
起動する際は```.env```ファイルを作成してから起動してください
```.env
FIREBASE_API_KEY=""
FIREBASE_AUTH_DOMAIN=""
FIREBASE_DATABASE_URL=""
FIREBASE_PROJECT_ID=""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_MESSAGING_SENDER_ID=""
FIREBASE_APP_ID = ""
YOU_TUBE_API_KEY=""
```

作成後、下記のコマンドで起動する
```zsh
$ make dev
```
