# Cli-wallet API调用说明

//说明调用API需要的环境、

## Cli-wallet 命令列表

| 命令 | 参数 | 说明 | 参数说明 |
| :---: | :---: | :---: | :---: |
| set\_password | new\_password | 对钱包设置一个新密码。首次启动钱包，需要设置密码 |  |
| unlock | my\_password | 解锁钱包 | 解锁钱包 |
| import\_key | account\_name\_or\_id | 将帐户的私钥导入到钱包 | 帐户名或者帐户id |
|  | wif\_private\_key |  | 帐户私钥 |
|  | true |  | 表示执行 |
| dump\_private\_keys |  | 打印钱包拥有的所有私钥对 |  |
| get\_account | account\_name\_or\_id | 查询指定帐户信息，参数可以为帐户名或者帐户id | 帐户名或id |
| list\_account\_balances | account\_name\_or\_id | 查询帐户余额 |  帐户名或者帐户id|
| get_account_history | account_name_or_id | 查询帐户最近的交易记录 | 帐户名或者帐户id |

## 示例

//按类别各举一例，如

### GET 请求示例

//get示例

### 测试工具

//测试工具举例

