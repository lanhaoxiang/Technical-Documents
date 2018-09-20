let apis
const json = {}

apis = {
    get_action_asset_id: [{
        example: `\`\`\`c++
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
\`\`\``,
        description: {
            'zh-CN': `
对这个合约通过钱包客户端调用
call\_contract nathan helloworld {"amount":10000000,"asset\_id":1.3.1} deposit "{}" GXC true
调用helloworld的deposit方法，在deposit方法的实现中调用get\_action\_asset\_id()将返回1
            `,
            'en-US': `test for desc 123`
        }
    }],
        get_action_asset_id: [{
        example: `\`\`\`c++

#include <graphenelib/contract.hpp>
#include <graphenelib/crypto.h>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/global.h>
#include <graphenelib/print.hpp>
#include <graphenelib/types.h>

using namespace graphene;

class testapi : public contract
{
  public:
    testapi(uint64_t id)
        : contract(id)
    {
    }

    /// @abi action
    void test()
    {
        char dst[1024] = {0};
        //获取当前合约调用所属transaction序列化后的数据到的长度
        int dst_len = transaction_size();
        print("transaction_size() = ", dst_len, "\n");

        //获取当前合约调用所属transaction序列化后的数据到dst中
        read_transaction(dst, dst_len);

        //计算dst的sha256并输出前20byte。trx_id的值就是transaction的序列化数据的sha256的前20个字节
        checksum256 hs;
        sha256(dst, dst_len, &hs);
        printhex(hs.hash, 20);
        print("\n");

        printhex(dst, dst_len);
        print("\n");

        //获取当前合约调用所属transaction的过期时间，单位秒
        print("expiration() = ", expiration(), "\n");

        //获取当前合约调用所属block的ref block number
        print("tapos_block_num() = ", tapos_block_num(), "\n");

        //获取当前合约调用所属block的ref block prefix
        print("tapos_block_prefix() = ", tapos_block_prefix(), "\n");
    }
};

GRAPHENE_ABI(testapi, (test))



\`\`\``,
        description: {
            'zh-CN': `
1.调用合约
unlocked >>> call_contract nathan testapi5 null test "{}" GXC true

[(20,test)->20] CONSOLE OUTPUT BEGIN =====================
transaction_size() = 35
8906eec602aef4c3863726108e81e9c7a6ac2a0e
9411bbcff0ef4f9da35b014b640000000000000000111400000000000090b1ca000000
expiration() = 1537449295
tapos_block_num() = 4500
tapos_block_prefix() = 4025536443


[(20,test)->20] CONSOLE OUTPUT END =====================


2.通过cli_wallet调用get_block 当前合约所属block
unlocked >>> get_block 4501
{
  "previous": "00001194bbcff0ef9f38baefbc05a5219d5f9f88",
  "timestamp": "2018-09-20T13:14:30",
  "witness": "1.6.9",
  "transaction_merkle_root": "7a0c8130efb75191878709918fb3838c2614c8ca",
  "extensions": [],
  "witness_signature": "1f13d3266113b0aeb7103ed89934969af151d1b4bf422ee44cd552f8342a52e00254ee82649613a15a01285f4cb7ece475fcc0726c1612c90b8b04bc1930557668",
  "transactions": [{
      "ref_block_num": 4500,
      "ref_block_prefix": 4025536443,
      "expiration": "2018-09-20T13:14:55",
      "operations": [[
          75,{
            "fee": {
              "amount": 100,
              "asset_id": "1.3.0"
            },
            "account": "1.2.17",
            "contract_id": "1.2.20",
            "method_name": "test",
            "data": "",
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [
        "1f6abd9d22e019dc75dc96234782324a97aaefaed40aca7cb7875609595a74efb275214bca69e69cc1887d1500331a9e115042a73c5c965c6f19e4f782642b1314"
      ],
      "operation_results": [[
          3,{
            "billed_cpu_time_us": 675,
            "ram_usage_bs": 0,
            "fee": {
              "amount": 100,
              "asset_id": "1.3.0"
            }
          }
        ]
      ]
    }
  ],
  "block_id": "000011950792bfac08cbbd1689038969c21dafcb",
  "signing_key": "GXC6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
  "transaction_ids": [
    "8906eec602aef4c3863726108e81e9c7a6ac2a0e"
  ]
}
            `,
            'en-US': `test for desc 123`
        }
    }]
}

json.apis = apis

export default json
