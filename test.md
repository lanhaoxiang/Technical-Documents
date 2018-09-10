
## uint64_t current_receiver

include: <graphenelib/action.h>

desc: return current contract account ID

**params:**




## uint64_t get_action_asset_id

include: <graphenelib/action.h>

desc: get aseet ID of this call

**params:**


### example0
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




## uint64_t get_action_asset_amount

include: <graphenelib/action.h>

desc: get asset amount of this call

**params:**




## void withdraw_asset

include: <graphenelib/asset.h>

desc: withdraw current account asset to another account

**params:**


\<uint64_t\>from: transfer from which account, normally _self


\<uint64_t\>to: 


\<uint64_t\>asset_id: 


\<int64_t\>amount: 






## int64_t get_balance

include: <graphenelib/asset.h>

desc: get balance of some account

**params:**


\<int64_t\>account: 


\<int64_t\>asset_id: 






## void sha256

include: <graphenelib/crypto.h>

desc: get data's sha256

**params:**


\<char\>data: 


\<uint32_t\>length: 


\<const checksum256 *\>hash: 






## void sha512

include: <graphenelib/crypto.h>

desc: get data's sha512

**params:**


\<char\>data: 


\<uint32_t\>length: 


\<const checksum512 *\>hash: 






## void ripemd160

include: <graphenelib/crypto.h>

desc: get data's ripemd160

**params:**


\<char\>data: 


\<uint32_t\>length: 


\<const checksum160 *\>hash: 






## bool verify_signature

include: <graphenelib/crypto.h>

desc: verify signature

**params:**


\<const char\>data: 


\<uint32_t\>datalen: 


\<signature\>sig: 


\<const char *\>pub_key: 


\<uint32_t\>pub_keylen: 






## int64_t get_head_block_num

include: <graphenelib/global.h>

desc: get latest block number

**params:**




## int64_t get_head_block_id

include: <graphenelib/global.h>

desc: get latest block hash

**params:**




## int64_t get_head_block_time

include: <graphenelib/global.h>

desc: get latest block time, unit is seconds

**params:**




## int64_t get_trx_sender

include: <graphenelib/global.h>

desc: get caller account's instance_id

**params:**




## int64_t get_account_id

include: <graphenelib/global.h>

desc: get account instance_id by account name

**params:**


\<const char *\>data: 


\<uint32_t\>length: 






## int64_t get_asset_id

include: <graphenelib/global.h>

desc: get asset instance_id by asset name

**params:**


\<const char *\>data: 


\<uint32_t\>length: 






## void graphene_assert

include: <graphenelib/system.h>

desc: 

**params:**


\<uint32_t\>test: 


\<const char*\>msg: 






## void graphene_assert_message

include: <graphenelib/system.h>

desc: 

**params:**


\<uint32_t\>test: 


\<const char*\>msg: 


\<uint32_t\>msg_len: 






## void print

include: <graphenelib/system.h>

desc: 

**params:**


\<const char*\>ptr: 





