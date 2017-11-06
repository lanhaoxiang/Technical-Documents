# 环境安装 {#环境安装}

GXB-Box基于Nodejs开发，执行环境需要安装Nodejs6.0以上版本（非源码编译方式请使用v6.\*.\*版本）



## 检查是否已安装 {#检查是否已安装}

命令行下执行下方命令，可以查看当前是否已安装Node以及当前安装的版本

```
node -v
```

## ![](/assets/node-version.png) {#nodejs安装}

## Nodejs安装 {#nodejs安装}

**Mac，Linux**环境下建议使用[NVM](https://github.com/creationix/nvm)\(Node Version Manager\)进行安装：

通过nvm可以快速安装`nvm install <version>`和切换`nvm use <version>`不同的Node版本

**Windows**系统请在[官方](https://nodejs.org/)下载一键安装包：

| 系统 | 下载地址 |
| :--- | :--- |
| 32位 | [https://nodejs.org/dist/v6.11.1/node-v6.11.1-x86.msi](https://nodejs.org/dist/v6.11.1/node-v6.11.1-x86.msi) |
| 64位 | [https://nodejs.org/dist/v6.11.1/node-v6.11.1-x64.msi](https://nodejs.org/dist/v6.11.1/node-v6.11.1-x64.msi) |

## 依赖安装

调试模式依赖于babel-node, 在克隆的工程下执行以下命令安装依赖:

```
npm install -g babel-node
npm install

```

## 开发模式启动

```
npm start

```

## 部署和生产环境启动

```
npm run build
npm run server

```

## 



