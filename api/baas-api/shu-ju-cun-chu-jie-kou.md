## 介绍

调用方通过该接口可把自己的数据通过baas平台服务有偿上链。

## 请求地址

POST /api/store

Content-Type= **multipart/form-data**

## 请求参数

| 参数 | 类型 | 必填 | 最大长度 | 描述 | 示例 |
| --- | --- | --- | --- | --- | --- |
| from | String | Y | 32 | 调用方的账户id，存储费用从该帐户扣除 | 1.2.639290 |
| to | String | Y | 32 | Baas平台账户id | 1.2.639287 |
| proxy\_account | String | Y | 32 | Baas平台账户id | 1.2.639287 |
| percent | String | Y | 0 - 100 | 费率百分比，即 amount的百分之多少分成给proxy\_account | 0 |
| amount | String | Y |  | 支付存储费用的资产数量 | 20 |
| asset\_id | String | Y |  | 费用存储费用的资产id， GXS的资产id为1.3.1 | 1.3.1 |
| memo | String | Y | 32 | 存储的原始数据MD5值 | 68b329da9893e34099c7d8ad5cb9c940 |
| expiration | Number | Y | 固定10 | 请求过期时间 | 1523390848 |
| signatures | String | Y | 65 | 调用方使用活跃权限私钥发起的数字签名 | 1f150b63b7439559f258aa9830f05551c49172bf1862418480fa261e7456dda8d67f08c2c6e86f716 |
| data | byte/File | Y | 不超过2MB | 要存储的原始数据 | 12345678asdfg\(\)\_:&lt;&gt;!@\#$%^&\*=-';\" ' |

说明：

```
amount: 确保整数,金额 = 100000 * 实际金额, 示例中的20实际为 0.0002 GXS
asset_id: 1.3.1 固定为 GXS 
data: 数据大小限制后续会放开
```

例子：

```js
{
    "from":"1.2.264",
    "to":"1.2.265",
    "proxy_account":"1.2.265",
    "percent":0,
    "amount":20,
    "asset_id":"1.3.1",
    "memo":"68b329da9893e34099c7d8ad5cb9c940",
    "expiration":1523390848,
    "signature": "1f150b63b7439559f258aa9830f05551c49172bf1862418480fa261e7456dda8d67f08c2c6e86f716",
    "data":
}
```

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
// 存取费用 需要调用获取费率接口再根据要存数据的大小计算得出该值 eg: 1.2KB的数据费用amount为 2*20=40
Amount amount = Amount.builder().amount(20L).assetId("1.3.1").build();
// 原始数据
String data = "123";
// 数据MD5值
String dataMd5 = DigestUtils.md5DigestAsHex(data.getBytes());
// 你的账户YOUR_ACCOUNT_ID 可通过区块浏览器输入账户名得到账户id
String from = "YOUR_ACCOUNT_ID";
// 构建请求体
StoreDataReq request = new StoreDataReq();
request.setFrom(YOUR_ACCOUNT_ID);
request.setMemo(dataMd5);
request.setData(dataBytes);
// 存取费用,目前为20 需要调用获取费率接口再根据要存数据的大小计算得出该值 eg: 1.2KB的数据费用amount为 2*20=40
request.setAmount(request.calculateAmount(20L));
// 其中YOUR_PRIVATE_KEY / YOUR_PUBLIC_KEY分别为你的帐户对应的私钥和公钥
request.setSignatures(request.sign(YOUR_PRIVATE_KEY,YOUR_PUBLIC_KEY));

// 获取返回
BaasClient baasClient = new BaasDefaultClient(url); // url为请求路径
StoreDataResp resp = baasClient.executeFormData(request,"data",request.getData());
```

```
具体参照 com.gxb.block.baas.sdk.client.api.example.StoreDataExample
```
帐户的id, 帐户活跃权限公钥可以在公信宝区块浏览器上根据帐户名获得：

区块浏览器地址: [https://block.gxb.io/#/](https://block.gxb.io/#/)

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



