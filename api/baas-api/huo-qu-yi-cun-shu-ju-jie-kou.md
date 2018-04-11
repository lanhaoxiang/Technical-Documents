## 介绍

通过Cid值获取对应存的数据

## 请求地址

GET /api/data/{cid}

## 请求参数

| 参数 | 类型 | 必填 | 最大长度 | 描述 | 示例 |
|---|---|---|---|---|---|
|cid | String | Y | 64 | 存储数据的Cid值 | QmaZrwThXyZm8Rxs93Tih3L6p4Q8NqYEXp32iN4PeAqDgv |

例子：

```js

{
    "cid":"QmaZrwThXyZm8Rxs93Tih3L6p4Q8NqYEXp32iN4PeAqDgv"
}

```

## 响应返回

返回一个 QmaZrwThXyZm8Rxs93Tih3L6p4Q8NqYEXp32iN4PeAqDgv.baas 的文件

## SDK示例-JAVA

```java
String cid = "";
BaasClient baasClient = new BaasDefaultClient(url + "/" + cid,false);
byte[] result = IOUtils.toByteArray(baasClient.download());
```

## 错误情况
| code | msg | 描述 |
| -- | -- |-- |
| 401 | NO_EXIT | 不存在 |