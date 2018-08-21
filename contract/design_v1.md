
### 设计原理
1. 合约代码： 暂时支持C++，后续会支持更多语言
2. 编译工具：llvm + binaryen， 将C++代码编译成wasm代码
3. 智能合约执行环境： WebAssembly作为底层执行VM，VM调用封装的API读取外部状态、读写外部存储。 wasm-jit 地址：https://github.com/WebAssembly/wasm-jit-prototype

### 合约编译工具(llvm + binaryen）
  1. clang编译
 ```
-emit-llvm选项告诉clang编译器生成LLVM中间代码
-emit-llvm -c选项告知编译器生成LLVM字节码二进制格式(a.bc)
-emit-llvm -S选项告知编译器生成LLVM字节码文本格式（a.ll）
```
  2. llvm-link链接，将多个LLVM二进制文件链接成一个LLVM二进制文件
  3. llc，可以把LLVM字节码的二进制格式文件（a.bc）转换为本地的汇编文件（a.s）
  4. binaryen + wasm jit  ==> wasm
  5. 合约部署时，wasm-jit将wast转换成wasm
  6. abi 生成工具（abi generator 可参考EOS实现)
  
wast生成方法：
````
1. clang -emit-llvm -O3 --std=c++14 --target=wasm32 .... 生成x.bc
2. llvm-link 将x.bc和contract lib链接成linked.bc
3. llc 生成汇编文件
4. binaryen 将汇编文件转成.wast
````

### 合约帐户设计
  1. 帐户分2种：普通帐户和合约帐户
  2. 合约帐户，由普通帐户通过部署合约的方式创建，合约帐户无私钥，资产权限由合约代码控制
  3. 合约帐户对象，code字段存储合约代码, abi存储合约代码和abi
  4. 合约代码不支持更新

### 合约的持久化存储
  1. 定义合约的数据存储格式； 定义线性存储空间，每个元素是一个struct类型
  2. witness_node运行时，合约的持久化存储，放内存；程序退出时，写入磁盘；后期可以考虑优化内存(磁盘+缓存)。
  3. 封装读写持久化存储的API，  提供读、写、检索方法的接口供合约调用
  4. 合约只能写自己的存储空间，可以读其它合约的存储空间，但不可直接写；  同一合约内不同帐户的存储空间，由用户合约代码控制权限
  5. 合约内可以根据区块号获取区块，读取外部状态

### 智能合约公共库，供智能合约在虚拟机内部调用
 1. 提供API，获取head block num,  获取head block id
 2. get_balance 获取外部帐户余额
 3. 加解密API、验签API
 4. 持久化存储API

### 销毁合约(暂不支持)
合约内可以提供销毁方法，如：
selfdestruct(string account) 将资产转至recipient帐户，然后销毁合约
回收的存储空间，按全局手续费参数计算，奖励给合约创建者(从系统资金池中获取,  最多返还存储价格的20%)。


### 合约调用合约(暂不支持)
  1.  目前只能由普通帐户和合约帐户交互，不支持合约间交互

### 合约的创建和调用接口
#### 1. 部署(创建)合约 create_contract

```
{
  "ref_block_num": 14,
  "ref_block_prefix": 1713021572,
  "expiration": "2018-07-30T03:33:20",
  "operations": [[
      74,{
        "fee": { // 手续费
          "amount": 315234,
          "asset_id": "1.3.0"
        },
        "name": "abb", // 合约名
        "account": "1.2.17", // 发起部署合约的帐户id
        "vm_type": "0",  // vm type
        "vm_version": "0",   // vm version
        "code":   "0061736d01000000012d0960027f7e006000017f60027f7f017f60037f7f7f017f60017f0060017e0060000060037e7e7e0060017f017f02570503656e7610616374696f6e5f646174615f73697a65000103656e76066d656d637079000303656e76067072696e7473000403656e76077072696e747569000503656e7610726561645f616374696f6e5f646174610002030d0c020202070002080208040306040501700102020503010001077608066d656d6f72790200165f5a6571524b3131636865636b73756d32353653315f0005165f5a6571524b3131636865636b73756d31363053315f0006165f5a6e65524b3131636865636b73756d31363053315f0007056170706c790008066d616c6c6f63000b0466726565000e066d656d636d70000f0908010041000b0210090a8a0e0c0b00200020014120100f450b0b00200020014120100f450b0d00200020014120100f4100470b6301017f4100410028020441206b2203360204024020012000520d002003200137031820024280808080808080c0eb00520d00200341003602142003410136021020032003290310370208200341186a200341086a100a1a0b4100200341206a3602040b1a004110100220011003412010024110100220011003412010020bcb0103017f017e037f410028020441106b22042106410020043602042001280204210220012802002105024002400240024010002201450d002001418104490d012001100b21040c020b410021040c020b410020042001410f6a4170716b22043602040b2004200110041a0b20064200370308200641086a2004410810011a2006290308210302402001418104490d002004100e0b200020024101756a210102402002410171450d00200128020020056a28020021050b2001200320051100004100200641106a36020441010b080041242000100c0bb904010c7f02402001450d00024020002802c041220d0d004110210d200041c0c1006a41103602000b200141086a200141046a41077122026b200120021b210202400240024020002802c441220a200d4f0d002000200a410c6c6a4180c0006a21010240200a0d0020004184c0006a220d2802000d0020014180c000360200200d20003602000b200241046a210a034002402001280208220d200a6a20012802004b0d002001280204200d6a220d200d28020041808080807871200272360200200141086a22012001280200200a6a360200200d200d28020041808080807872360200200d41046a22010d030b2000100d22010d000b0b41fcffffff0720026b2104200041c8c1006a210b200041c0c1006a210c20002802c8412203210d03402000200d410c6c6a22014180c0006a210620014184c0006a280200220541046a210d0340200520062802006a2107200d417c6a2208280200220941ffffffff07712101024020094100480d000240200120024f0d000340200d20016a220a20074f0d01200a280200220a4100480d012001200a41ffffffff07716a41046a22012002490d000b0b20082001200220012002491b200941808080807871723602000240200120024d0d00200d20026a200420016a41ffffffff07713602000b200120024f0d040b200d20016a41046a220d2007490d000b41002101200b4100200b28020041016a220d200d200c280200461b220d360200200d2003470d000b0b20010f0b2008200828020041808080807872360200200d0f0b41000b870501087f20002802c44121010240024041002d00f041450d0041002802f44121070c010b3f002107410041013a00f0414100200741107422073602f4410b200721030240024002400240200741ffff036a41107622023f0022084d0d00200220086b40001a4100210820023f00470d0141002802f44121030b41002108410020033602f44120074100480d0020002001410c6c6a210220074180800441808008200741ffff037122084181f8034922061b6a2008200741ffff077120061b6b20076b2107024041002d00f0410d003f002103410041013a00f0414100200341107422033602f4410b20024180c0006a210220074100480d01200321060240200741076a417871220520036a41ffff036a41107622083f0022044d0d00200820046b40001a20083f00470d0241002802f44121060b4100200620056a3602f4412003417f460d0120002001410c6c6a22014184c0006a2802002206200228020022086a2003460d020240200820014188c0006a22052802002201460d00200620016a2206200628020041808080807871417c20016b20086a72360200200520022802003602002006200628020041ffffffff07713602000b200041c4c1006a2202200228020041016a220236020020002002410c6c6a22004184c0006a200336020020004180c0006a220820073602000b20080f0b02402002280200220820002001410c6c6a22034188c0006a22012802002207460d0020034184c0006a28020020076a2203200328020041808080807871417c20076b20086a72360200200120022802003602002003200328020041ffffffff07713602000b2000200041c4c1006a220728020041016a22033602c0412007200336020041000f0b2002200820076a36020020020b7b01037f024002402000450d0041002802e44122024101480d0041a4c00021032002410c6c41a4c0006a21010340200341046a2802002202450d010240200241046a20004b0d00200220032802006a20004b0d030b2003410c6a22032001490d000b0b0f0b2000417c6a2203200328020041ffffffff07713602000b4901037f4100210502402002450d000240034020002d0000220320012d00002204470d01200141016a2101200041016a21002002417f6a22020d000c020b0b200320046b21050b20050b0300000b0b1b030041040b04006100000041100b0568692c20000041200b020a00",   // 合约的wasm代码
        "abi": {   // 合约ABI
          "version": "gxb::abi/1.0",
          "types": [],
          "structs": [{
              "name": "hi",
              "base": "",
              "fields": [{
                  "name": "user",
                  "type": "uint64"
                }
              ]
            }
          ],
          "actions": [{
              "name": "hi",
              "type": "hi",
              "payable": false
            }
          ],
          "tables": [],
          "error_messages": [],
          "abi_extensions": []
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "201ac9a0c1fc8142e0a9e288b7ec692a4f8b367893fd97608e60e28f073d74a5842c2dca4810d839742c0639074dd288e21d60558637df4c30e823379d0e010c3a"
  ]
}
```

手续费全局参数:
```
[
	74, {
		"fee": "10000", //标准手续费 
		"price_per_kbyte": 100000 // 根据消息体字节数大小(KB)，收取对应比例费用
	}
]
```
#### 2. 调用合约 call_contract
contract_call_operation
```
{
	"ref_block_num": 131,
	"ref_block_prefix": 3868272457,
	"expiration": "2018-07-19T08:38:10",
	"operations": [
		[75, {
			"fee": { // 手续费
				"amount": 1000,
				"asset_id": "1.3.0"
			},
			"account": "1.2.17", // 调用合约的帐户id
			"contract_id": "1.2.18", // 被调用的合约id
			"amount": { // 向合约发送的资产， 该amount字段为optional， 非必选
				"amount": 100000,
				"asset_id": "1.3.0"
			},
			"method_name": "deposit", // 合约方法名
			"data": "0d00000000000000", // 合约方法名需要的参数(根据合约abi进行序列化)
			"extensions": []
		}]
	],
	"extensions": [],
	"signatures": ["207d6e14beca57069470461f0ce3e25e679bd50714f5a2234d806fa8153d5f18505d6ad8939eb59d5071dfd2fbc4650cd8a330b3c780dfe23ba36fd4288ac087fc"]
}
```

手续费全局参数:
```
[
	75, {
		"basic_fee": "10000",
		"price_per_kbyte_ram": 100000, // 持久化存储使用量(单位为kb)
		"price_per_ms_cpu": 10 // CPU使用量（单位为ms）
	}
]
```
手续费：根据实际执行的CPU 、存储占用量，收取实际手续费。 若手续费不足，则交易失败，状态回滚。
合约执行失败，交易状态不会更新，同时节点不会继续广播该交易，交易不会打包进区块。

#### 3. 合约调用回执，写进区块
交易的operation_result中记录合约交易状态，成功或失败。
交易执行回执(打包进区块)：
```
"operation_results": [[
          3,{
            "billed_cpu_time_us": 787, // cpu time, 微秒
            "ram_usage_bs": 0, // 存储使用量, bytes
            "fee": {  // 手续费
              "amount": 1000,
              "asset_id": "1.3.0"
            }
          }
        ]
      ]

```

#### 4. 防ddos，收取交易手续费
  1. 根据cpu_usage使用量和存储使用量，计算实际手续费
  2. 每笔交易，设置max_transaction_cpu_usage 单个交易的CPU上限，全局参数（单个交易的cpu usage上限和单个区块的cpu usage上限）
  3. 限制合约执行deadline, 节点接收交易/打包区块时，验证deadline；验证区块/replay区块时，不验证deadline
  4. 创建合约手续费 = KB消息体大小 * 基准手续费
  5. 调用合约手续费 = CPU使用量 + 存储使用量 +   KB消息体大小 * 基准手续费



### 合约的充值提现
1. 向合约充值。 调用合约时，可以附带一定数量的资产，即消息体中的amount字段：

```
{
	"ref_block_num": 131,
	"ref_block_prefix": 3868272457,
	"expiration": "2018-07-19T08:38:10",
	"operations": [
		[75, {
			"fee": { // 手续费
				"amount": 1000,
				"asset_id": "1.3.0"
			},
			"account": "1.2.17", // 调用合约的帐户id
			"contract_id": "1.2.18", // 被调用的合约id
			"amount": { // 向合约发送的资产
				"amount": 100000,
				"asset_id": "1.3.0"
			},
			"method_name": "deposit", // 合约方法名，如果该deposit方法的payable属性为true，则可以接收充值； 否则合约调用失败
			"data": "0d00000000000000", // 合约方法名需要的参数(根据合约abi进行序列化)
			"extensions": []
		}]
	],
	"extensions": [],
	"signatures": ["207d6e14beca57069470461f0ce3e25e679bd50714f5a2234d806fa8153d5f18505d6ad8939eb59d5071dfd2fbc4650cd8a330b3c780dfe23ba36fd4288ac087fc"]
}
```
向合约充值的资产，累加到合约帐户的余额。合约代码对应的方法，实现为对应用户入帐的逻辑(由用户合约代码实现)，实现用户充值。

2. 合约内向外部帐户提现
为虚拟机封装的API提供了withdraw_asset方法，该方法只可以从合约帐户转出资产，转出资产数量不超过合约帐户余额。


3. 支持充值提现的transfer合约样例：
https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/transfer



### 智能合约样例：

以helloworld合约为例，合约源代码：
```
#include <gxblib/contract.hpp>
#include <gxblib/dispatcher.hpp>
#include <gxblib/print.hpp>
#include <gxblib/types.h>

using namespace graphene;

class hello : public contract
{
  public:
    hello(account_name n)
        : contract(n)
    {
    }

    /// @abi action
////     /// @abi payable   此注释表示，hi文件可以接收充值。生成的abi中，对应的payable为true
    void hi(uint64_t user)
    {
        for (int i = 0; i < 2; ++i) {
            print("hi, ", user, "\n");
        }
    }
       /// @abi action
    void bye(uint64_t user)
    {
        for (int i = 0; i < 2; ++i) {
            print("bye, ", user, "\n");
        }
    }

};

GXB_ABI(hello, (hi)(bye))
```

合约abi:
```
{
  "____comment": "This file was generated by gxb-abigen. DO NOT EDIT - 2018-07-30T04:01:16",
  "version": "gxb::abi/1.0",
  "types": [],
  "structs": [{  // structs定义了合约的持久化存储表类型，和合约方法及参数类型
      "name": "account",
      "base": "",
      "fields": [{
          "name": "owner",
          "type": "uint64"
        },{
          "name": "balances",
          "type": "contract_asset[]"
        }
      ]
    },{
      "name": "hi",
      "base": "",
      "fields": [{
          "name": "user",
          "type": "uint64"
        }
      ]
    },{
      "name": "deposit",
      "base": "",
      "fields": []
    },{
      "name": "withdraw",
      "base": "",
      "fields": [{
          "name": "to_account",
          "type": "uint64"
        },{
          "name": "contract_asset_id",
          "type": "uint64"
        },{
          "name": "amount",
          "type": "int64"
        }
      ]
    }
  ],
  "actions": [{ // 合约的方法
      "name": "hi",
      "type": "hi",
      "payable": false   // payable为false，该方法不接收资产
    },{
      "name": "deposit",
      "type": "deposit",
      "payable": true
    },{
      "name": "withdraw",
      "type": "withdraw",
      "payable": false
    }
  ],
  "tables": [{ //合约的持久化表
      "name": "account",
      "index_type": "i64",
      "key_names": [
        "owner"
      ],
      "key_types": [
        "uint64"
      ],
      "type": "account"
    }
  ],
  "error_messages": [],
  "abi_extensions": []
}
```

### 相关文档
1. github开源地址：https://github.com/gxchain/gxb-core
2. 源码编译:
-  ubuntu 14.04: https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU
-  os x: https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X
3. 相关API文档：
- https://github.com/gxchain/gxb-core/wiki/witness_node_api_json_rpc
- https://github.com/gxchain/gxb-core/wiki/wallet_api
4. 其它文档：https://doc.gxb.io/gxchain/
