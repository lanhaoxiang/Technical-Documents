
#####  头文件   #include <graphenelib/action.h>

```
// 返回当前合约的帐户id，取最后48位。 如果帐户id为1.2.12345，则后48位即12345
uint64_t current_receiver();

// 调用合约时，向合约发送的资产id，取资产id的后48位
uint64_t get_action_asset_id();

// 调用合约时，向合约发送的资产数量（放大10万倍的）
int64_t get_action_asset_amount();
```

  
#####  头文件   #include <graphenelib/asset.h>

```
// 从合约中转帐到外部帐户
void withdraw_asset(uint64_t from, uint64_t to, uint64_t asset_id, int64_t amount);

// 获取链帐户上余额
int64_t get_balance(int64_t *account, int64_t *asset_id);
```
 
  
#####  头文件   #include <graphenelib/crypto.h>

```
//  生成sha256
void sha256(char *data, uint32_t length, checksum256 *hash);

// 生成sha512
void sha512(char *data, uint32_t length, checksum512 *hash);

// ripemd160
void ripemd160(char *data, uint32_t length, checksum160 *hash);

// 验签
bool verify_signature(const char *data, uint32_t datalen, signature* sig,  const char *pub_key, uint32_t pub_keylen);
 ```
 
 
#####  头文件   #include <graphenelib/global.h>

 ```
// 返回最新区块号
int64_t get_head_block_num();
    
// 获取最新区块id
void get_head_block_id(checksum256* hash);
    
// 返回最新区块头时间
int64_t get_head_block_time();
    
// 返回交易的发送者帐户id (后48位)
int64_t get_trx_sender();
    
// 根据帐户名查询帐户id (后48位)
int64_t get_account_id(const char *data, uint32_t length);
    
// 根据资产符号查询资产id(后48位)
int64_t get_asset_id(const char *data, uint32_t length);
```
 
 
#####  头文件   #include <graphenelib/system.hh>

```
// 断言，test必须为true
void  graphene_assert( uint32_t test, const char* msg );

// 断言
void  graphene_assert_message( uint32_t test, const char* msg, uint32_t msg_len );
```
 
 
#####  头文件   #include <graphenelib/print.hpp>

```
 inline void print( const char* ptr )；
 

 ```
