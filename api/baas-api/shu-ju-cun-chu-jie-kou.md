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
| amount | String | Y |  | 支付存储费用的资产数量，精确到小数点后5位 | 0.02 |
| asset\_id | String | Y |  | 费用存储费用的资产id， GXS的资产id为1.3.1 | 1.3.1 |
| memo | String | Y | 32 | 存储数据MD5值 | 68b329da9893e34099c7d8ad5cb9c940 |
| expiration | Number | Y | 固定10 | 请求过期时间 | 1523390848 |
| signatures | String | Y | 65 | 签名 | 1f150b63b7439559f258aa9830f05551c49172bf1862418480fa261e7456dda8d67f08c2c6e86f716 |
| data | byte/File | Y | 不超过2MB | 上链的原始数据 | 12345678asdfg\(\)\_:&lt;&gt;!@\#$%^&\*=-';\" ' |

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
// 存取费用
Amount amount = Amount.builder().amount(20L).assetId("1.3.1").build();
// 原始数据
String data = "123";
// 数据MD5值
String dataMd5 = DigestUtils.md5DigestAsHex(data.getBytes());
// 你的账户
String from = "";
// BaaS账户
String baasAccount = "1.2.265";
// 过期时间
Long expiration = new Date().getTime() / 1000 + 60;
// 构建请求体
StoreDataReq request =
            StoreDataReq.builder().from(from).to(baasAccount).proxyAccount(baasAccount).amount(amount).percent(0).memo(dataMd5).expiration(expiration).data(data.getBytes()).build();
// 生成签名
String sign = SignatureUtil.signature(request.toBytes(), EXAMPLE_PRIVATE_KEY);
while (!SignatureUtil.verify(request.toBytes(), sign, EXAMPLE_PUBLIC_KEY, true)) { // 签名需要校验位判断 符合条件输出
    request.setExpiration(request.getExpiration() + 1);
    sign = SignatureUtil.signature(request.toBytes(), EXAMPLE_PRIVATE_KEY);
    }
request.setSignatures(sign);
// 获取返回
BaasClient baasClient = new BaasDefaultClient(url); // url为请求路径
StoreDataResp resp = baasClient.executeFormData(request,"data",request.getData());
```

```
具体参照 com.gxb.block.baas.sdk.client.api.example.StoreDataExample
```

## 错误情况

| code | msg | 描述 |
| --- | --- | --- |
| 401 | DATA\_SIGN\_FAILURE | 验签失败 |
| 402 | BALANCE\_NO\_ENOUGH | 账户余额不足 |
| 404 | REQ\_EXPIRATION | 请求过期 |
| 405 | DATA\_INVALID | 数据不合要求 |
| 406 | ACCOUNT\_INVALID | 账户不合要求 |
| 407 | DATA\_OVER\_SIZE | 数据长度过长 |
| 408 | AMOUNT\_INVALID | 金额不合要求 |



