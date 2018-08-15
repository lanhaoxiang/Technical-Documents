
# testnet 智能合约快速入门

------------
### 智能合约介绍

GXChain智能合约，底层使用WebAssembly虚拟机，目前支持C++语言的智能合约编写。

体验智能合约有两种方式： 使用智能合约IDE工具 和 使用cli_wallet
### 快速开始 （通过智能合约IDE）
#### 1. 注册testnet钱包帐户

访问testnet网页钱包 ```https://testnet.wallet.gxchain.org/#/``` 注册钱包帐户，注册完成后。


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

class hello : public contract // hello合约继承自contract合约
{
  public:
    hello(uint64_t id)
        : contract(id) // 合约构造函数
    {
    }

    /// @abi action
    void hi(std::string user) // 合约方法
    {
        print("hi, ", user, "\n");
    }
};

GRAPHENE_ABI(hello, (hi)) // GRAPHENE_ABI 用来注册合约的abi
```

#### 4. 编译智能合约

![](/assets/contract_compile.png)

#### 5. 部署智能合约
![](/assets/contract_deploy.png)


#### 6. 调用智能合约
![](/assets/contract_call.png)


### 快速开始 (使用本地命令行方式)

#### 1. GXChain源码编译

如果不想使用智能合约IDE工具，可以本地编译GXChain程序，通过命令行方式编译、部署、调用智能合约。
GXChain源码编译，目前支持ubuntu系统和mac系统：
- Build on Ubuntu： https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU
- Build on OS X： https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X

#### 2. 编译合约
生成模板helloworld
```
gxx -n helloworld
```

#### 3. 编译合约
编译合约，生成wast和wasm文件
```
gxx -o helloworld/helloworld.wast helloworld/helloworld.cpp
```
生成abi文件
```
gxx -g helloworld/helloworld.abi helloworld/helloworld.cpp
```

#### 4. 部署合约
需要开启cli_wallet，连接本地节点或者远程testnet节点
```
./programs/cli_wallet/cli_wallet -swss://testnet.gxchain.org --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```
导入钱包私钥
```
# 如果是新钱包，需要设置一个解锁密码，此处为mylocalpassword
new >>> set_password mylocalpassword

# 解锁
locked >>> unlock mylocalpassword

# 导入钱包私钥
unlocked >>> import_key your_account_name your_private_key

# 部署合约, 指定合约名为helloworld，发起的钱包帐户为your_accoutn_name， 0和0分别为vm type和vm version，./helloworld为wast/abi文件所在路径， GXS表示手续费资产类型，true表示发起广播
unlocked >>> deploy_contract helloworld your_account_name 0 0 ./helloworld GXS true
```

#### 5. 调用合约
部署合约成功后，可以使用get_account接口查询合约
```
unlocked >>> call_contract nathan helloworld null hi "{\"user\":\"zhuliting\"}" GXS true

```

### 其它参考：
#### 安装GXChain testnet网络全节点程序
如果不想使用testnet提供的接入点，也可以本地部署一个全节点。
安装GXChain testnet全节点安装方法：
```
# 下载testnet的genesis.json文件
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/genesis/testnet-genesis.json -O genesis.json

# 下载程序包， ubuntu安装包
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_ubuntu_1.0.180809.beta.tar.gz -O gxb_ubuntu_1.0.180809.beta.tar.gz
# 解压
tar zxvf gxb_ubuntu_1.0.180809.beta.tar.gz

# 启动witness_node, 同步testnet区块数据
./programs/witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" --seed-nodes='["testnet.gxchain.org:6789"]' --genesis-json genesis.json &

# 启动完成后，可以观察./testnet_node/log/witness.log观察区块同步情况，区块同步过程中每10000个区块会打印一条日志，同步完成后，每3秒打印一条日志ß
```

testnet 安装文档 ：https://github.com/gxchain/Technical-Documents/blob/master/test%20net.md

#### 智能合约 API 参考文档
文档中列出了一些API和使用示例，供智能合约在运行时调用：
https://github.com/gxchain/Technical-Documents/blob/master/gxb_contract_api.md

#### 智能合约示例:
- helloworld合约： https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/helloworld
- 充值提现合约： https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/bank
- 红包合约： https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/redpacket

[note] 测试智能合约时需要注意，目前的存储索引只支持primary_key。
