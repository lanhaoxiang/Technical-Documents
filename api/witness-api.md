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
| lookup\_accounts | &lt;limit&gt; &lt;lower\_bound\_name&gt; | 获取已注册账户的账户名和ID |  |
| get\_account\_count |  | 获取链上注册的所有账户数量 |  |
| get\_account\_balances | &lt;id&gt; &lt;assets&gt; | 获取账户资产余额 |  |
| get\_named\_account\_balances |  | 与上条功能相同，不过是凭借名字而不是ID查询 |  |
| get\_balance\_objects |  |  |  |
| get\_vested\_balances |  |  |  |
| get\_vesting\_balances |  |  |  |
| get\_assets | &lt;asset\_ids&gt; | 通过ID获取资产 |  |
| list\_assets | &lt;limit&gt; &lt;lower\_bound\_symbol&gt; | 通过符号名称获取资产 |  |
| lookup\_asset\_symbols | &lt;asset\_symbols&gt; | 通过符号获取资产列表 |  |
| get\_witnesses | &lt;witness\_ids&gt; | 通过ID获取见证人列表 |  |
| get\_witness\_by\_account | &lt;account&gt; | 通过账户名获取见证人 |  |
| lookup\_witness\_accounts | &lt;lower\_bound\_name&gt; &lt;limit&gt; | 获取已注册见证人的ID和账户名 |  |
| get\_witness\_count |  | 获取已注册见证人的数量 |  |
| get\_committee\_members | &lt;committee\_member\_ids&gt; | 通过ID获取理事会成员列表 |  |
| get\_committee\_member\_by\_account | &lt;account&gt; | 通过账户获取理事会成员 |  |
| lookup\_committee\_member\_accounts | &lt;account&gt; | 获得已注册理事会成员的ID和账户名 |  |
| get\_workers\_by\_account |  |  |  |
| lookup\_vote\_ids |  | 通过投票情况来获得投票对象 |  |
| get\_transaction\_hex |  | 获取二进制交易信息的十六进制编码 |  |
| get\_required\_signatures |  | 获取一组满足签署部分交易的最小子集的公钥 |  |
| get\_potential\_signatures |  | 获取一组可能可以签署已知交易的公钥 |  |
| get\_potential\_address\_signatures |  |  |  |
| verify\_authority |  | 验证交易是否已满足全部签名要求 |  |
| verify\_account\_authority |  | 验证签名人是否有权限授权账户 |  |
| validate\_transaction |  | 在当前情况下验证交易而不广播交易 |  |
| get\_required\_fees |  | 计算每一步操作的手续费 |  |
| get\_proposed\_transactions |  | 通过具体账户ID获得相关的被提议的交易 |  |
| get\_blinded\_balances |  |  |  |
|  |  |  |  |
|  |  |  |  |



