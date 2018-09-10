
## <a name="current_receiver"></a>uint64_t current_receiver()

include: <graphenelib/action.h>

desc: return current contract account ID




## <a name="get_action_asset_id"></a>uint64_t get_action_asset_id()

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



## <a name="get_action_asset_amount"></a>uint64_t get_action_asset_amount()

include: <graphenelib/action.h>

desc: get asset amount of this call




## <a name="withdraw_asset"></a>void withdraw_asset(uint64_t from, uint64_t to, uint64_t asset_id, int64_t amount)

include: <graphenelib/asset.h>

desc: withdraw current account asset to another account


**params:**

\<uint64_t\> from: transfer from which account, normally _self

\<uint64_t\> to: 

\<uint64_t\> asset_id: 

\<int64_t\> amount: 




## <a name="get_balance"></a>int64_t get_balance(int64_t account, int64_t asset_id)

include: <graphenelib/asset.h>

desc: get balance of some account


**params:**

\<int64_t\> account: 

\<int64_t\> asset_id: 




## <a name="sha256"></a>void sha256(char data, uint32_t length, const checksum256 * hash)

include: <graphenelib/crypto.h>

desc: get data's sha256


**params:**

\<char\> data: 

\<uint32_t\> length: 

\<const checksum256 *\> hash: 




## <a name="sha512"></a>void sha512(char data, uint32_t length, const checksum512 * hash)

include: <graphenelib/crypto.h>

desc: get data's sha512


**params:**

\<char\> data: 

\<uint32_t\> length: 

\<const checksum512 *\> hash: 




## <a name="ripemd160"></a>void ripemd160(char data, uint32_t length, const checksum160 * hash)

include: <graphenelib/crypto.h>

desc: get data's ripemd160


**params:**

\<char\> data: 

\<uint32_t\> length: 

\<const checksum160 *\> hash: 




## <a name="verify_signature"></a>bool verify_signature(const char data, uint32_t datalen, signature sig, const char * pub_key, uint32_t pub_keylen)

include: <graphenelib/crypto.h>

desc: verify signature


**params:**

\<const char\> data: 

\<uint32_t\> datalen: 

\<signature\> sig: 

\<const char *\> pub_key: 

\<uint32_t\> pub_keylen: 




## <a name="get_head_block_num"></a>int64_t get_head_block_num()

include: <graphenelib/global.h>

desc: get latest block number




## <a name="get_head_block_id"></a>int64_t get_head_block_id()

include: <graphenelib/global.h>

desc: get latest block hash




## <a name="get_head_block_time"></a>int64_t get_head_block_time()

include: <graphenelib/global.h>

desc: get latest block time, unit is seconds




## <a name="get_trx_sender"></a>int64_t get_trx_sender()

include: <graphenelib/global.h>

desc: get caller account's instance_id




## <a name="get_account_id"></a>int64_t get_account_id(const char * data, uint32_t length)

include: <graphenelib/global.h>

desc: get account instance_id by account name


**params:**

\<const char *\> data: 

\<uint32_t\> length: 




## <a name="get_asset_id"></a>int64_t get_asset_id(const char * data, uint32_t length)

include: <graphenelib/global.h>

desc: get asset instance_id by asset name


**params:**

\<const char *\> data: 

\<uint32_t\> length: 




## <a name="graphene_assert"></a>void graphene_assert(uint32_t test, const char* msg)

include: <graphenelib/system.h>

desc: 


**params:**

\<uint32_t\> test: 

\<const char*\> msg: 




## <a name="graphene_assert_message"></a>void graphene_assert_message(uint32_t test, const char* msg, uint32_t msg_len)

include: <graphenelib/system.h>

desc: 


**params:**

\<uint32_t\> test: 

\<const char*\> msg: 

\<uint32_t\> msg_len: 




## <a name="print"></a>void print(const char* ptr)

include: <graphenelib/system.h>

desc: 


**params:**

\<const char*\> ptr: print content



