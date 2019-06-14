# Fringe81インターン2019サマー Web React事前課題

## 起動のための手順

起動の手順は以下となります。
- `npm install`というコマンドをプロジェクトのルートディレクトリで実行し、必要なライブラリーをnode_modulesというフォルダーにインストールします。
- その後、ルートディレクトリのままで`npm start`を実行し、アプリを起動させます。
- [http://localhost:3000](http://localhost:3000) を開くと実行しているアプリがブラウザに表示されます。

## 自己採点

採点項目は以下に示します。
- [x] ヘッダーに初期状態で現在ユーザの名前/画像/拍手できるポイント:100/拍手されたポイント:0が表示される
- [x] 現在ユーザのアイコンの近辺でユーザを選択できるようになり、選択後ユーザが切り替わる
- [x] ヘッダーでユーザを切り替えた後は、そのユーザが持つポイントが正しく表示される(拍手後に確認)
- [x] 投稿欄のユーザアイコン近辺で褒めたいユーザを選択できる
- [x] テキストが５文字以下の場合、投稿ボタンはクリックできない
- [x] テキストが５文字以上であれば紹介が投稿される
- [x] 一覧に追加された紹介した/された人、テキスト、拍手数、投稿日時が正しく表示されている
- [x] 投稿一覧の内容はリロード後も情報は保持される
- [x] 投稿された人/投稿した人は拍手ができない
- [x] 拍手後は、拍手した人の拍手できるポイントが-2、紹介した/された人には拍手されたポイントが+1される
- [x] 拍手数のマウスおバーにより、拍手した人と拍手数が一覧表示される