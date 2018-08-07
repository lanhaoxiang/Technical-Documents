# インストレーション環境 {#インストレーション環境}

GXB-BoxはNodejsに基づいて開発しました。実行環境はNodejs6.0以上のバージョンが必要です（ノンソースコンパイル方式はv6.\*.\*バージョンをお使いください）

## インストール済の確認 {#インストール済の確認}

下記のコマンドを実行すると、Nodeのインストール状況とバージョンの確認ができます

```
node -v
```

## Nodejsインストレーション {#nodejsインストレーション}

**Mac，Linux**環境では[NVM](https://github.com/creationix/nvm)\(Node Version Manager\)を利用するインストレーションがおすすめです：

nvmを用いて`nvm install <version>`インストレーションと`nvm use <version>`バージョンの切り替えが迅速に行えます

**Windows**OSは[HP](https://nodejs.org/)からダウンロードしてください：

| OS | ダウンロードアドレス |
| :--- | :--- |
| 32位 | [https://nodejs.org/dist/v6.11.1/node-v6.11.1-x86.msi](https://nodejs.org/dist/v6.11.1/node-v6.11.1-x86.msi) |
| 64位 | [https://nodejs.org/dist/v6.11.1/node-v6.11.1-x64.msi](https://nodejs.org/dist/v6.11.1/node-v6.11.1-x64.msi) |

## independents

調整モードはbabel-nodeが必要、プロジェクトをClonした後に下記のコマンドでインストール:

```
npm install -g babel-node
npm install
```

## デベロップメントモードスタート

```
npm start
```

## Buildとサービスモードスタート

```
npm run build
npm run server
```

## 



