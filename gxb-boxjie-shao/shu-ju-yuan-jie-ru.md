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

