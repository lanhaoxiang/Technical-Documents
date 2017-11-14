# 公信链（GXChain）技术文档

## 公信链简介

公信链（GXChain）是一条公有链，是公信宝数据交易所的底层区块链，不仅支撑着公信宝的高频数据交易，还支持第三方开发应用，在公信链上开发应用不仅可以得到链上支持，还可以获得公信宝多维度数据的对接，可以做出非常落地于民生的有价值应用。

## **公信链节点介绍**

公信链节点主要包含witness_node和cli_wallet两部分。
witness_node 通过 P2P 方式连接到公信链网络，从网络接收最新区块，向网络广播本地签署的交易包。
cli_wallet 通过 websocket 方式连接到 witness_node， 管理钱包文件； 提供交易签名功能，签名后通过 witness_node 向外广播； 通过 http rpc 的方式提供 API 供其他程序调用。

## **公信链客户端下载**

公信链客户端下载地址， 目前只提供Ubuntu 14.04 LTS 64位系统的安装包， OS X系统需要自行编译。

选择其中一个下载即可。

| 平台 | 下载地址 |
| :--- | :--- |
|github| https://github.com/gxchain/gxb-core/releases/download/1.0.171031/gxb_1.0.171031.tar.gz |
|阿里云| http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_1.0.171031.tar.gz |

## 节点端口说明


进入gxb目录，启动公信宝见证节点witness\_node

```bash
# 可以使用2个参数，节省内存： --track-account 和 --partial-operations=true
nohup ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint=127.0.0.1:28090 \
--p2p-endpoint=0.0.0.0:6789 --log-file --track-account "\"1.2.2999\""  --track-account "\"1.2.3000\"" \
--partial-operations=true >>witness.out 2>&1 &
```

公信链端口种类及调用说明

| **端口类型** | **端口信息** |
| :---: | :---: |
|  |  |
|  |  |



