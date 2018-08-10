## <a name="index"></a>index
category|portal|what you can do with it
---|---|---
合约 | [获取当前合约id](#current_receiver) | todo
资产 | [获取当前调用发送的资产id](#get_action_asset_id) | 记录合约的资产信息
资产 | [获取当前调用发送的资产数量](#get_action_asset_amount) | 记录合约的资产信息
资产 | [从当前合约转账到外部账号](#withdraw_asset) | 转账， 这是从合约账户转出资产的唯一方法
资产 账户 | [获取外部账户的某资产数量](#get_balance) | todo
crypto | [计算sha256](#sha256) | todo
crypto | [计算sha512](#sha512) | todo
crypto | [计算ripemd160](#ripemd160) | todo
crypto 签名 | [验证签名](#verify_signature) | 抢红包验证权限，一些权限的控制
区块 | [获取最新区块号](#get_head_block_num) | todo
区块 | [获取最新区块hash](#get_head_block_id) | 一些根据区块hash来公平的判断yes or no
区块 时间 | [获取最新区块时间(单位秒)](#get_head_block_time) | 锁仓合约的解锁条件，锁仓合约的线性释放
合约 | [获取当前合约调用者id](#get_trx_sender) | 业务逻辑需要记录调用者id
账户 | [通过账户名查询账户id](#get_account_id) | todo
资产 | [通过资产符号查询资产id](#get_asset_id) | todo
通用  | [断言](#) | 安全检查
通用 | [断言](#) | 安全检查
日志 | [print](#) | debug

## <a name="current_receiver"></a>uint64\_t current\_receiver()
desc: 返回当前合约账号的id  
include: \<graphenelib/action.h>  
example: 比如合约账号id是1.2.666，调用current_receiver()将返回666  
[go_back](#index)



## <a name="get_action_asset_id"></a>uint64\_t get\_action\_asset\_id()
desc: 返回本次调用向合约发送的资产id  
include: \<graphenelib/action.h>  
example: 

```c++
#include <graphenelib/action.h>
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/types.h>

using namespace graphene;

class helloworld : public contract
{
  public:
    helloworld(uint64_t id) 
        : contract(id)
    {   
    }   

    //@abi action
    //@abi payable
    void deposit()
    {   
        uint64_t asset_id = get_action_asset_id();
    }   
};

GRAPHENE_ABI(helloworld, (deposit))
```

对这个合约通过钱包客户端调用  
call\_contract nathan helloworld {"amount":10000000,"asset\_id":1.3.1} deposit "{}" GXC true  
调用helloworld的deposit方法，在deposit方法的实现中调用get\_action\_asset\_id()将返回1



## <a name="get_action_asset_amount"></a>uint64\_t get\_action\_asset\_amount()
desc: 返回本次调用向合约发送的资产id  
include: \<graphenelib/action.h>  
example: 

```c++
#include <graphenelib/action.h>
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/types.h>

using namespace graphene;

class helloworld : public contract
{
  public:
    helloworld(uint64_t id) 
        : contract(id)
    {   
    }   

    //@abi action
    //@abi payable
    void deposit()
    {   
        uint64_t asset_amount = get_action_asset_amount();
    }   
};

GRAPHENE_ABI(helloworld, (deposit))
```

对这个合约通过钱包客户端调用  
call\_contract nathan helloworld {"amount":10000000,"asset\_id":1.3.1} deposit "{}" GXC true  
调用helloworld的deposit方法，在deposit方法的实现中调用get\_action\_asset\_amount()将返回10000000

## <a name="withdraw_asset"></a>void withdraw_asset(uint64\_t from, uint64\_t to, uint64\_t asset\_id, int64\_t amount)
desc: 将当前合约的资产转移到外部账户  

param @from: 从哪个账号转账，一般是_self  
param @to: 转账到哪个外部账户，必须只传账号的instance\_id，比如外部账户是1.2.33，那么传33即可  
param @asset\_id: 指定转账的资产id，必须只传资产id的instance\_id, 比如资产id是1.3.0， 那么传0即可  
param @amount: 转账金额，这个数字包含了资产的精度，比如想转1个GXC，那么应该写100000  

include: \<graphenelib/asset.h>  
example: 

```c++
#include <graphenelib/action.h>
#include <graphenelib/asset.h>
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/types.h>

using namespace graphene;

class helloworld : public contract
{
  public:
    helloworld(uint64_t id) 
        : contract(id)
    {   
    }   

    //@abi action
    //@abi payable
    void deposit()
    {   
        uint64_t asset_amount = get_action_asset_amount();
    }
    
    //@abi action
    void testwithdraw() {
        withdraw_asset(_self, 33, 0, 100000);
    }
};

GRAPHENE_ABI(helloworld, (deposit)(testwithdraw))
``` 
call\_contract nathan helloworld null testwithdraw "{}" GXC true  
调用helloworld合约的testwithdraw方法，在testwithdraw方法中调用withdraw\_asset()从helloworld合约账户转账1个GXC到1.2.33账号
[实际的案例](https://github.com/gxchain/gxb-core/blob/dev_master/contracts/examples/bank2/bank.cpp) ,在bank2合约代码的withdraw方法的最后有调用这个api


## <a name="get_balance"></a>int64\_t get\_balance(int64\_t account, int64\_t asset_id)
desc: 获取外部账户的某资产数量  

param @account: 外部账户的instace\_id  
param @asset\_id: 指定资产的instance\_id  

include: \<graphenelib/asset.h>  
example: 比如账号1.2.66有10个GXC，调用get_balance(66, 0)将返回1000000  
[go_back](#index)


## <a name="sha256"></a>void sha256(char *data, uint32_t length, const checksum256 *hash)
desc: 计算数据的sha256  

param @data: 用于计算sha256的字符串首地址  
param @length: data字符串的长度  
param @hash: 出参 用于存储计算的sha256

include: \<graphenelib/crypto.h>  
example:   
[go_back](#index)


## <a name="sha512"></a>void sha512(char *data, uint32_t length, const checksum512 *hash)
desc: 计算数据的sha512  

param @data: 用于计算sha512的字符串首地址  
param @length: data字符串的长度  
param @hash: 出参 用于存储计算的sha512

include: \<graphenelib/crypto.h>  
example:   
[go_back](#index)


## <a name="ripemd160"></a>void ripemd160(char *data, uint32_t length, const checksum160 *hash)
desc: 计算数据的ripemd160  

param @data: 用于计算ripemd160的字符串首地址  
param @length: data字符串的长度  
param @hash: 出参 用于存储计算的ripemd160

include: \<graphenelib/crypto.h>  
example:   
[go_back](#index)


## <a name="verify_signature"></a>bool verify\_signature(const char *data, uint32\_t datalen, signature* sig,  const char *pub\_key, uint32\_t pub\_keylen)
desc: 验证签名  

param @data: 签名的原始字符串  
param @datalen: data字符串的长度  
param @sig: 签名数据  
param @pub_key: 签名私钥对应的公钥
param @pub_keylen: 公钥的长度

return true(1):验签通过 / false(0):验签失败  

include: \<graphenelib/crypto.h>  
example:   
[go_back](#index)


## <a name="get_head_block_num"></a>int64\_t get\_head\_block\_num()
desc: 获取当前区块号  
include: \<graphenelib/global.h>  
example: [contracts/examples/redpacket/redpacket.cpp::issue](https://github.com/gxchain/gxb-core/blob/dev_master/contracts/examples/redpacket/redpacket.cpp) line39  
[go_back](#index)


## <a name="get_head_block_id"></a>int64\_t get\_head\_block\_time()
desc: 获取最新区块hash  
include: \<graphenelib/global.h>  
example: todo  
[go_back](#index)


## <a name="get_head_block_time"></a>int64\_t get\_head\_block\_time();
desc: 获取最新区块的时间，返回值单位秒  
include: \<graphenelib/global.h>  
example: [contracts/examples/dice/dice.cpp::reveal](https://github.com/gxchain/gxb-core/blob/dev_master/contracts/examples/dice/dice.cpp) line223  
[go_back](#index)


## <a name="get_trx_sender"></a>int64\_t get\_trx\_sender()
desc: 获取调用合约的账号的instance\_id  
include: \<graphenelib/global.h>  
example: [contracts/examples/dice/dice.cpp::deposit](https://github.com/gxchain/gxb-core/blob/dev_master/contracts/examples/dice/dice.cpp) line62  
[go_back](#index)


## <a name="get_account_id"></a>int64\_t get\_account\_id(const char *data, uint32\_t length)
desc: 根据账号名获取账号的instance\_id  

param @data: 账号名，例如nathan
param @length: 账号名的长度，例如nathan的长度是6
include: \<graphenelib/global.h>  
example: [contracts/examples/redpacket/redpacket.cpp::open](https://github.com/gxchain/gxb-core/blob/dev_master/contracts/examples/redpacket/redpacket.cpp) line78  
[go_back](#index)


## <a name="get_asset_id"></a>int64\_t get\_asset\_id(const char *data, uint32\_t length)
desc: 根据资产名获取资产的instance\_id  
include: \<graphenelib/global.h>  
example: [contracts/examples/verify_sign/verify_sign.cpp::verify](https://github.com/gxchain/gxb-core/blob/dev_master/contracts/examples/redpacket/redpacket.cpp) line24  
[go_back](#index)


## <a name="graphene_assert"></a>void  graphene\_assert(uint32\_t test, const char* msg);
desc: 如果条件不满足，中断本次合约的执行并会滚所有状态  
include: \<graphenelib/system.h>  
example: no need  
[go_back](#index)


## <a name="graphene_assert_message"></a>void  graphene\_assert\_message(uint32\_t test, const char* msg, uint32\_t msg\_len)
desc: 如果条件不满足，输出必要的信息，但是本次合约的执行会继续  
include: \<graphenelib/system.h>  
example: no need  
[go_back](#index)


## <a name="print"></a>void print(const char* ptr)
desc: 用于调试时日志的打印  
include: \<graphenelib/print.hpp>  
example: no need  
[go_back](#index)


