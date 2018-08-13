
# testnet 智能合约快速入门

------------
### 智能合约介绍

GXChain智能合约，底层使用WebAssembly虚拟机，目前支持C++语言的智能合约编写。

### 快速开始
#### 1. 注册testnet钱包帐户

访问testnet网页钱包 ```https://testnet.wallet.gxchain.org``` 注册钱包帐户，注册完成后，帐户会有200 GXS的余额


#### 2. 下载智能合约IDE
通过智能合约IDE，可以编写、编译、部署、调用智能合约。
下载地址： 待补充

#### 3. 编辑智能合约

比如一个简单的hello合约， 源代码如下:
```
#include <graphenelib/graphene.hpp>
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/print.hpp>
#include <graphenelib/types.h>

using namespace graphene;

class hello : public contract
{
  public:
    hello(uint64_t id)
        : contract(id)
    {
    }

    /// @abi action
    void hi(std::string user)
    {
        print("hi, ", user, "\n");
    }
};

GRAPHENE_ABI(hello, (hi))
```

#### 4. 编译智能合约

![](/assets/contract_compile.png)

#### 5. 部署智能合约
![](/assets/contract_deploy.png)


#### 6. 调用智能合约
![](/assets/contract_call.png)


#### 安装GXChain testnet网络全节点程序
如果不想使用testnet提供的接入点，也可以本地部署一个全节点。
安装GXChain testnet全节点安装方法：
```
# 下载testnet的genesis.json文件
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/genesis/testnet-genesis.json -O genesis.json

# 下载程序包
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_ubuntu_1.0.180809.beta.tar.gz -O gxb_ubuntu_1.0.180809.beta.tar.gz
# 解压
tar zxvf gxb_ubuntu_1.0.180809.beta.tar.gz

# 启动witness_node, 同步testnet区块数据
./programs/witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" --seed-nodes='["106.14.180.117:6789"]' --genesis-json genesis.json &

# 启动完成后，可以观察./testnet_node/log/witness.log观察区块同步情况，区块同步过程中每10000个区块会打印一条日志，同步完成后，每3秒打印一条日志ß
```

testnet 安装文档 ：https://github.com/gxchain/Technical-Documents/blob/master/test%20net.md


#### GXChain源码编译

如果不想使用智能合约IDE工具，可以本地编译GXChain程序，通过命令行方式编译、部署、调用智能合约。
GXChain源码编译，目前支持ubuntu系统和mac系统：
- Build on Ubuntu： https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU
- Build on OS X： https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X


#### 智能合约API 接口文档
文档中列出了一些API和使用示例，供智能合约在运行时调用：
https://github.com/gxchain/Technical-Documents/blob/master/gxb_contract_api.md

#### 智能合约example:
- helloworld合约： https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/helloworld
- 充值提现合约： https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/bank
- 红包合约： https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/redpacket
