## Cli-wallet 命令列表

| 命令 | 参数 | 说明 | 备注 |
| :--- | :--- | :--- | :--- |
| [set\_password](/api/cli-wallet-api/setpassword.md) | &lt;new\_password&gt; | 对钱包设置一个新密码。首次启动钱包，需要设置密码 |  |
| [un\_lock](/api/cli-wallet-api/unlock.md) | &lt;my\_password&gt; | 解锁钱包 |  |
| [import\_key](/api/cli-wallet-api/importkey.md) | &lt;account\_name\_or\_id&gt;         &lt;true&gt; &lt;wif\_private\_key&gt; | 将帐户的私钥导入到钱包 |  |
| [dump\_private\_keys](/api/cli-wallet-api/dumpprivate-keys.md) |  | 打印钱包拥有的所有私钥对 |  |
| [get\_account](/api/cli-wallet-api/getaccount.md) | &lt;account\_name\_or\_id&gt; | 查询指定帐户信息，参数可以为帐户名或者帐户id |  |
| [list\_account\_balances](/api/cli-wallet-api/listaccount-balances.md) | &lt;account\_name\_or\_id&gt; | 查询帐户余额 |  |
| [get\_account\_history](/api/cli-wallet-api/getaccount-history.md) | &lt;account\_name\_or\_id&gt;         &lt;limt\_num&gt; | 查询帐户最近的交易记录 |  |
| [get\_relative\_account\_history](/api/cli-wallet-api/getrelative-account-history.md) | &lt;account\_name\_or\_id&gt;       &lt;start&gt; &lt;limit&gt; &lt;stop&gt; | 查询帐户最近的交易记录, 支持翻页 |  |
| [get\_account\_history\_by\_operations](/api/cli-wallet-api/getrelative-account-history_by_operations.md) | &lt;account\_name\_or\_id&gt; &lt;\[\]&gt;  &lt;start&gt; &lt;limit\_num&gt; | 根据oeration\_type查询帐户最近的交易记录，并且返回 operation对应的txID |  |
| [transfer](/api/cli-wallet-api/transfer.md) | &lt;from\_account&gt;                   &lt;to\_account&gt; &lt;amount&gt;     &lt;GXS&gt; &lt;memo&gt; &lt;true&gt; | 转帐操作 |  |
| [transfer2](/api/cli-wallet-api/transfer2.md) | &lt;from\_account&gt;                   &lt;to\_account&gt; &lt;amount&gt;     &lt;GXS&gt; &lt;memo&gt; &lt;true&gt; | 转帐操作，参数同transfer, 返回结果中包含当前交易的id |  |
| [get\_block](/api/cli-wallet-api/getblock.md) | &lt;block\_num&gt; | 获取指定区块信息 |  |
| [info](/api/cli-wallet-api/info.md) |  | 获取区块链信息，可以用此命令查询最新区块高度 |  |
| [help](/api/cli-wallet-api/help.md) |  | 帮助命令，此命令会返回钱包支持的所有接口 |  |
| [gethelp](/api/cli-wallet-api/gethelp.md) | &lt;command&gt; | 帮助命令，查看指定钱包命令的调用方法 |  |

## 

### 测试工具



推荐测试工具为POSTMAN

**https://www.getpostman.com**

![](/assets/test tool.png)

