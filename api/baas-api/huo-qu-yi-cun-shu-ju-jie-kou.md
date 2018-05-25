## 介绍

通过Cid值获取对应存的数据

## 请求地址

GET /data/{cid}

## 请求参数

| 参数 | 类型 | 必填 | 最大长度 | 描述 | 示例 |
| --- | --- | --- | --- | --- | --- |
| cid | String | Y | 64 | 存储数据的Cid值 | QmaZrwThXyZm8Rxs93Tih3L6p4Q8NqYEXp32iN4PeAqDgv |

例子：

```js
GET /api/data/QmaZrwThXyZm8Rxs93Tih3L6p4Q8NqYEXp32iN4PeAqDgv
```

## 响应返回

返回一个 QmaZrwThXyZm8Rxs93Tih3L6p4Q8NqYEXp32iN4PeAqDgv.baas 的文件

## SDK示例-JAVA

```java
// build store client
// EXAMPLE_ACCOUNT is your account id
// EXAMPLE_PRIVATE_KEY is your account private key
// EXAMPLE_PUBLIC_KEY is your account public key
// * Attention: Your EXAMPLE_PRIVATE_KEY and EXAMPLE_PUBLIC_KEY can not be uploaded.
StoreClient client = new StoreClient(EXAMPLE_ACCOUNT, EXAMPLE_PRIVATE_KEY, EXAMPLE_PUBLIC_KEY, false);
// byte[]
byte[] result = client.getRawBytes(CID);
// String
String str = client.getRawString(CID);
// File
String file = client.downloadFile(CID,TARGET_FILE); // TARGET_FILE is java.io.File.
```

## 错误情况

| code | msg | 描述 |
| --- | --- | --- |
| 401 | NO\_EXIT | 不存在 |



