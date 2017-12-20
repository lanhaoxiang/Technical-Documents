## Witness API 命令列表

### database api

| 命令 | 参数 | 说明 | 备注 |
| :--- | :--- | :--- | :--- |
| [get\_objects](/api/witness-api/getobjects.md) | &lt;ids&gt; | 根据ID查询目标对象 |  |
| set\_subscribe\_callback | &lt;cb&gt; &lt;clear\_filter&gt; | 注册全局订阅的回调 |  |
| set\_data\_transaction\_subscribe\_callback | &lt;cb&gt; &lt;clear\_filter&gt; | 注册数据交易的回调 |  |
| unsubscribe\_data\_transaction\_callback |  | 取消注册数据交易的回调 |  |
| set\_data\_transaction\_products\_subscribe\_callback | &lt;cb&gt; &lt;ids&gt; | 注册特定数据产品ID的数据交易回调 |  |
| set\_pending\_transaction\_callback | &lt;cb&gt; | 注册未确认的交易的回调 |  |
| set\_block\_applied\_callback | &lt;cb&gt; | 注册区块是否被应用的回调 |  |
| cancel\_all\_subscriptions |  | 停止所有订阅（回调） |  |
| [get\_block\_header](/api/witness-api/getblock-header.md) | &lt;block\_num&gt; | 获取区块头信息 |  |
| get\_transaction | &lt;block\_num&gt; &lt;trx\_in\_block&gt; | 获得交易信息 |  |
| get\_block | &lt;block\_num&gt; | 获取区块信息 |  |
| get\_recent\_transaction\_by\_id | &lt;id&gt; | 根据TXID查询交易，若交易超出有效期则会返回空值 |  |
| get\_chain\_properties |  | 获取链属性 |  |
| get\_global\_properties |  | 获取全局属性 |  |
| get\_commission\_percent |  | 获取佣金比例 |  |
| get\_config |  | 获取编译时常量 |  |
| get\_chain\_id |  | 获取链ID |  |
| get\_dynamic\_global\_properties |  | 获取动态全局属性 |  |
| get\_key\_references | &lt;key&gt; | 返回所有指向公钥的帐户信息 |  |
| is\_public\_key\_registered | &lt;public\_key&gt; | 验证公钥是否已经被注册 |  |
| get\_accounts | &lt;account\_ids&gt; | 通过ID获取账户信息 |  |
| [get\_full\_accounts](/api/witness-api/getfullaccounts.md) | &lt;names\_or\_ids&gt; &lt;subscribe&gt; | 获取符合条件的所有账户相关信息 |  |
| get\_account\_by\_name | &lt;name&gt; | 通过账户名获取账户信息 |  |
| get\_account\_references | &lt;account\_id&gt; | 获取账户account\_id相关的账户id |  |
| lookup\_account\_names | &lt;account\_names&gt; | 通过账户名获取账户信息 |  |
| [lookup\_accounts](/api/witness-api/lookupaccounts.md) | &lt;limit&gt; &lt;lower\_bound\_name&gt; | 获取已注册账户的账户名和ID |  |
| get\_account\_count |  | 获取链上注册的所有账户数量 |  |
| [get\_account\_balances](/api/witness-api/getaccount-balances.md) | &lt;id&gt; &lt;assets&gt; | 通过账户ID和资产ID获取账户资产信息 |  |
| get\_named\_account\_balances | &lt;name&gt; &lt;assets&gt; | 通过账户名和资产ID获取账户资产信息 |  |
| get\_balance\_objects | &lt;&lt;\[address\]&gt;&gt; | 返回地址address上所有未领取的余额对象 |  |
| get\_vested\_balances | &lt;objs&gt; | 通过账户余额ID获取可领取的资产信息 |  |
| get\_vesting\_balances | &lt;account\_id&gt; | 通过账户ID获取归属该账户但暂时不可领取的余额信息 |  |
| list\_data\_transaction\_complain\_requesters | &lt;start\_date\_time&gt; &lt;end\_date\_time&gt; &lt;limit&gt; | 通过开始和结束时间获取投诉的发起人，并返回前limit个 |  |
| list\_data\_transaction\_complain\_datasources | &lt;start\_date\_time&gt; &lt;end\_date\_time&gt; &lt;limit&gt; | 通过开始和结束时间获取被投诉的数据源，并返回前limit个 |  |
| get\_assets | &lt;asset\_ids&gt; | 通过资产ID获取资产 |  |
| [list\_assets](/api/witness-api/listassets.md) | &lt;lower\_bound\_symbol&gt; &lt;limit&gt; | 通过资产符号名称获取资产信息，并返回前limit个 |  |
| lookup\_asset\_symbols | &lt;symbols\_or\_ids&gt; | 通过资产符号获取资产列表 |  |
| get\_witnesses | &lt;witness\_ids&gt; | 通过见证人ID获取见证人列表 |  |
| get\_witness\_by\_account | &lt;account&gt; | 通过账户ID获取见证人信息 |  |
| lookup\_witness\_accounts | &lt;lower\_bound\_name&gt; &lt;limit&gt; | 获取已注册见证人的ID和账户名 |  |
| get\_witness\_count |  | 获取已注册见证人的数量 |  |
| get\_committee\_members | &lt;committee\_member\_ids&gt; | 通过ID获取理事会成员信息 |  |
| get\_committee\_member\_by\_account | &lt;account&gt; | 通过账户ID获取理事会成员信息 |  |
| lookup\_committee\_member\_accounts | &lt;account&gt; &lt;limit&gt; | 获得已注册理事会成员的ID和账户名,并返回前limit个 |  |
| get\_workers\_by\_account | &lt;account&gt; | 通过账户ID获取工作对象信息 |  |
| lookup\_vote\_ids | &lt;votes&gt; | 通过投票对象ID来获得投票对象 |  |
| get\_transaction\_hex | &lt;trx&gt; | 获取签名的交易信息的十六进制编码 |  |
| get\_required\_signatures | &lt;trx&gt; &lt;available\_keys&gt; | 获取签名的交易信息的签名公钥 |  |
| get\_potential\_signatures | &lt;trx&gt; | 获取签名的交易信息的签名公钥 |  |
| get\_potential\_address\_signatures | &lt;trx&gt; | 获取签名的交易信息的地址 |  |
| verify\_authority | &lt;trx&gt; | 验证交易是否已满足全部签名要求 |  |
| verify\_account\_authority | &lt;name\_or\_id&gt; &lt;signers&gt; | 验证签名人是否有足够的权力控制一个帐户 |  |
| validate\_transaction | &lt;trx&gt; | 在当前情况下验证交易而不广播交易 |  |
| get\_required\_fees | &lt;ops&gt; &lt;id&gt; | 通过操作ID和资产ID获取手续费 |  |
| get\_proposed\_transactions | &lt;id&gt; | 通过具体账户ID获得相关的被提议的交易 |  |
| get\_blinded\_balances | &lt;id&gt; | 通过委托ID获取隐藏资产 |  |
| get\_data\_transaction\_product\_costs | &lt;start&gt; &lt;end&gt; | 获取指定时间内数据交易的产品费用 |  |
| get\_data\_transaction\_total\_count | &lt;start&gt; &lt;end&gt; | 获取指定时间内数据交易的次数 |  |
| get\_merchants\_total\_count |  | 获取当前商户个数 |  |
| get\_data\_transaction\_commission | &lt;start&gt; &lt;end&gt; | 获取指定时间内数据交易的佣金 |  |
| get\_data\_transaction\_pay\_fee | &lt;start&gt; &lt;end&gt; | 获取指定时间内数据交易的手续费 |  |
| get\_data\_transaction\_product\_costs\_by\_requester | &lt;requester&gt; &lt;start&gt; &lt;end&gt; | 获取请求账户（即商户）在指定时间内数据交易产生的产品费用 |  |
| get\_data\_transaction\_total\_count\_by\_requester | &lt;requester&gt; &lt;start&gt; &lt;end&gt; | 获取请求账户（即商户）在指定时间内发起数据交易的次数 |  |
| get\_data\_transaction\_pay\_fees\_by\_requester | &lt;requester&gt; &lt;start&gt; &lt;end&gt; | 获取请求账户（即商户）在指定时间内发起数据交易的手续费 |  |
| get\_data\_transaction\_product\_costs\_by\_product\_id | &lt;product\_id&gt; &lt;start&gt; &lt;end&gt; | 获取在指定时间内购买指定产品的产品费用 |  |
| get\_data\_transaction\_total\_count\_by\_product\_id | &lt;product\_id&gt; &lt;start&gt; &lt;end&gt; | 获取在指定时间内购买指定产品的次数 |  |
|  |  |  |  |

### history api

| 命令 | 参数 | 说明 | 备注 |
| :--- | :--- | :--- | :--- |
| get\_account\_history | &lt;account\_id&gt; &lt;start&gt; &lt;limit&gt; &lt;stop&gt; | 查询帐户的交易历史，其中start/stop为operation\_history\_id， id为1.11.x |  |
| get\_account\_history\_by\_operations | &lt;account\_id&gt; &lt;operation\_ids&gt; &lt;start&gt; &lt;limit&gt; | 查询帐户的交易历史，根据operations\_ids筛选指定类型的交易历史，其中start为序号，从1开始 |  |



