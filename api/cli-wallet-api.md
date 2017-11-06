## Cli-wallet 命令列表

| 命令 | 参数 | 说明 | 参数说明 |
| :---: | :---: | :---: | :---: |
| [set\_password](/apidiao-yong/cli-wallet-api/setpassword.md) | new\_password | 对钱包设置一个新密码。首次启动钱包，需要设置密码 |  |
| [unlock](/api/cli-wallet-api/unlock.md) | my\_password | 解锁钱包 | 解锁钱包 |
| [import\_key](/api/cli-wallet-api/importkey.md) | account\_name\_or\_id | 将帐户的私钥导入到钱包 | 帐户名或者帐户id |
|  | wif\_private\_key |  | 帐户私钥 |
|  | true |  | 表示执行 |
| [dump\_private\_keys](/api/cli-wallet-api/dumpprivate-keys.md) |  | 打印钱包拥有的所有私钥对 |  |
| [get\_account](/api/cli-wallet-api/getaccount.md) | account\_name\_or\_id | 查询指定帐户信息，参数可以为帐户名或者帐户id | 帐户名或id |
| [list\_account\_balances](/api/cli-wallet-api/listaccount-balances.md) | account\_name\_or\_id | 查询帐户余额 | 帐户名或者帐户id |
| [get\_account\_history](/api/cli-wallet-api/getaccount-history.md) | account\_name\_or\_id | 查询帐户最近的交易记录 | 帐户名或者帐户id |
|  | limit\_num |  | 最多显示最多limit\_num条交易记录 |
| [get\_relative\_account\_history](/api/cli-wallet-api/getrelative-account-history.md) | account\_name\_or\_id | 查询帐户最近的交易记录, 支持翻页 | 帐户名或者帐户id |
|  | start |  | 起始序号\(1为最早的一笔交易，交易越新，序号越大） |
|  | limit |  | 显示最近limit条交易记录 |
|  | stop |  | 结束序号 |
| [get\_account\_history\_by\_operations](/api/cli-wallet-api/getaccount-history-by-operations.md) | account\_name\_or\_id | 根据oeration\_type查询帐户最近的交易记录，支持翻页并且返回operation对应的txID | 帐户名或者id |
|  | \[\] |  | operation\_type，比如转帐为0，可以写成\[0\]。若传空，则表示查询所有的operation\_type |
|  | start |  | 起始序号，同get\_relative\_account\_history |
|  | limit\_num |  | 显示最近limit条交易记录 |
| [transfer](/api/cli-wallet-api/transfer.md) | from\_account | 转帐操作 | 转帐发起帐户 |
|  | to\_account |  | 转帐接收帐户 |
|  | amount |  | 转帐数目 |
|  | GXS |  | 转帐资产 |
|  | memo |  | 转帐备注，交易所用户充值时需要填写备注 |
|  | true |  | true表示真正执行 |
| [transfer2](/api/cli-wallet-api/transfer2.md) | from\_account | 转帐操作，参数同transfer, 返回结果中包含当前交易的id | 转帐发起帐户 |
|  | to\_account |  | 转帐接收帐户 |
|  | amount |  | 转帐数目 |
|  | GXS |  | 转帐资产 |
|  | memo |  | 转帐备注，交易所用户充值时需要填写备注 |
|  | true |  | true表示真正执行 |
| [get\_block](/api/cli-wallet-api/getblock.md) | block\_num | 获取指定区块信息 | 区块号 |
| [info](/api/cli-wallet-api/info.md) |  | 获取区块链信息，可以用此命令查询最新区块高度 |  |
| [help](/api/cli-wallet-api/help.md) |  | 帮助命令，此命令会返回钱包支持的所有接口 |  |
| [gethelp](/api/cli-wallet-api/gethelp.md) | command | 帮助命令，查看指定钱包命令的调用方法 | 查询的命令行接口 |

## 

### 测试工具

//测试工具举例

