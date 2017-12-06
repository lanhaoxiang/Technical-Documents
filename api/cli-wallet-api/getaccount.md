# get\_account {#5-getaccount}

##### 说明：查询指定帐户信息，参数可以为帐户名或者帐户id {#说明：查询指定帐户信息，参数可以为帐户名或者帐户id}

##### usage: get\_account account\_name\_or\_id {#usage-getaccount-accountnameorid}

##### 参数: account\_name\_or\_id {#参数-accountnameorid}

| 参数 | 说明 |
| :--- | :--- |
| account\_name\_or\_id | 帐户名或id |

### **调用示例**

```
curl --data '{
"jsonrpc": "2.0", 
"method": "call", 
"params": [0, "get_accounts", [["1.2.1","1.2.2"]]], "id": 1
}'  
https://node1.gxb.io/rpc
```



