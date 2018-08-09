# 部署GXChain节点

## 公信链简介

公信链（GXChain）是一条公有链，是公信宝数据交易所的底层区块链，不仅支撑着公信宝的高频数据交易，还支持第三方开发应用，在公信链上开发应用不仅可以得到链上支持，还可以获得公信宝多维度数据的对接，可以做出非常落地于民生的有价值应用。

## **公信链节点介绍**

公信链节点主要包含witness\_node和cli\_wallet两部分。

witness\_node 通过 P2P 方式连接到公信链网络，从网络接收最新区块，向网络广播本地签署的交易包。

cli\_wallet 通过 websocket 方式连接到 witness\_node， 管理钱包文件； 提供交易签名功能，签名后通过 witness\_node 向外广播； 通过 http rpc 的方式提供 API 供其他程序调用。

## 软硬件需求

使用 Ubuntu 14.04 LTS 64位系统， 机器内存 8GB+，50GB 硬盘。 安装依赖包:

```bash
sudo apt-get install ntp software-properties-common
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install libstdc++-7-dev
```

### Linux系统

公信链程序目前只提供Ubuntu 14.04 LTS 64位系统的安装包，[点击这里](https://github.com/gxchain/gxb-core/releases/latest)下载最新程序。

## OS X系统

OS X系统运行，需要自主编译程序。点击[这里](/gxb-core.md)

## 公信链的安装方法

将见证节点程序解压到指定你的deploy目录即可。

### 启动见证节点

```bash
# 可以使用2个参数，节省内存： --track-account 和 --partial-operations=true
nohup ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint=127.0.0.1:28090 \
--p2p-endpoint=0.0.0.0:6789  --track-account "\"1.2.2999\"" >>witness.out 2>&1 &
```

可使用--help 来查看命令参数  
witness\_node启动参数：

```
# 指定数据及配置文件存储的目录
--data-dir=trusted_node

# 指定rpc服务侦听地址及端口(端口可修改)，127.0.0.1限定本地访问rpc服务，若不限定本地访问，可指定0.0.0.0
--rpc-endpoint=127.0.0.1:28090

# 用于连接p2p网络，此参数不建议修改
--p2p-endpoint=0.0.0.0:6789 

# 内存中只跟踪指定帐户的交易历史，该选项可传入多次，跟踪多个帐户。请将1.2.2999 替换成你需要跟踪的账户数字 ID（在轻钱包账户页面里，账号头像下面会显示一个数字）
--track-account "\"1.2.2999\"" 

```

完全同步区块，大约需要30分钟以上。通过后台日志文件trusted\_node/logs/witness.log可查看区块同步进度，访问[公信宝区块浏览器](https://block.gxb.io)查看最新区块。  
待区块同步至最新，公信链节点即部署成功。

