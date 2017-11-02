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

```

```



