# 获取服务提供方信息

```
GET /api/v2/store/provider

{
    "code":200,
    "msg":"ok",
    "data":{
        "account_id":"1.2.60", // 提供方ID
        "name":"GXChain Official BaaS Storage",
        "description":"公信宝BaaS存储+存证服务",
        "fees":[ // 支持的支付资产类型以及费率
            {"fee_per_kbytes": 20, "asset_id":"1.3.1"} 
        ]
    }
}
```



