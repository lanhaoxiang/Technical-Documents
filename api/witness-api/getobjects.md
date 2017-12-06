# Get\_objects

##### 说明：根据ID查询目标对象

| 参数 | 说明 |
| :--- | :--- |
| ids | 目标ID |

### **调用示例**

```
curl --data '{
"jsonrpc": "2.0", 
"method": "call", 
"params": [0, "get_objects", [["1.25.100","1.2.200"]]], "id": 1
}' 
 https://node1.gxb.io/rpc
```



