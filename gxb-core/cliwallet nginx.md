# nginx代理配置cli\_wallet端口转发 {#nginx代理配置cliwallet端口转发}

钱包的rpc服务仅限本地访问，如果需要其它机器访问钱包的rpc服务，可以在钱包节点上配置nginx代理，并限制IP访问。

### 1. 安装nginx {#1-安装nginx}

```
cd /etc/apt/
cp sources.list sources.list.bak

echo 'deb http://mirrors.aliyun.com/ubuntu/ vivid main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ vivid-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ vivid-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ vivid-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ vivid-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ vivid main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ vivid-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ vivid-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ vivid-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ vivid-backports main restricted universe multiverse' > sources.list
sudo apt-get update
sudo apt-get install nginx

```

### 2. 配置nginx {#2-配置nginx}

新增cli\_wallet.conf，放于/etc/nginx/conf.d 目录下，内容如下：

```
server { 
    listen 8888;  # 监听端口
    location / { 
        proxy_pass http://127.0.0.1:8091; 
        proxy_http_version 1.1; 

        allow 192.168.1.119;  # 允许访问的IP
        allow 192.168.1.118;  # 允许访问的IP
        deny all;             # 禁止其它IP访问
    } 
}
```

### 3. 重新加载配置 {#3-重新加载配置}

执行如下命令：

```
sudo nginx -s reload

```

### 4. 测试 {#4-测试}

配置已经完成。此时仅限ip为192.168.1.118和192.168.1.119两台机器访问，其它IP访问，会返回403错误。

钱包的rpc地址变为：[http://${host\_ip}:8888/rpc](http://%24%7Bhost_ip%7D:8888/rpc)其中${host\_ip}为钱包服务器的ip，端口为8888, nginx会将8888端口接收的请求转发至8091。



```
curl --data '{"jsonrpc": "2.0", "method": "get_account", "params": ["1.2.0"], "id": 2}' http://192.168.1.119:8888/rpc
```

返回如下：

```
{
  "id": 2,
  "result": {
    "id": "1.2.0",
    "membership_expiration_date": "1969-12-31T23:59:59",
    "merchant_expiration_date": "1970-01-01T00:00:00",
    "datasource_expiration_date": "1970-01-01T00:00:00",
    "data_transaction_member_expiration_date": "1970-01-01T00:00:00",
    "registrar": "1.2.0",
    "referrer": "1.2.0",
    "lifetime_referrer": "1.2.0",
    "merchant_auth_referrer": "1.2.0",
    "datasource_auth_referrer": "1.2.0",
    "network_fee_percentage": 2000,
    "lifetime_referrer_fee_percentage": 8000,
    "referrer_rewards_percentage": 0,
    "name": "committee-account",
    "owner": {
      "weight_threshold": 1,
      "account_auths": [],
      "key_auths": [],
      "address_auths": []
    },
    "active": {
      "weight_threshold": 22743,
      "account_auths": [
        ["1.2.6", 45474],
        ["1.2.7", 1],
        ["1.2.8", 1],
        ["1.2.9", 1],
        ["1.2.10", 1],
        ["1.2.11", 1],
        ["1.2.12", 1],
        ["1.2.13", 1],
        ["1.2.14", 1],
        ["1.2.15", 1],
        ["1.2.16", 1]
      ],
      "key_auths": [],
      "address_auths": []
    },
    "options": {
      "memo_key": "GXC1111111111111111111111111111111114T1Anm",
      "voting_account": "1.2.5",
      "num_witness": 0,
      "num_committee": 0,
      "votes": [],
      "extensions": []
    },
    "statistics": "2.6.0",
    "whitelisting_accounts": [],
    "blacklisting_accounts": [],
    "whitelisted_accounts": [],
    "blacklisted_accounts": [],
    "owner_special_authority": [0, {}],
    "active_special_authority": [0, {}],
    "top_n_control_flags": 0
  }
}
```





