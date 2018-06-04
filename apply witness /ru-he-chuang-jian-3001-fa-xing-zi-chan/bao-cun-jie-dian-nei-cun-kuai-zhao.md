### 保存witness\_node节点内存数据快照

下载最新版witness\_node程序，下载地址

| 阿里云 | [http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb\_1.0.180604.tar.gz](http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_1.0.180604.tar.gz) |
| :--- | :--- |


启动witness\_node程序, 在启动参数里指定区块高度和快照文件路径

```
./programs/witness_node/witness_node --data-dir=trusted_node \
--rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:6789" \
 --log-file --max-ops-per-account=0 --partial-operations=true \
 --data-transaction-lifetime=1 \
 --plugins snapshot \
 --snapshot-at-block 9623000 --snapshot-to snapshot.0604.txt &
```

其中--snapshot-at-block 9623000指定区块高度，即在此区块高度时，保存快照； --snapshot-to snapshot.0604.txt指定了快照文件，保存在当前目录下\(也可以使用绝对路径\)

快照文件中将保存所有的内存数据对象，按行保存，每一行为一个json。

