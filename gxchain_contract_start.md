
#  智能合约快速入门（testnet）
#  Smart Contract Quick Start (testnet)

------------
### 一、智能合约介绍
### 1.Introduction to Smart Contract

GXChain智能合约2.0，底层使用WebAssembly虚拟机，目前支持C++语言的智能合约编写。
开发者使用C++编写智能合约，通过llvm将代码编译成WebAssembly（又名WASM），部署到区块链上，通过智能合约ABI(Application Binary Interface，应用程序的二进制接口)和智能合约交互。

GXChain Smart Contract2.0, with the WebAssembly underlying protocol virtual machine, now is supproting by C++.
Developers are able to use C++ to write smart contracts, turning code into WebAssembly through 11vm (Also known as WASM), and allows for easy and fast depolyment supported by smart contract ABI(Application Binary Interface) and smart contracts interaction.

##### 智能合约 API 参考文档
##### Smart Contract API Reference Document

文档中列出了一些API和使用示例，可以在编写合约时调用：
Some APIs and usage examples are listed in the document below, and can be called when writing a contract:
https://github.com/gxchain/Technical-Documents/blob/master/gxb_contract_api.md

智能合约存储参考文档：https://github.com/gxchain/Technical-Documents/blob/master/contract/contract_storage_usage.md
Smart Contract Storage Reference Document

##### 智能合约示例:
##### Smart Contract Examples:
* helloworld合约： https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/helloworld
* 充值提现合约： https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/bank
* 红包合约： https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/redpacket
* 线性释放资产合约：https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/linear_vesting_asset
* 基于hash验证的猜谜合约：https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/riddle

*helloworld Contract
*Deposit & Withdrawal Contract
*Gift Money Contract
*Linear Release Assets Contract
*Guessing Game based on Hash Verification Contract


体验智能合约有两种方式： 使用智能合约IDE工具 和 使用cli_wallet
Two ways to experience Smart Contract:Use Smart Contract IDE Tools and Use cli_wallet

### 二、 快速开始 （通过智能合约IDE）
### 2. Quick Start(Through Smart Contract IDE)

#### 1. 注册testnet钱包帐户
#### 1. Register testnet (wallet)account

访问[testnet网页钱包](https://testnet.wallet.gxchain.org/#/)  ```https://testnet.wallet.gxchain.org/#/``` 注册钱包帐户。
注册完成后，点击[这里](http://blockcity.mikecrm.com/2SVDb67) 申领测试GXS。

Visit[testnet web wallet](https://testnet.wallet.gxchain.org/#/)  ```https://testnet.wallet.gxchain.org/#/```to register (wallet)account.
Then, click [here](http://blockcity.mikecrm.com/2SVDb67) to apply for testing GXS.

#### 2. 下载智能合约IDE
#### 2. Download Smart Contract IDE

通过智能合约IDE，可以编写、编译、部署、调用智能合约。
Developers are able to compose,compile,depoly and call smart contracts by using Smart Contract IDE

[IDE下载地址](https://github.com/gxchain/gxchain-alpha/releases)
[IDE Download Address](https://github.com/gxchain/gxchain-alpha/releases)

#### 3.导入账户
#### 3. Import Account

先去步骤一中的testnet网页钱包找到自己的活跃权限私钥
Go to the first step to get the active permission private key in the testnet web wallet

![](./assets/ide/queryPvk.png)

![](./assets/ide/queryPvk2.png)

再打开客户端，进入设置页面，导入账户(密码不会上传到服务器，如果忘记需要移除账户重新导入)：
Then, open up the client, find setting page, and import the account (Password will not upload in to server, you have to remove account and re-import if you forget)

![](./assets/ide/import.png)

#### 4.选择模板工程
#### 4. Select Template Project

![](./assets/ide/addProject.png)

#### 5. 编译
#### 5.Compile

![](./assets/ide/compile.png)

#### 6.部署
#### 6.Deploy

部署之前需要先解锁钱包
Wallet needs to be unlocked before depolyment

![](./assets/ide/deploy.png)

![](./assets/ide/deploy2.png)

#### 7.调用
#### 7.Call

与部署一样，也需要先解锁钱包
Same has delopyment, wallet needs to be unlocked

![](./assets/ide/call.png)

![](./assets/ide/call2.png)


### 三、快速开始 (使用本地命令行方式)
### 3. Quick Start (With Local Command-Line)

#### 1. GXChain源码编译
#### 1. GXChain Source Code Compilation

如果不想使用智能合约IDE工具，可以本地编译GXChain程序，通过命令行方式编译、部署、调用智能合约。
GXChain源码编译，目前支持ubuntu系统和mac系统：
If developoers do not want to use Smart Contract IDE Tools, they can choose to compile GXChain Program locally. They can use command-line interface to compose,compile,depoly and call smart contracts

- Build on Ubuntu： https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU
- Build on OS X： https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X

#### 2. 编译合约
### 2. Compile Contract

使用gxx的模板创建一个helloworld合约
Use gxx's template to creat a helloworld contract
```
gxx -n helloworld
```

#### 3. 编译合约，生成wast和abi
#### 3. Compile Contract to Generate wast and abi

编译合约，生成wast和wasm文件
Compile Contract to Generate wast and wasm files
```
gxx -o helloworld/helloworld.wast helloworld/helloworld.cpp
```
生成abi文件
Generate abi files
```
gxx -g helloworld/helloworld.abi helloworld/helloworld.cpp
```

#### 4. 部署合约
#### 4. Depoly Contract

需要开启cli_wallet，连接本地节点或者远程testnet节点
Open up cli_wallet, connect to local nodes or remote testnet nodes
```
./programs/cli_wallet/cli_wallet -swss://testnet.gxchain.org --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```

导入钱包私钥
Import wallet private key
```
# 如果是新钱包，需要设置一个解锁密码，此处为mylocalpassword
# If this is a new wallet, deveoplers need to set up a password, here is mylocalpassword

new >>> set_password mylocalpassword

# 解锁
# Unlock

locked >>> unlock mylocalpassword

# 导入钱包私钥
# Import Wallet private key

unlocked >>> import_key your_account_name your_private_key

# 部署合约, 指定合约名为helloworld，发起的钱包帐户为your_accoutn_name， 0和0分别为vm type和vm version，./helloworld为wast/abi文件所在路径， GXS表示手续费资产类型，true表示发起广播
# Depoly Contract, the contract is named as "helloword", initiate wallet account is "your_accoutn_name" , 0 and 0 are "vm type"&"vm version",/helloworld is the path where the waste/abi file is located, GXS indicates the transaction fee asset type, true indicates that the broadcast is initiated.

unlocked >>> deploy_contract helloworld your_account_name 0 0 ./helloworld GXS true
```

#### 5. 调用合约
#### 5. Call Contract

部署合约成功后，可以使用get_account接口查询合约
After successfully deploy the contract, you can use the "get_account" interface to query the contract.
```
unlocked >>> call_contract nathan helloworld null hi "{\"user\":\"zhuliting\"}" GXS true

```

### 其它参考：
### Other Reference:

#### 安装GXChain testnet网络全节点程序
#### Install GXChain Testnet Network Full Node Program

如果不想使用testnet提供的接入点，也可以本地部署一个全节点。
安装GXChain testnet全节点安装方法：

If developers do not want to use the access point provided by testnet, they can also deploy a full node locally.
Install GXChain Testnet Full Node Installation:

```
# 下载testnet的genesis.json文件
# Download genesis.json in testnet

wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/genesis/testnet-genesis.json -O genesis.json

# 下载程序包， ubuntu安装包
# Download package, ubuntu installation package

wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_ubuntu_1.0.180809.beta.tar.gz -O gxb_ubuntu_1.0.180809.beta.tar.gz

# 解压
# Decompression
tar zxvf gxb_ubuntu_1.0.180809.beta.tar.gz

# 启动witness_node, 同步testnet区块数据
# Start the witness_node, synchronize the testnet block data

./programs/witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" --seed-nodes='["testnet.gxchain.org:6789"]' --genesis-json genesis.json &

# 启动完成后，可以观察./testnet_node/log/witness.log观察区块同步情况，区块同步过程中每10000个区块会打印一条日志，同步完成后，每3秒打印一条日志ß
# After the startup process is complete, you can observe ./testnet node/log/witness.log to observe the block synchronization. During the block synchronization process, a log will be printed for every 10000 blocks. After the synchronization is completed, a log will be printed every 3 seconds.

```

testnet 安装文档 ：https://github.com/gxchain/Technical-Documents/blob/master/test%20net.md
testnet installation documentation: https://github.com/gxchain/Technical-Documents/blob/master/test%20net.md

testnet 区块浏览器：https://testnet.explorer.gxchain.org/#/
testnet block browser: https://testnet.explorer.gxchain.org/#/

testnet 网页钱包：https://testnet.wallet.gxchain.org/
testnet web wallet: https://testnet.wallet.gxchain.org/

testnet 钱包接入点：wss://testnet.gxchain.org
testnet wallet access point: wss://testnet.gxchain.org

[note] 测试智能合约时需要注意：
[note] When testing smart contracts:

* 目前的存储表(Multi-Index table)不支持的类型：int128, int256, float, double。
* The current storage table (Multi-Index table) does not support types: int128, int256, float, double.
