## 介绍

通过指定路径获取服务方提供的信息

## 请求地址

GET /provider

## 请求参数
无

### 例子（以curl为例）
```sh
curl https://baas.gxchain.cn/api/storage/provider
```

## 响应返回

```js
{
    "code":200,
    "msg":"ok",
    "data":{
        "account_id":"1.2.639287", // 提供方正式环境baas account id
        "name":"GXChain Official BaaS Storage",
        "description":"公信宝BaaS存储+存证服务",
        "fees":[ // 支持的支付资产类型以及费率
            {"fee_per_kbytes": 20, "asset_id":"1.3.1"} 
        ]
    }
}
```

## SDK示例-JAVA

```java
return new BaasDefaultClient(URL_HEADER + "storage/provider").execute(new ProviderReq());
```

可参考**com.gxb.block.baas.sdk.client.api.BaasConstants**类



