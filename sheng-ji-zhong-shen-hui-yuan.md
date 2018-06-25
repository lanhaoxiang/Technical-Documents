## 升级帐户为终身会员

### 终身会员权益

1. 可以创建高级帐户名
2. 交易手续费80%返还
3. 推荐注册的帐户，其交易手续费80%返现给推荐人
4. 可以创建见证人

### 升级终身会员方法

升级终身会员，轻钱包目前没有提供入口，需要使用命令行版本钱包cli\_wallet来操作。

### 下载 cli\_wallet, 并解压缩

mac环境下，打开terminal执行如下操作：

```
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/cli_wallet.20180621.tar.gz -O  cli_wallet.20180621.tar.gz && tar zxvf cli_wallet.20180621.tar.gz
```

ubuntu环境最新的cli\_wallet下载，请访问[https://github.com/gxchain/gxb-core/releases/latest](https://github.com/gxchain/gxb-core/releases/latest)

```
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_1.0.180619a.tar.gz -O gxb_1.0.180619a.tar.gz && tar zxvf gxb_1.0.180619a.tar.gz
```

### 启动cli\_wallet, 连接到主网的node1钱包接入点

```
./programs/cli_wallet/cli_wallet -swss://node1.gxb.io -w wallet.json
```

初次启动，会打印如下的交互提示符：

```
new >>>
```

### 设置cli\_wallet密码

```
set_password "密码"
```

```
unlock "密码"
```

其中"密码"是一串字符，为你的本地钱包密码  
unlock成功后，交互提示符变为:`unlocked >>>`

如果交互提示符为`locked>>>` ,说明cli\_wallet处于锁定状态，需要执行`unlock "密码"` 来解锁

### 导入帐户私钥

cli\_wallet在unlocked状态时，导入公信宝钱包帐户的私钥

```
import_key 帐户名 私钥
```

导入成功，会打印true

### 升级会员

`upgrade_account 帐户名 GXS true`

其中GXS表示使用GXS支付手续费，true表示发起交易广播。如果帐户余额充足，执行成功后，会打印一段消息体：

```
{
  "ref_block_num": 51719,
  "ref_block_prefix": 2453137187,
  "expiration": "2018-06-21T07:30:09",
  "operations": [[
      8,{
        "fee": {
          "amount": 600000,
          "asset_id": "1.3.1"
        },
        "account_to_upgrade": "1.2.895678",
        "upgrade_to_lifetime_member": true,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": []
}
```

### 网页钱包查看已升级的帐户状态



