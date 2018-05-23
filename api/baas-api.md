# BaaS 存储API使用说明

本文档介绍了如何快速调用公信宝BaaS 存储API，适用于API开发者，需要一定的编程基础。因主链存在存储空间大小的限制，我们的解决方法是将文件本体存储在侧链（IPFS）上，将侧链产生的文件C-ID返还至主链进行存证。在主链上保存的C-ID和时间戳可以保证上链数据不可篡改的基本原则。

![](/assets/WX20180417-213937@2x.png)

## 1. 创建帐户

首先，你需要拥有一个公信宝钱包帐户，用于调用 BaaS存储服务时，支付存储费用并在区块链上记帐。

如果已经拥有公信宝钱包帐户，可以跳过此步骤。

如果还没有公信宝钱包帐户，可以通过手机钱包、网页钱包创建帐户。

PC端钱包/网页钱包使用教程:

1. 注册和备份教程：[http://mp.weixin.qq.com/s/eNQyqY5dyaP299J5qra0Bg](http://mp.weixin.qq.com/s/eNQyqY5dyaP299J5qra0Bg)
2. 恢复和导入教程：[http://mp.weixin.qq.com/s/27v540tvhfDHF6Bv5\_ObKQ](http://mp.weixin.qq.com/s/27v540tvhfDHF6Bv5_ObKQ)

手机钱包教程：[https://forum.gxb.io/topic/130/gxs-移动端钱包发布-说明文档-ios审核已通过](https://forum.gxb.io/topic/130/gxs-移动端钱包发布-说明文档-ios审核已通过)

## 2. 导出私钥

从手机钱包或者网页钱包导出帐户的活跃权限私钥，供后面调用SDK时使用。

## 3. BaaS存储服务地址

* 线上正式地址:  **https://baas.gxchain.cn/api/storage**
* 线上开发者测试地址: **https://baas-developer.gxchain.cn/api/storage**

## 4. 如何调用SDK

SDK提供了和BaaS存储服务交互的方法封装。目前暂时提供Java版本的SDK，后续会支持多种语言。

#### Java - maven

* maven仓库地址(HTML View): [https://repo.gxchain.cn/service/rest/repository/browse/maven-public/](https://repo.gxchain.cn/service/rest/repository/browse/maven-public/)
* maven仓库引入地址: **https://repo.gxchain.cn/repository/maven-public/**

**(ps: 如果无法引入包，请将https更换成http尝试一下)**


#### pom dependency

```xml
<dependency>
    <groupId>com.gxb.block.baas</groupId>
    <artifactId>baas-sdk-client</artifactId>
    <version>1.0.0-RELEASE</version>
</dependency>
```

## BaaS存储服务API接口

| 接口 | 描述 |
| :--- | :--- |
| [storeFee](/api/baas-api/huo-qu-fei-lv-jie-kou.md) | 获取存储费率，以GXS支付 |
| [store](/api/baas-api/shu-ju-cun-chu-jie-kou.md) | 数据存储接口 |
| [data](/api/baas-api/huo-qu-yi-cun-shu-ju-jie-kou.md) | 获取数据接口，根据cid获取数据 |



