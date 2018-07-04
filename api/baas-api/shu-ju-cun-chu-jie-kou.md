## 介绍

调用方通过该接口可把自己的数据通过baas平台服务有偿上链。

## 请求地址

POST /store

Content-Type= **multipart/form-data**

## 请求参数

| 参数 | 类型 | 必填 | 最大长度 | 描述 | 示例 |
| --- | --- | --- | --- | --- | --- |
| data | byte/File | Y | 不超过10MB | 要存储的原始数据 | 12345678asdfg\(\)\_:&lt;&gt;!@\#$%^&\*=-';\" ' |

说明：
- 存储固定消耗GXS，最小单位为 0.0002/kb.
- 数据大小限制后续会放开

## 响应参数

| 参数 | 类型 | 是否必填 | 最大长度 | 描述 | 示例 |
| --- | --- | --- | --- | --- | --- |
| txid | String | Y | 64 | 区块交易ID | d4763fd0d802473579ae2dcaa2c6707adf4f2e7e |
| cid | String | Y | 64 | IPFS存储的CID值 | QmaZrwThXyZm8Rxs93Tih3L6p4Q8NqYEXp32iN4PeAqDgv |

例子

```js
{
    "code":200,
    "msg":"ok",
    "data":{
        "cid":"QmaZrwThXyZm8Rxs93Tih3L6p4Q8NqYEXp32iN4PeAqDgv",
        "txid":"d4763fd0d802473579ae2dcaa2c6707adf4f2e7e"
    }
}
```

## SDK示例-JAVA

```java
// build store client
// EXAMPLE_ACCOUNT is your account id
// EXAMPLE_PRIVATE_KEY is your account private key
// EXAMPLE_PUBLIC_KEY is your account public key
// * Attention: Your EXAMPLE_PRIVATE_KEY and EXAMPLE_PUBLIC_KEY can not be uploaded.
StoreClient client = new StoreClient(EXAMPLE_ACCOUNT, EXAMPLE_PRIVATE_KEY, EXAMPLE_PUBLIC_KEY);
// response
StoreDataResp resp = client.store("Hello World!".getBytes());
```

```
具体参照 com.gxb.block.baas.sdk.client.api.client.StoreClient
```
线上帐户的id, 帐户活跃权限公钥可以在公信宝区块浏览器上根据帐户名获得：

区块浏览器地址: [https://block.gxb.io/#/](https://block.gxb.io/#/)

**也可以通过[获取服务提供方信息](/api/baas-api/huo-qu-fu-wu-ti-gong-fang-xin-xi.md)接口获取到线上正式环境与开发者测试环境对应的BaaS账户id**

```js
# 以帐户名gxs-dev为例，params传入帐户名
curl --data '{"jsonrpc": "2.0", "method": "get_account_by_name", "params": ["gxs-dev"], "id": 1}' https://node1.gxb.io

# 响应
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "id": "1.2.639290",  // 帐户id
        "membership_expiration_date": "1970-01-01T00:00:00",
...
...
        "lifetime_referrer_fee_percentage": 3000,
        "referrer_rewards_percentage": 0,
        "name": "gxs-dev",  // 帐户名
        "owner": {
            "weight_threshold": 1,
            "account_auths": [],
            "key_auths": [
                ["GXC85WbsFPSRjRto4n4gbopwGBEf41iroDesrNxN1WXJLTb9Mv2sc", 1]
            ],
            "address_auths": []
        },
        "active": { // 活跃权限
            "weight_threshold": 1,
            "account_auths": [],
            "key_auths": [
                ["GXC7xQNvkevq5fkCZPfi7rLTXZb1WKfE41sDTxqf7xUg36BLbZLvh", 1] // 活跃权限公钥
            ],
            "address_auths": []
        },
...
...
    }
}
```

## 

## 错误情况

| code | msg | 描述 |
| --- | --- | --- |
| 401 | DATA\_SIGN\_FAILURE | 验签失败 |
| 402 | BALANCE\_NO\_ENOUGH | 账户余额不足 |
| 404 | REQ\_EXPIRATION | 请求过期 |
| 405 | DATA\_MD5\_INVALID | 数据MD5不通过 |
| 406 | ACCOUNT\_NO\_EXIT | 账户不存在 |
| 407 | DATA\_OVER\_SIZE | 数据长度过长 |
| 408 | AMOUNT\_INVALID | 金额不合要求 |



