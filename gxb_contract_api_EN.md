## Index Table
| belong | api name | description |
| --- | --- | --- |
| <graphenelib/action.h> | current_receiver | return current contract account ID |
| <graphenelib/action.h> | get_action_asset_id | get aseet ID of this call |
| <graphenelib/action.h> | get_action_asset_amount | get asset amount of this call |
| <graphenelib/asset.h> | withdraw_asset | withdraw current account asset to another account |
| <graphenelib/asset.h> | get_balance | get balance of some account |
| <graphenelib/crypto.h> | sha256 | get data's sha256 |
| <graphenelib/crypto.h> | sha512 | get data's sha512 |
| <graphenelib/crypto.h> | ripemd160 | get data's ripemd160 |
| <graphenelib/crypto.h> | verify_signature | verify signature |
| <graphenelib/global.h> | get_head_block_num | get latest block number |
| <graphenelib/global.h> | get_head_block_id | get latest block hash |
| <graphenelib/global.h> | get_head_block_time | get latest block time, unit is seconds |
| <graphenelib/global.h> | get_trx_sender | get caller account's instance_id |
| <graphenelib/global.h> | get_account_id | get account instance_id by account name |
| <graphenelib/global.h> | get_asset_id | get asset instance_id by asset name |
| <graphenelib/system.h> | graphene_assert |  |
| <graphenelib/system.h> | graphene_assert_message |  |
| <graphenelib/system.h> | print |  |



## uint64_t current_receiver()

include: <graphenelib/action.h>

desc: return current contract account ID




## uint64_t get_action_asset_id()

include: <graphenelib/action.h>

desc: get aseet ID of this call



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
test for desc 123



## uint64_t get_action_asset_amount()

include: <graphenelib/action.h>

desc: get asset amount of this call




## void withdraw_asset(uint64_t from, uint64_t to, uint64_t asset_id, int64_t amount)

include: <graphenelib/asset.h>

desc: withdraw current account asset to another account


**params:**

\<uint64_t\> from: transfer from which account, normally _self

\<uint64_t\> to: 

\<uint64_t\> asset_id: 

\<int64_t\> amount: 




## int64_t get_balance(int64_t account, int64_t asset_id)

include: <graphenelib/asset.h>

desc: get balance of some account


**params:**

\<int64_t\> account: 

\<int64_t\> asset_id: 




## void sha256(char data, uint32_t length, const checksum256 * hash)

include: <graphenelib/crypto.h>

desc: get data's sha256


**params:**

\<char\> data: 

\<uint32_t\> length: 

\<const checksum256 *\> hash: 




## void sha512(char data, uint32_t length, const checksum512 * hash)

include: <graphenelib/crypto.h>

desc: get data's sha512


**params:**

\<char\> data: 

\<uint32_t\> length: 

\<const checksum512 *\> hash: 




## void ripemd160(char data, uint32_t length, const checksum160 * hash)

include: <graphenelib/crypto.h>

desc: get data's ripemd160


**params:**

\<char\> data: 

\<uint32_t\> length: 

\<const checksum160 *\> hash: 




## bool verify_signature(const char data, uint32_t datalen, signature sig, const char * pub_key, uint32_t pub_keylen)

include: <graphenelib/crypto.h>

desc: verify signature


**params:**

\<const char\> data: 

\<uint32_t\> datalen: 

\<signature\> sig: 

\<const char *\> pub_key: 

\<uint32_t\> pub_keylen: 




## int64_t get_head_block_num()

include: <graphenelib/global.h>

desc: get latest block number




## int64_t get_head_block_id()

include: <graphenelib/global.h>

desc: get latest block hash




## int64_t get_head_block_time()

include: <graphenelib/global.h>

desc: get latest block time, unit is seconds




## int64_t get_trx_sender()

include: <graphenelib/global.h>

desc: get caller account's instance_id




## int64_t get_account_id(const char * data, uint32_t length)

include: <graphenelib/global.h>

desc: get account instance_id by account name


**params:**

\<const char *\> data: 

\<uint32_t\> length: 




## int64_t get_asset_id(const char * data, uint32_t length)

include: <graphenelib/global.h>

desc: get asset instance_id by asset name


**params:**

\<const char *\> data: 

\<uint32_t\> length: 




## void graphene_assert(uint32_t test, const char* msg)

include: <graphenelib/system.h>

desc: 


**params:**

\<uint32_t\> test: 

\<const char*\> msg: 




## void graphene_assert_message(uint32_t test, const char* msg, uint32_t msg_len)

include: <graphenelib/system.h>

desc: 


**params:**

\<uint32_t\> test: 

\<const char*\> msg: 

\<uint32_t\> msg_len: 




## void print(const char* ptr)

include: <graphenelib/system.h>

desc: 


**params:**

\<const char*\> ptr: print content



