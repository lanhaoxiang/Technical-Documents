# 数据源接入 {#数据源接入}

数据源指数据卖方，在公信链上是出售数据的角色。数据源出售数据需要完成以下几个步骤：

## 第一步：完成商户认证 {#第一步：完成商户认证}

请参考[商户接入](https://doc.gxb.io/box/merchant.html)完成前两个步骤

## 第二步：认证成为数据源 {#第二步：认证成为数据源}

注册完成后，按照下图的步骤完成数据源的认证

![](/assets/datasource-verify.png)

按要求填写数据源认证信息，所有内容都是必填的，请不要随意填写，我们会对你提交的资料进行审核

![](/assets/datasource-apply.png)

提交资料后请耐心等待我们的审核

> 生产数据描述例如：运营商数据
>
> 数据生产能力描述：接入一手运营商数据源

## 第三步：运行GXB-Box {#第三步：运行gxb-box}

#### 下载GXB-Box（为了便于升级，推荐使用[源码方式启动](https://doc.gxb.io/box/other.html#sourcecode)） {#下载gxb-box（为了便于升级，推荐使用源码方式启动）}

| 系统 | 下载地址 |
| :--- | :--- |
| Mac | [http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-box/gxb-box-mac-2017-09-26.tar.gz](http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-box/gxb-box-mac-2017-09-26.tar.gz) |
| Linux | [http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-box/gxb-box-linux-2017-09-26.tar.gz](http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-box/gxb-box-linux-2017-09-26.tar.gz) |
| Win32 | [http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-box/gxb-box-win32-2017-09-26.zip](http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-box/gxb-box-win32-2017-09-26.zip) |
| Win64 | [http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-box/gxb-box-win64-2017-09-26.zip](http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-box/gxb-box-win64-2017-09-26.zip) |

#### 解压程序包gxb-box.zip {#解压程序包gxb-boxzip}

解压后目录结构如下

![](/assets/unzip.png)

#### 配置config.json {#配置configjson}

使用编辑器打开解压目录下的config.json

![](/assets/config_json.png)

```
{
  "common": { 
    "port": "3000", //启动端口
    "ipfs_addr": "/ip4/127.0.0.1/tcp/5001",
    "witnesses":["wss://node1.gxb.io","wss://node5.gxb.io","wss://node8.gxb.io","wss://node11.gxb.io"],
    "faucet_url": "https://opengateway.gxb.io"
  },
  "datasource": { //数据源配置，商户无需配置
    "account_name": "账户名",
    "private_key": "账户私钥",
    "service": "http://localhost:3000/demo/call", //数据源数据接口
    "subscribed_data_product": [ //该数据源对应产品id列表，订阅产品购买请求
      "1.17.0",
      "1.17.1"
    ]
  }
}
```

如何查看**私钥**，请阅读[其他说明](https://doc.gxb.io/box/other.html#privatekey)

#### 启动GXB-Box {#启动gxb-box}

Mac, Linux系统：

```
bash start.sh
```

Windows系统，在cmd下执行：

```
./start.cmd
```

> 源码方式运行请查看源码地址：[https://github.com/gxchain/gxb-box](https://github.com/gxchain/gxb-box)

生产环境下推荐使用[pm2启动](https://doc.gxb.io/box/other.html#pm2)

## 第四步：上架数据 {#第四步：上架数据}

> 暂时没有开放自主上架功能，请联系我们的商务[bd@gxb.io](mailto:bd@gxb.io)进行数据产品上架操作

上架好数据后会得到一个产品id，以KYC认证数据产品上架为例：

![](/assets/KYC_PARAMS.png)

产品ID为：**1.17.0**

#### 1. 修改config.json 中`datasource.subscribed_data_product`的配置： {#1-修改configjson-中datasourcesubscribeddataproduct的配置：}

```
{
  "common": { 
    "port": "3000", //启动端口
    "ipfs_addr": "/ip4/127.0.0.1/tcp/5001",
    "witnesses":["wss://node1.gxb.io","wss://node5.gxb.io","wss://node8.gxb.io","wss://node11.gxb.io"],
    "faucet_url": "https://opengateway.gxb.io",
    "privacy_request_timeout":120000, //隐私交易默认超时时间
    "default_timeout":8000 //普通交易默认超时时间
  },
  "datasource": { //数据源配置，商户无需配置
    "account_name": "账户名",
    "private_key": "账户私钥",
    "service": "http://localhost:3000/demo/call", //数据源数据接口
    "subscribed_data_product": [ //该数据源对应产品id列表，订阅产品购买请求
      "1.17.0"
    ]
```

#### 2. 在配置的`datasource.service`对应接口中实现对product\_id=1.17.0的处理 {#2-在配置的datasourceservice对应接口中实现对productid1170的处理}

service收到的请求格式如下，请求方法为post：

```
{
    "request_id": "fb17941dce8dc78d6275b04afbb4a5202f7fd4defca4918cf21c913abe706d4e", // 请求id
    "product_id": "1.17.0", //产品id
    "params": { // 入参定义对应的请求消息体
        "name": "张三",
        "idcard": "张三的身份证号",
        "photo": "张三的照片base64"
    }
}
```

#### 3. 返回数据格式说明 {#3-返回数据格式说明}

service需要返回固定格式的数据结构：

```
{
     code:'',
     data:Object
}
```

如KYC认证的出参说明：

| 名称 | 类型 | 说明 |
| :--- | :--- | :--- |
| result | boolean | 是否匹配 |

自定义业务状态码（可选项，也可直接定义在出参说明中）：

| 状态码 | 描述 |
| :--- | :--- |
| 0 | 匹配成功 |
| -1 | 姓名身份证号不匹配 |
| -2 | 身份与照片不匹配 |

因此一个有效的返回结果应该是：

```
{
    code:'0', // code必须是上面定义的 0 -1 -2中的一个，若没有定义业务状态码，则code传空字符串或者null都可以
    data:{
        result:true //result必须是boolean类型的
    }
}
```

>入参和出参支持integer, boolean, string, number, array复杂格式的数据可以参考

[其他说明-复杂格式数据定义](https://doc.gxb.io/box/other.html#complex)

