# 测试网络简介

测试网络是GXChain的外部测试环境，参数与主链相同，开发者可以利用测试网络部署节点、申请见证人或对底层作出其他升级。

## 测试网络部署方法

测试网络种子节点：106.14.180.117:9999 目前只有一个节点，社区开发者贡献节点可以加入测试网络，申请见证人。

钱包接入点：[ws://106.14.180.117:28090](ws://106.14.180.117:28090) GXS资产发行在dev帐户，私钥：5JjPBNh2LEhrbeZ4uvjkJJduKjUwDAKNcopUSUpm3QpL4AgNQNJ

### 1. 下载程序, 解压 {#1-下载程序-解压}

```
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_1.0.171116.tar.gz -O gxb_1.0.171116.tar.gz
tar zxvf gxb_1.0.171116.tar.gz
```

### 2. 下载testnet的genesis.json文件 {#2-下载testnet的genesisjson文件}

```
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/genesis/testnet-genesis.json -O genesis.json
```

### 3. 启动witness\_node，同步区块 {#3-启动witness_node同步区块}

```
./programs/witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" --seed-nodes='["106.14.180.117:9999"]' --genesis-json genesis.json --log-file &
```

各选项的含义如下：

```
# 指定数据及配置文件存储的目录
--data-dir=testnet_node

# 指定rpc服务侦听地址及端口(端口可修改)，127.0.0.1限定本地访问rpc服务，若不限定本地访问，可指定0.0.0.0
--rpc-endpoint=127.0.0.1:28090

# 用于连接p2p网络，此参数不建议修改
--p2p-endpoint=0.0.0.0:9999

# 连接测试网络的种子节点
--seed-nodes='["124.127.116.135:9999"]'

# 输出日志文件，若无此参数，日志输出到控制台
--log-file 

# 内存中只跟踪指定帐户的交易历史，该选项可传入多次，跟踪多个帐户。请将1.2.2999 替换成交易所的账户数字 ID（在轻钱包账户页面里，账号头像下面会显示一个数字）
--track-account "\"1.2.2999\"" 

# 每个账户在内存中最多保存NUM条交易记录，默认是全部
--max-ops-per-account=NUM 

# 和--track-account / --max-ops-per-account 选项结合，可以进一步节省内存，建议带上此参数
--partial-operations=true 

& 表示程序后台运行

# 重放所有已下载的区块并重建索引，比较耗时
--replay-blockchain

# 删除所有已下载数据，重新同步区块
--resync-blockchain
```

目前测试网络数据量不大，可以跑全节点。通过后台日志文件trusted\_node/logs/witness.log可查看区块同步进度。 区块同步完成后，可以运行命令行钱包cli\_wallet。

### 4. 运行命令行钱包cli\_wallet {#4-运行命令行钱包cli_wallet}

```
./programs/cli_wallet/cli_wallet -s ws://127.0.0.1:28090 \
--enable-rpc-log -r 127.0.0.1:8091 --data-dir=testnet_node
```

**如需额外注册钱包，请进入GXS Community**

**Https://forum.gxb.io**

**私信联系管理员@admin，提供公钥和账户名。团队将帮你注册账户和发放一定量的GXS用作测试。**

