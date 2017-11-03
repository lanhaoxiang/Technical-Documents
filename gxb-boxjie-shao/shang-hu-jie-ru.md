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

| 系统 |
| :--- |


|  | 下载地址 |
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

