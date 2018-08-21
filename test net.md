# 测试网络简介

测试网络是GXChain的外部测试环境，参数与主链相同，开发者可以利用测试网络部署节点、申请见证人或对底层作出其他升级。

## 测试网络部署方法

测试网络种子节点：testnet.gxchain.org:6789 目前只有一个节点，社区开发者贡献节点可以加入测试网络，申请见证人。

钱包接入点：`wss://testnet.gxchain.org`

**访问[testnet网页钱包](https://testnet.wallet.gxchain.org/#/)  ```https://testnet.wallet.gxchain.org/#/``` 注册钱包帐户。
注册完成后，点击[这里](http://blockcity.mikecrm.com/2SVDb67) 申领测试GXS。**

### 1. 下载程序, 解压 {#1-下载程序-解压}

**首先请**[**点击这里**](https://github.com/gxchain/gxb-core/releases/latest)**下载最新程序, 解压**

```js
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_ubuntu_1.0.180809.beta.tar.gz -O gxb_ubuntu_1.0.180809.beta.tar.gz
# 解压程序
tar zxvf gxb_ubuntu_1.0.180809.beta.tar.gz
```

### 2. 下载testnet的genesis.json文件 {#2-下载testnet的genesisjson文件}

```
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/genesis/testnet-genesis.json -O genesis.json
```

### 3. 启动witness\_node，同步区块 {#3-启动witness_node同步区块}

```
./programs/witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" --seed-nodes='["testnet.gxchain.org:6789"]' --genesis-json genesis.json &
```

目前测试网络数据量不大，可以跑全节点。通过后台日志文件testnet\_node/logs/witness.log可查看区块同步进度。 
区块同步完成后，可以运行命令行钱包cli\_wallet。

### 4. 运行命令行钱包cli\_wallet {#4-运行命令行钱包cli_wallet}

```
./programs/cli_wallet/cli_wallet -sws://127.0.0.1:28090  -r 127.0.0.1:8091 --data-dir=testnet_node --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```



