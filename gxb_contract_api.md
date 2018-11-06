## Index Table
| belong | api name | description |
| --- | --- | --- |
| <graphenelib/action.h> | current_receiver | 返回当前合约账号的id |
| <graphenelib/action.h> | get_action_asset_id | 返回本次调用向合约发送的资产id |
| <graphenelib/action.h> | get_action_asset_amount | 返回本次调用向合约发送的资产数量 |
| <graphenelib/asset.h> | withdraw_asset | 将当前合约的资产转移到外部账户 |
| <graphenelib/asset.h> | get_balance | 获取外部账户的某资产余额 |
| <graphenelib/crypto.h> | sha256 | 计算数据的sha256 |
| <graphenelib/crypto.h> | sha512 | 计算数据的sha512 |
| <graphenelib/crypto.h> | ripemd160 | 计算数据的ripemd160 |
| <graphenelib/crypto.h> | verify_signature | 验证签名 |
| <graphenelib/global.h> | get_head_block_num | 获取最新区块号 |
| <graphenelib/global.h> | get_head_block_id | 获取最新区块hash |
| <graphenelib/global.h> | get_head_block_time | 获取最新区块的时间，返回值单位秒 |
| <graphenelib/global.h> | get_trx_sender | 获取调用合约的账号的instance_id |
| <graphenelib/global.h> | get_account_id | 根据账号名获取账号的instance_id |
| <graphenelib/global.h> | get_asset_id | 根据资产名获取资产的instance_id |
| <graphenelib/system.h> | graphene_assert | 如果条件不满足，中断本次合约的执行并会滚所有状态 |
| <graphenelib/system.h> | graphene_assert_message | 如果条件不满足，输出必要的信息，但是本次合约的执行会继续 |
| <graphenelib/system.h> | print | 用于调试时日志的打印 |



## uint64_t current_receiver()

include: <graphenelib/action.h>

desc: 返回当前合约账号的id




## uint64_t get_action_asset_id()

include: <graphenelib/action.h>

desc: 返回本次调用向合约发送的资产id



### example1
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
call_contract nathan helloworld {"amount":10000000,"asset_id":1.3.1} deposit "{}" GXC true
调用helloworld的deposit方法，在deposit方法的实现中调用get_action_asset_id()将返回1
            



## uint64_t get_action_asset_amount()

include: <graphenelib/action.h>

desc: 返回本次调用向合约发送的资产数量




## void withdraw_asset(uint64_t from, uint64_t to, uint64_t asset_id, int64_t amount)

include: <graphenelib/asset.h>

desc: 将当前合约的资产转移到外部账户


**params:**

\<uint64_t\> from: 从哪个账号转账，一般是_self

\<uint64_t\> to: 转账到哪个外部账户，必须只传账号的instance_id，比如外部账户是1.2.33，那么传33即可

\<uint64_t\> asset_id: 指定转账的资产id，必须只传资产id的instance_id, 比如资产id是1.3.0， 那么传0即可

\<int64_t\> amount: 转账金额，这个数字包含了资产的精度，比如想转1个GXC，那么应该写100000




## int64_t get_balance(int64_t account, int64_t asset_id)

include: <graphenelib/asset.h>

desc: 获取外部账户的某资产余额


**params:**

\<int64_t\> account: 外部账户的instace_id

\<int64_t\> asset_id: 指定资产的instance_id




## void sha256(char data, uint32_t length, const checksum256 * hash)

include: <graphenelib/crypto.h>

desc: 计算数据的sha256


**params:**

\<char\> data: 用于计算sha256的字符串首地址

\<uint32_t\> length: data字符串的长度

\<const checksum256 *\> hash: 出参 用于存储计算的sha256




## void sha512(char data, uint32_t length, const checksum512 * hash)

include: <graphenelib/crypto.h>

desc: 计算数据的sha512


**params:**

\<char\> data: 用于计算sha512的字符串首地址

\<uint32_t\> length: data字符串的长度

\<const checksum512 *\> hash: 出参 用于存储计算的sha512




## void ripemd160(char data, uint32_t length, const checksum160 * hash)

include: <graphenelib/crypto.h>

desc: 计算数据的ripemd160


**params:**

\<char\> data: 用于计算ripemd160的字符串首地址

\<uint32_t\> length: data字符串的长度

\<const checksum160 *\> hash: 出参 用于存储计算的ripemd160




## bool verify_signature(const char data, uint32_t datalen, signature sig, const char * pub_key, uint32_t pub_keylen)

include: <graphenelib/crypto.h>

desc: 验证签名


**params:**

\<const char\> data: 签名的原始字符串

\<uint32_t\> datalen: data字符串的长度

\<signature\> sig: 签名数据

\<const char *\> pub_key: 签名私钥对应的公钥

\<uint32_t\> pub_keylen: 公钥的长度




## int64_t get_head_block_num()

include: <graphenelib/global.h>

desc: 获取最新区块号




## int64_t get_head_block_id()

include: <graphenelib/global.h>

desc: 获取最新区块hash




## int64_t get_head_block_time()

include: <graphenelib/global.h>

desc: 获取最新区块的时间，返回值单位秒




## int64_t get_trx_sender()

include: <graphenelib/global.h>

desc: 获取调用合约的账号的instance_id




## int64_t get_account_id(const char * data, uint32_t length)

include: <graphenelib/global.h>

desc: 根据账号名获取账号的instance_id


**params:**

\<const char *\> data: 账号名，例如nathan

\<uint32_t\> length: 账号名的长度，例如nathan的长度是6

如果帐户存在，返回帐户的instance_id，如果帐户不存在，则返回-1




## int64_t get_asset_id(const char * data, uint32_t length)

include: <graphenelib/global.h>

desc: 根据资产名获取资产的instance_id


**params:**

\<const char *\> data: 资产名

\<uint32_t\> length: 账号名的长度，例如nathan的长度是6




## void graphene_assert(uint32_t test, const char* msg)

include: <graphenelib/system.h>

desc: 如果条件不满足，中断本次合约的执行并会滚所有状态


**params:**

\<uint32_t\> test: 

\<const char*\> msg: 




## void graphene_assert_message(uint32_t test, const char* msg, uint32_t msg_len)

include: <graphenelib/system.h>

desc: 如果条件不满足，输出必要的信息，但是本次合约的执行会继续


**params:**

\<uint32_t\> test: 

\<const char*\> msg: 

\<uint32_t\> msg_len: 




## void print(const char* ptr)

include: <graphenelib/system.h>

desc: 用于调试时日志的打印


**params:**

\<const char*\> ptr: 



