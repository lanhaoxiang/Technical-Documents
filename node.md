# 如何部署公信链的节点

## 软硬件需求

使用 Ubuntu 14.04 LTS 64位系统， 机器内存 8GB+，50GB 硬盘。 不需要安装依赖包。

需要安装 NTP 服务：

```bash
sudo apt-get install ntp
```

### Linux系统

Ubuntu 14.04 LTS 64位系统，见证节点程序下载，选择其中一个下载即可。

| 平台 | 下载地址 |
| :--- | :--- |
|github| https://github.com/gxchain/gxb-core/releases/ (选择相应的版本即可)|
|阿里云| http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_1.0.171031.tar.gz |

### OS X系统
OS X系统运行，需要自主编译程序。点击[这里](/gxb-core.md)


## 公信链的安装方法

将见证节点程序解压到指定你的deploy目录即可。

### 启动见证节点

```bash
# 可以使用2个参数，节省内存： --track-account 和 --partial-operations=true
nohup ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint=127.0.0.1:28090 \
--p2p-endpoint=0.0.0.0:6789 --log-file --track-account "\"1.2.2999\""  --track-account "\"1.2.3000\"" \
--partial-operations=true >>witness.out 2>&1 &
```

可使用--help 来查看命令参数
witness_node启动参数：
```
# 指定数据及配置文件存储的目录
--data-dir=trusted_node

# 指定rpc服务侦听地址及端口(端口可修改)，127.0.0.1限定本地访问rpc服务，若不限定本地访问，可指定0.0.0.0
--rpc-endpoint=127.0.0.1:28090

# 用于连接p2p网络，此参数不建议修改
--p2p-endpoint=0.0.0.0:6789 

# 输出日志文件，若无此参数，日志输出到控制台
--log-file 

# 内存中只跟踪指定帐户的交易历史，该选项可传入多次，跟踪多个帐户。请将1.2.2999 替换成你需要跟踪的账户数字 ID（在轻钱包账户页面里，账号头像下面会显示一个数字）
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

完全同步区块，大约需要30分钟以上。通过后台日志文件trusted\_node/logs/witness.log可查看区块同步进度，访问[公信宝区块浏览器](https://block.gxb.io)查看最新区块。
待区块同步至最新，公信链节点即部署成功。
