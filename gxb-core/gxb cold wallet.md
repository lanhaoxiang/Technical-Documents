# GXB冷钱包离线签名 {#【教程】gxb冷钱包离线签名}

##### 冷钱包是实现冷存储\(Cold storage\)的一种方式, 是指用户在钱包离线的状态下生成私钥, 并将其妥善保存起来。由于这个离线生成的私钥永远不会在其他在线终端或者网络上出现, 所以不会被黑客发现或盗走。冷存储的关键是100％确保你冷存储的私钥不会出现在网络或者在线电脑上等, 所以一定保证该钱包始终处于离线模式并和热钱包\(hot wallet\)分离使用，通过离线签名的方式来完成安全交易。 {#冷钱包是实现冷存储cold-storage的一种方式-是指用户在钱包离线的状态下生成私钥-并将其妥善保存起来。由于这个离线生成的私钥永远不会在其他在线终端或者网络上出现-所以不会被黑客发现或盗走。冷存储的关键是100％确保你冷存储的私钥不会出现在网络或者在线电脑上等-所以一定保证该钱包始终处于离线模式并和热钱包hot-wallet分离使用，通过离线签名的方式来完成安全交易。}

---

## 简要步骤：

1. 在离线机器，启动witness\_node及cli\_wallet，在cli\_wallet端使用suggest\_brain\_key命令离线生成密钥对;
2. 使用轻钱包\(light\_wallet\)修改帐户的活跃权限公钥，移除原来的公钥，添加上述生成的公钥，则私钥离线存储，账户进入冷存状态；

3. 需要动用冷存账户时，启动离线机器，生成一个转帐操作的广播消息体;

4. 在一台在线节点启动witness\_node，将上述转帐的广播消息体广播到网络。

## 详细步骤：

##### 1）准备工作 {#1）准备工作}

* 两台机器\(一台作为离线机器，一台作为在线机器\)，安装并启动witness\_node及cli\_wallet，且均同步区块到本地，保证所用的账户在链上

##### 2）启动命令： {#2）启动命令：}

witness\_node启 动 命 令 ， 后 台 启 动 :

```
./programs/witness_node/witness_node --data-dir=trusted_node \
--rpc-endpoint=127.0.0.1:28090 --p2p-endpoint=0.0.0.0:6789 --log-file &
```

cli\_wallet启动命令：

```
./programs/cli_wallet/cli_wallet -s ws://127.0.0.1:28090 --enable-rpc-log -r 127.0.0.1:8091 \
--data-dir=trusted_node
```

##### 3）离线生成密钥对 {#3）离线生成密钥对}

使用离线的机器，启动witness\_node和cli\_wallet，并在cli\_wallet端输入suggest\_brain\_key命令\(前提钱包已经解锁\)，离线生成密钥对。

```
unlocked >>> suggest_brain_key 
{
 "brain_priv_key": "SWOM RECAP DOOM EGERAN ELEMENT DUBASH GIRLISH SIBBER 
  COIGN KISMET MOTHY CHIRK BOUN SAGGY HIDLING NATTY",
 "wif_priv_key": "5KFSF8nfh3GfmBC55cmkhJ3pU4PeGxyXuAKAfNyztfvnuyeJBqz",
 "pub_key": "GXC6AFW7aD9d3kH3AXo3HwJZdQE5zVVMsoewvGVEpgQTqyZT37Xct" 
}
```

##### 4）通过gxb-light轻钱包，修改帐户活跃权限公钥 {#4）通过gxb-light轻钱包，修改帐户活跃权限公钥}

1. 首先将冷钱包帐户私钥导入轻钱包，然后点击"帐户"-“权限”-"活跃权限"；

2. 添加“3）”生成的pub\_key，权重为1，同时移除原来的公钥，保存修改\(需要手续费1GXC，交易所对接时需要GXC资产\)。 修改公钥后，私钥在离线机器存储，帐户进入冷存状态。

##### 5）动用冷存账户转账 {#5）动用冷存账户转账}

启动离线机器的witness\_node和cli\_wallet， 导入帐户私钥\(以下命令均在cli\_wallet中执行\):

```
unlock >>> import_key <account_name> <wif_priv_key> true
```

开始生成广播结构:

1）开始构建转发结构：

```
例：
unlocked >>> begin_builder_transaction
0
```

2）生成交易 结 构 体 操 作 \( 此 处 为 转 账 操 作 \) :

```
add_operation_to_builder_transaction $HANDLE <operation>

备注:$HANDLE 为 begin_builder_transaction 接口的返回值，以下均相同<operation>为操作的报文
<operation>详解
[                                              //固定格式，无需改变  
 0,{                                           //固定格式，无需改变
  "fee": {                                     //固定格式，无需改变
   "amount": 0,                                //固定格式，无需改变
   "asset_id": "1.3.0"                         //资产类型，1.3.0为"GXC",1.3.1为"GXS"
  },                                           //固定格式，无需改变
  "from": "1.2.17",                            //转账的源帐户 id(此处为 1.2.17)
  "to": "1.2.18",                              //转账的源帐户 id(此处为 1.2.18)
  "amount": {                                  //固定格式，无需改变
   "amount": 0,                                //固定格式，无需改变
   "asset_id": "1.3.0"                         //资产类型，1.3.0为"GXC",1.3.1为"GXS"
  },                                           //固定格式，无需改变
  "extensions": []                             //固定格式，无需改变
 }                                             //固定格式，无需改变
]                                              //固定格式，无需改变
```

```
例：
unlocked >>> add_operation_to_builder_transaction 0 [0,{"fee": { "amount": 0,"asset_id": "1.3.0"},\
"from": "1.2.17","to": "1.2.18","amount": {"amount": 10,"asset_id": "1.3.0"},"extensions": []}]
null
```
<operation>的报文格式可以根据get_prototype_operation接口获取，如下所示：

```
unlocked >>> get_prototype_operation transfer_operation
[
  0,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "from": "1.2.0",
    "to": "1.2.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```


3）设置操作手续费：

```
set_fees_on_builder_transaction $HANDLE $GRAPHENE_SYMBOL
备注：$GRAPHENE_SYMBOL必须为"GXS"
```

```
unlocked >>> set_fees_on_builder_transaction 0 GXS
{
  "amount": 10000,
  "asset_id": "1.3.1"
}
```

4）预览交易：

```
preview_builder_transaction $HANDLE
```

```
例：
unlocked >>> preview_builder_transaction 0
{
  "ref_block_num": 0,
  "ref_block_prefix": 0,
  "expiration": "1970-01-01T00:00:00",
  "operations": [[
      0,{
        "fee": {
          "amount": 10000,
          "asset_id": "1.3.1"
        },
        "from": "1.2.17",
        "to": "1.2.18",
        "amount": {
          "amount": 10,
          "asset_id": "1.3.0"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": []
}
```

5）生成签名的交易：

```
sign_builder_transaction $HANDLE false
```

```
例：
unlocked >>> sign_builder_transaction 0 false
{
  "ref_block_num": 25199,
  "ref_block_prefix": 2900862013,
  "expiration": "2017-09-01T08:11:54",
  "operations": [[
      0,{
        "fee": {
          "amount": 10000,
          "asset_id": "1.3.1"
        },
        "from": "1.2.17",
        "to": "1.2.18",
        "amount": {
          "amount": 10,
          "asset_id": "1.3.0"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "2029ea9756641bf955abacc1f29dc08af8e66690740bc161dcfe379da477c7df4b76d7c839f92fc7e5c72e2b91d9db698168439216df9e1a0a1773640b049bbf7c"
  ]
}
```

6）启动在线的机器的witness\_node和cli\_wallet， 然后将上一步生成的报文复制到此机器中:

```
broadcast_transaction $tx
```

```
例：
locked >>> broadcast_transaction {"ref_block_num": 25199,"ref_block_prefix": 2900862013,"expiration": \
"2017-09-01T08:11:54","operations": [[0,{"fee": {"amount": 10000,"asset_id": "1.3.1"},"from": "1.2.17",\
"to": "1.2.18", "amount": {"amount": 10,"asset_id": "1.3.0"},"extensions": []}]],"extensions": \
[],"signatures":["2029ea9756641bf955abacc1f29dc08af8e66690740bc161dcfe379da477c7df4b76d7c839f92fc7e5c72e2b91d9db698168439216df9e1a0a1773640b049bbf7c"]}
{
  "ref_block_num": 25483,
  "ref_block_prefix": 3857887445,
  "expiration": "2017-09-01T08:26:15",
  "operations": [[
      0,{
        "fee": {
          "amount": 10000,
          "asset_id": "1.3.1"
        },
        "from": "1.2.17",
        "to": "1.2.18",
        "amount": {
          "amount": 10,
          "asset_id": "1.3.0"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "2029ea9756641bf955abacc1f29dc08af8e66690740bc161dcfe379da477c7df4b76d7c839f92fc7e5c72e2b91d9db698168439216df9e1a0a1773640b049bbf7c"
  ]
}
```



