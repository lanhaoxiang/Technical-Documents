# 商户接入 {#商户接入}

商户指数据买方，在公信链上是购买数据的角色。商户购买数据需要完成以下几个步骤：

## 第一步：完成注册流程 {#第一步：完成注册流程}

* 使用Chrome浏览器访问：
  [https://wallet.gxb.io](https://wallet.gxb.io/)
* 完成账户注册
* 按照提示备份钱包私钥
  **（重要，重要，重要）**

> 密钥是账户的唯一凭证，丢失后无法找回。浏览器不支持，也可以使用钱包客户端，下载地址：[https://gxb.io/\#downLoad](https://gxb.io/#downLoad)

## 第二步：认证成为商户 {#第二步：认证成为商户}

注册完成后，按照下图的步骤完成商户的认证

![](/assets/merchant_verify.png)

按要求填写数据源认证信息，所有内容都是必填的，请不要随意填写，我们会对你提交的资料进行审核

![](/assets/merchant_apply.png)

点击提交后请耐心等待我们的审核

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
  "common": { // 通用配置，无需改动
    "port": "3000", //启动端口
    "ipfs_addr": "/ip4/127.0.0.1/tcp/5001",
    "witnesses":["wss://node1.gxb.io","wss://node5.gxb.io","wss://node8.gxb.io","wss://node11.gxb.io"],
    "faucet_url": "https://opengateway.gxb.io"
  },
  "merchant": { //商户配置，数据源无需配置
    "account_name": "账户名",
    "private_key": "账户私钥",
    "callback_url": "http://localhost:3000/demo/callback", //数据回调地址，数据返回后会以Post方式推送到这个地址
    "privacy_request_timeout":120000, //隐私交易默认超时时间
    "default_timeout":8000 //普通交易默认超时时间
  }
}
```

如何查看**私钥**，请阅读[其他说明](https://doc.gxb.io/box/other.html#privatekey)

####  {#启动gxb-box}

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

## 第四步：调用接口 {#invoke}

以KYC认证产品调用为例

![](/assets/KYC_PARAMS.png)假设GXB-Box启动在**3000**端口

则接口地址为：`http://localhost:3000/rpc/1.17.0/1.0.2`

> 其中**1.17.0**为产品id，**1.0.2**为当前接口版本号

**浏览器访问**: \(推荐使用Postman以及Post方式调用接口\)

```
http://localhost:3000/rpc/1.17.0/1.0.2?name=姓名&idcard=身份证号&photo=照片base64

```

得到以下结果:

![](/assets/request_id.png)

得到的不是请求结果而是一个request\_id，因为整个过程不是一个长连接，接口调用是一个异步的过程，而联盟市场存在一个请求多个返回的情况

> 经过测试，自由市场一笔数据交易时间最快可在500ms内完成

假设设置的回调地址\(merchant.callback\_url\)为`http://localhost:3000/demo/callback`

很快会收到**数据推送**：

![](/assets/callback_result.png)

**数据格式**如下

```
{
        "request_id": "fb17941dce8dc78d6275b04afbb4a5202f7fd4defca4918cf21c913abe706d4e", // 前面返回的request_id
        "datasource": "1.2.21", //数据源id
        "body": {
                "message": "", //业务状态码的描述
                "data": { //对应出参说明中的结果
                        "result": true
                },
                "code": 0 //业务状态码
        }
}
```

### API接口 {#api接口}

除了数据推送外，GXB-Box提供了2个查询接口:

#### 1. 从链上获取request状态信息 {#1--从链上获取request状态信息}

```
GET /api/request/:request_id
```

请求示例:

```
http://localhost:3000/api/request/6c2d7a4605c7019877a456d0d30db31c9221672f08991c8750cb834c1f80dd2f
```

返回示例:

```
{
```

```
    "id": "1.20.858",
    "request_id": "6c2d7a4605c7019877a456d0d30db31c9221672f08991c8750cb834c1f80dd2f",
    "product_id": "1.18.0",
    "version": "1.0.1",
    "params": "CBhO4Zx/r7pCbbvnkpJXROIn8QrS8UkevzS3cX1XOoyfqukPYH4+cf1VOIIaBSDmURU1o/M332JHLXtrfYzPDuiLPg4nNewCn3fneep3aYPHjfK4CfUpVPrJx4QqwJY63X444panfsBbUh6HFPz2iw==",
    "status": 1, //0:初始化,1:已确认,99:隐私交易拒绝
    "create_date_time": "2017-07-24T13:27:36",
    "requester": "1.2.19",
    "league_id": "1.19.0",
    "memo": "",
    "datasources_status": [
        {
            "datasource": "1.2.19",
            "status": 0 //0:未上传，1:已上传 2:已支付 99:数据源上传出错
        },
        {
            "datasource": "1.2.21",
            "status": 2
        },
        {
            "datasource": "1.2.24",
            "status": 0
        },
        {
            "datasource": "1.2.23",
            "status": 2
        }
    ]
}

```

#### 2. 从本地获取已购买数据 {#2--从本地获取已购买数据}

```
GET /api/request/:request_id/data

```

请求示例:

```
http://localhost:3000/api/request/6c2d7a4605c7019877a456d0d30db31c9221672f08991c8750cb834c1f80dd2f/data

```

返回示例:

```
[
    {
        "request_id": "6c2d7a4605c7019877a456d0d30db31c9221672f08991c8750cb834c1f80dd2f",
        "datasource": "1.2.21",
        "body": {
            "message": "",
            "data": {
                "result": true
            },
            "code": 0
        }
    },
    {
        "request_id": "6c2d7a4605c7019877a456d0d30db31c9221672f08991c8750cb834c1f80dd2f",
        "datasource": "1.2.23",
        "body": {
            "message": "",
            "data": {
                "result": true
            },
            "code": 0
        }
    }
]

```



[  
](https://doc.gxb.io/box/datasource.html)

