## 介绍

调用方通过该接口可把自己的数据通过baas平台服务有偿上链。

## 请求地址

POST /api/store

Content-Type= **multipart/form-data**

## 请求参数

| 参数 | 类型 | 必填 | 最大长度 | 描述 | 示例 |
|---|---|---|---|---|---|
|from | String | Y | 32 | 存储数据的账户id | 1.2.264 |
| to | String | Y | 32 | Baas平台账户id | 1.2.265 |
| proxy_account | String | Y | 32 | Baas平台账户id | 1.2.265 | 
| percent | Number | Y | 0 - 100 | 费率 | 0 |
| amount | Number | Y |  | 金额 | 20 |
| asset_id | String | Y |  | 资产代码 | 1.3.1 |
| memo | String | Y | 32 | 数据MD5值 | 68b329da9893e34099c7d8ad5cb9c940 |
| expiration | String | Y |  | 请求过期时间 | 2018-11-01T02:12:21 |
| signatures | List<String> | Y | 65 | 签名 | ["1f150b63b7439559f258aa9830f05551c49172bf1862418480fa261e7456dda8d67f08c2c6e86f716"] |
| data | byte/File | Y | <=2MB | 上链的原始数据 | 12345678asdfg()_:<>!@#$%^&*=-';\\" ' |

    amount: 确保整数,金额 = 100000 * 实际金额, 示例中的20实际为 0.0002 GXS
    asset_id: 1.3.1 固定为 GXS 

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
    "expiration":"2018-11-01T02:12:21",
    "signature": ["1f150b63b7439559f258aa9830f05551c49172bf1862418480fa261e7456dda8d67f08c2c6e86f716"],
    "data":
}

```

## 响应参数

| 参数 | 类型 | 是否必填 | 最大长度 | 描述 | 示例 |
| -- | -- | -- | -- | -- | -- |
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

Amount amount = Amount.builder().amount(20L).assetId("1.3.1").build();
String data = "123";
String dataMd5 = DigestUtils.md5DigestAsHex(data.getBytes());
// 构建请求体
StoreDataReq request =
            StoreDataReq.builder().from(("1.2.264")).to("1.2.265").proxyAccount("1.2.265").amount(amount).percent(0).memo(dataMd5).expiration(new Date().getTime() / 1000 + 60).data(data.getBytes()).build();
List<String> signatures = new ArrayList<>();
signatures.add(SignatureUtil.signature(request.toBytes(),"privateKey"); // privateKey为账户1.2.264的私钥 该生成签名过程无网络连接 具体可查源码
request.setSignatures(signatures);
GxbClient gxbClient = new GxbDefaultClient(storeUrl);
// 获取返回
StoreDataResp resp = gxbClient.execute(request);
```

    详情参照 com.gxb.sdk.developer.api.example.StoreDataExample 类

## 错误情况

| code | msg | 描述 |
| -- | -- |-- |
| 401 | DATA_SIGN_FAILURE | 验签失败 |
| 402 | BALANCE_NO_ENOUGH | 账户余额不足 |
| 404 | REQ_EXPIRATION | 请求过期 |
| 405 | DATA_INVALID | 数据不合要求 |
| 406 | ACCOUNT_INVALID | 账户不合要求 |
| 407 | DATA_OVER_SIZE | 数据长度过长 |
| 408 | AMOUNT_INVALID | 金额不合要求 |

