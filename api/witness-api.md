## Witness API 命令列表

| 命令 | 参数 | 说明 | 备注 |
| :--- | :--- | :--- | :--- |
| get\_objects | &lt;ids&gt; | 根据ID查询目标 |  |
| set\_subscribe\_callback |  | 停止获取通知 |  |
| set\_pending\_transaction\_callback |  |  |  |
| set\_block\_applied\_callback |  |  |  |
| cancel\_all\_subscriptions |  |  |  |
| get\_block\_header | block\_num | 获取区块头信息 |  |
| get\_transaction | block\_num | 获得交易信息 |  |
| get\_block | block\_num | 获取区块信息 |  |
| get\_recent\_transaction\_by\_id |  | 根据TXID查询交易，若交易超出有效期则会返回空值 |  |
| get\_chain\_properties |  | 获取链上资产信息 |  |
| get\_global\_properties |  | 获取全局资产信息 |  |
| get\_config |  | 获取编译时常量 |  |
| get\_chain\_id |  | 获取链ID |  |
| get\_dynamic\_global\_properties |  | 获取动态全局资产 |  |
| get\_key\_references |  |  |  |
| get\_accounts | &lt;account\_ids&gt; | 通过ID获取账户信息 |  |
| get\_full\_accounts | &lt;call back&gt; &lt;names\_or\_ids&gt; | 获取符合条件的所有账户 |  |
| get\_account\_by\_name |  | 通过名字获取账户 |  |
| get\_account\_references |  | 获取与秘钥相关联的账户 |  |
| lookup\_account\_names | &lt;account\_names&gt; | 通过名字获取账户 |  |
| lookup\_accounts | &lt;limit&gt; &lt;lower\_bound\_name&gt; | 获取已注册账户的名字和ID |  |
| get\_account\_count |  | 获取链上注册的所有账户数量 |  |
| get\_account\_balances | &lt;id&gt; &lt;assets&gt; | 获取账户资产余额 |  |
| get\_named\_account\_balances |  | 与上条功能相同，不过是凭借名字而不是ID查询 |  |
| get\_balance\_objects |  |  |  |
| get\_vested\_balances |  |  |  |
| get\_vesting\_balances |  |  |  |
| get\_assets |  |  |  |
| list\_assets |  |  |  |
| lookup\_asset\_symbols |  |  |  |
| get\_order\_book |  |  |  |
| get\_limit\_orders |  |  |  |
| get\_call\_orders |  |  |  |
| get\_settle\_orders |  |  |  |
| get\_margin\_positions |  |  |  |
| subscribe\_to\_market |  |  |  |
| unsubscribe\_from\_market |  |  |  |
| get\_ticker |  |  |  |
| get\_24\_volume |  |  |  |
| get\_trade\_history |  |  |  |
| get\_witnesses |  |  |  |
| get\_witness\_by\_account |  |  |  |
| lookup\_witness\_accounts |  |  |  |
| get\_witness\_count |  |  |  |
| get\_committee\_members |  |  |  |
| get\_committee\_member\_by\_account |  |  |  |
| lookup\_committee\_member\_accounts |  |  |  |
| get\_workers\_by\_account |  |  |  |
| lookup\_vote\_ids |  |  |  |
| get\_transaction\_hex |  |  |  |
| get\_required\_signatures |  |  |  |
| get\_potential\_signatures |  |  |  |
| get\_potential\_address\_signatures |  |  |  |
| verify\_authority |  |  |  |
| verify\_account\_authority |  |  |  |
| validate\_transaction |  |  |  |
| get\_required\_fees |  |  |  |
| get\_proposed\_transactions |  |  |  |
| get\_blinded\_balances |  |  |  |
|  |  |  |  |
|  |  |  |  |



