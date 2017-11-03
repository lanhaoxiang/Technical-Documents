# cli\_wallet主要API说明及json rpc调用示例 {#cliwallet主要api说明及json-rpc调用示例}

### 1. set\_password

##### 说明：对钱包设置一个新密码。首次启动钱包，需要设置密码 {#说明：对钱包设置一个新密码。首次启动钱包，需要设置密码}

##### usage: set\_password new\_password {#usage-setpassword-newpassword}

##### 参数： {#参数：}

| 参数 | 说明 |
| :--- | :--- |
| new\_password | 钱包密码 |

##### 示例： {#示例：}

```
unlocked >>> set_password my_password
null


locked >>>
```

### 2. unlock

##### 说明：解锁钱包，如果钱包已经是unlocked状态，执行unlock后仍然是unlocked状态 {#说明：解锁钱包，如果钱包已经是unlocked状态，执行unlock后仍然是unlocked状态}

##### usage: unlock my\_password {#usage-unlock-mypassword}

##### 参数： {#参数：}

| 参数 | 说明 |
| :--- | :--- |
| my\_password | 钱包密码 |

##### 示例： {#示例：}

```
locked >>> unlock my_password
null

unlocked >>>
```

### 3. import\_key {#3-importkey}

##### 说明：将帐户的私钥导入到钱包 {#说明：将帐户的私钥导入到钱包}

##### usage: import\_key account\_name\_or\_id wif\_private\_key true {#usage-importkey-accountnameorid-wifprivatekey-true}

##### 参数： {#参数：}

| 参数 | 说明 |
| :--- | :--- |
| account\_name\_or\_id | 帐户名或者帐户id |
| wif\_private\_key | 帐户私钥 |
| true | true表示执行 |

### 4. dump\_private\_keys {#4-dumpprivatekeys}

##### 说明：打印钱包拥有的所有公私钥对 {#说明：打印钱包拥有的所有公私钥对}

##### usage: dump\_private\_keys {#usage-dumpprivatekeys}

##### 参数: 无 {#参数-无}

##### 

### 5. get\_account {#5-getaccount}

##### 说明：查询指定帐户信息，参数可以为帐户名或者帐户id {#说明：查询指定帐户信息，参数可以为帐户名或者帐户id}

##### usage: get\_account account\_name\_or\_id {#usage-getaccount-accountnameorid}

##### 参数: account\_name\_or\_id {#参数-accountnameorid}

| 参数 | 说明 |
| :--- | :--- |
| account\_name\_or\_id | 帐户名或id |

##### 

### 6. list\_account\_balances {#6--listaccountbalances}

##### 说明：查询帐户余额 {#说明：查询帐户余额}

##### usage: list\_accounts\_balances account\_name\_or\_id {#usage-listaccountsbalances-accountnameorid}

##### 参数: account\_name\_or\_id {#参数-accountnameorid}

| 参数 | 说明 |
| :--- | :--- |
| account\_name\_or\_id | 帐户名或者帐户id |

### 7. get\_account\_history {#7--getaccounthistory}

##### 说明：查询帐户最近的交易记录 {#说明：查询帐户最近的交易记录}

##### usage: get\_account\_history account\_name\_or\_id limit\_num {#usage-getaccounthistory-accountnameorid-limitnum}

##### 参数：account\_name\_or\_id, limit\_num {#参数：accountnameorid-limitnum}

| 参数 | 说明 |
| :--- | :--- |
| account\_name\_or\_id | 帐户名或者帐户id |
| limit\_num | 最多显示最近limit\_num条交易记录 |

### 8. get\_relative\_account\_history {#8-getrelativeaccounthistory}

##### 说明：查询帐户最近的交易记录, 支持翻页 {#说明：查询帐户最近的交易记录-支持翻页}

##### usage: get\_relative\_account\_history account\_name\_or\_id limit\_num {#usage-getrelativeaccounthistory-accountnameorid-limitnum}

##### 参数：account\_name\_or\_id, start, limit\_num, stop {#参数：accountnameorid-start-limitnum-stop}

| 参数 | 说明 |
| :--- | :--- |
| account\_name\_or\_id | 帐户名或者帐户id |
| start | 起始序号\(1为最早的一笔交易，交易越新，序号越大） |
| limit | 显示最近limit条交易记录 |
| stop | 结束序号 |

### 9. get\_account\_history\_by\_operations {#9-getaccounthistorybyoperations}

##### 说明：根据oeration\_type查询帐户最近的交易记录，支持翻页并且返回operation对应的txID {#说明：根据oerationtype查询帐户最近的交易记录，支持翻页并且返回operation对应的txid}

##### usage: get\_account\_history\_by\_operations \[\] start limit\_num {#usage-getaccounthistorybyoperations--start-limitnum}

##### 参数：account\_name\_or\_id, \[\], start, limit\_num {#参数：accountnameorid--start-limitnum}

| 参数 | 说明 |
| :--- | :--- |
| account\_name\_or\_id | 帐户名或者id |
| \[\] | operation\_type，比如转帐为0，可以写成\[0\]。若传空，则表示查询所有的operation\_type |
| start | 起始序号，同get\_relative\_account\_history |
| limit\_num | 显示最近limit条交易记录 |

### 10. transfer {#10-transfer}

##### 说明：转帐操作 {#说明：转帐操作}

##### usage: transfer gxb1 gxb2 100 GXS "transfer memo" true {#usage-transfer-gxb1-gxb2-100-gxs-transfer-memo-true}

##### 参数：from\_account to\_account amount GXS "memo" BROADCAST {#参数：fromaccount-toaccount-amount-gxs-memo-broadcast}

| 参数 | 说明 |
| :--- | :--- |
| from\_account | 转帐发起帐户 |
| to\_account | 转帐接收帐户 |
| amount | 转帐数目 |
| GXS | 转帐资产 |
| memo | 转帐备注，交易所用户充值时需要填写备注 |
| true | true表示真正执行 |

### 11. transfer2 {#11--transfer2}

##### 说明：转帐操作，参数同transfer, 返回结果中包含当前交易的id {#说明：转帐操作，参数同transfer-返回结果中包含当前交易的id}

##### usage: transfer2 gxb1 gxb2 100 GXS "transfer memo" true {#usage-transfer2-gxb1-gxb2-100-gxs-transfer-memo-true}

##### 参数：from\_account to\_account amount GXS "memo" BROADCAST {#参数：fromaccount-toaccount-amount-gxs-memo-broadcast}

| 参数 | 说明 |
| :--- | :--- |
| from\_account | 转帐发起帐户 |
| to\_account | 转帐接收帐户 |
| amount | 转帐数目 |
| GXS | 转帐资产 |
| memo | 转帐备注，交易所用户充值时需要填写备注 |
| true | true表示真正执行 |

### 12. get\_block {#12-getblock}

##### 说明：获取指定区块信息 {#说明：获取指定区块信息}

##### usage: get\_block block\_num {#usage-getblock-blocknum}

##### 参数：block\_num {#参数：blocknum}

| 参数 | 说明 |
| :--- | :--- |
| block\_num | 区块号 |

### 13. info {#13-info}

##### 说明：获取区块链信息，可以用此命令查询最新区块高度 {#说明：获取区块链信息，可以用此命令查询最新区块高度}

##### usage: info {#usage-info}

##### 参数：无 {#参数：无}

##### 

### 14. help {#14-help}

##### 说明：帮助命令，此命令会返回钱包支持的所有接口 {#说明：帮助命令，此命令会返回钱包支持的所有接口}

##### usage: help {#usage-help}

##### 参数：无 {#参数：无}

##### 

### 13. gethelp {#13-gethelp}

##### 说明：帮助命令，查看指定钱包命令的调用方法 {#说明：帮助命令，查看指定钱包命令的调用方法}

##### usage: gethelp command {#usage-gethelp-command}

##### 参数：command {#参数：command}

| 参数 | 说明 |
| :--- | :--- |
| command | 查询的命令行接口 |

##### 

# json rpc调用方法示例： {#json-rpc调用方法示例：}

上述所有的命令行，都有对应的rpc调用方法。

其中method 传入命令名，params 数组传入参数清单\(无参数时，params传空数组\)， id为请求的标识，返回结果中的id和请求id一致。如果执行成功，结果会有 result ，否则会有 error。



[  
](https://doc.gxb.io/core/yuan-ma-bian-yi.html)



