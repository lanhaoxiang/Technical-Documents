# 私有链搭建

## 1、环境安装

请安装见证人节点和[完整客户端](/introduction.md)

## 2、创建一个存储私链文件的文件夹

创建一个新文件夹作为私链的根目录，并将复制见证人节点文件和完整客户端复制到此目录下。

## 3、初始文件

通过初始文件初始化私链。

基于石墨烯技术的区块链网络创世区块整合了所有见证人、理事会成员和基金会。单个称为`nathan`的账户可以通过以下私钥获得：

> 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

接下来将讲解如何使用以上私钥，并会说明如何定义你自己的创世文件。

运行这条命令来创建一个名为`my-genesis.json`的初始文件：

```
$ witness_node --create-genesis-json my-genesis.json
```

`my-genesis.json`这个文件将会存储在你私钥文件夹的根目录下，运行此命令后，所有见证人节点都会自行完成命令。

如果你想要自定义初始设定，打开`my-genesis.json`，你可以做以下的修改：

* 修改初始文件中账户， 以及账户名和公钥
* 区块链资产和初次分发（包含核心资产）
* 私链参数的最初基准（包括费用）
* 初始见证人的账户签名秘钥

## 4、获得区块链ID

区块链ID是初始状态的哈希值。任何一笔交易都对应一个独有的有效区块链ID。因此如您编辑了您的初始文件，您的区块链ID将会变化，而且你将不能和现存的主链同步（除非现存的主链和你的初始文件正好相同）。

运行以下命令:

```
witness_node --data-dir data   # to use the default genesis, or
witness_node --data-dir data --genesis-json my-genesis.json   # your own genesis block
```

当这条信息出现时:

```
3501235ms th_a main.cpp:165 main] Started witness node on a chain with 0 blocks.
3501235ms th_a main.cpp:166 main] Chain ID is 8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824
```

此时你的初始化已经完成，按`ctrl-c` 关闭见证人节点。

因此, 你应该生成了两个文件:

* 在词典库`data`中创建了一个新文件`config.ini`
* Your blockchain id is now known - it’s displayed in the message above.

**注意**

**请注意你的区块链ID会和上述例子中的ID不同。请记录下你的ID，在之后你将会用到它。**

## 5、配置见证人

用文本编辑器打开刚生成的`/data/config.ini`, 做如下设置, 必要时请不要注释这些代码:

```
rpc-endpoint = 127.0.0.1:11011
genesis-json = my-genesis.json
enable-stale-production = true
```

在`config.ini`中定位以下语句:

```
# ID of witness controlled by this node (e.g. "1.6.5", quotes are required, may specify multiple times)
```

并添加如下词条:

```
witness-id = "1.6.1"
witness-id = "1.6.2"
witness-id = "1.6.3"
witness-id = "1.6.4"
witness-id = "1.6.5"
witness-id = "1.6.6"
witness-id = "1.6.7"
witness-id = "1.6.8"
witness-id = "1.6.9"
witness-id = "1.6.10"
witness-id = "1.6.11"
```

上述列表授权了见证人节点用见证人ID来生成区块. 正常情况下，每个见证人的节点不同，但在私有链中，我们会先设定成全体见证人在同一个节点生产区块。这些见证人ID的私钥（用来签署区块）已经在`config.ini`中提供：

```
# Tuple of [PublicKey, WIF private key] (may specify multiple times)
private-key = ["GXC6MRyA...T5GDW5CV","5KQwrPb...tP79zkvFD3"]
```

## 6、开始生产区块

通过以下步骤，你可以生产基于你私链的第一个区块了，在见证人节点中运行以下命令:

```
witness_node --data-dir data
```

之后私链的区块将开始生成，你会看到如下指示:

```
********************************
*                              *
*   ------- NEW CHAIN ------   *
*   - Welcome to Graphene! -   *
*   ------------------------   *
*                              *
********************************
```

之后会有更多成功生成区块的日志生成:

```
2322793ms th_a  main.cpp:176     main    ] Started witness node on a chain with 0 blocks.
2322794ms th_a  main.cpp:177     main    ] Chain ID is 8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824
2324613ms th_a  witness.cpp:185  block_production_loo ] Generated block #1 with timestamp 2016-01-21T22:38:40 at time 2016-01-21T22:38:40
2325604ms th_a  witness.cpp:194  block_production_loo ] Not producing block because slot has not yet arrived
2342604ms th_a  witness.cpp:194  block_production_loo ] Not producing block because slot has not yet arrived
2343609ms th_a  witness.cpp:194  block_production_loo ] Not producing block because slot has not yet arrived
2344604ms th_a  witness.cpp:185  block_production_loo ] Generated block #2 with timestamp 2016-01-21T22:39:00 at time 2016-01-21T22:39:00
2345605ms th_a  witness.cpp:194  block_production_loo ] Not producing block because slot has not yet arrived
2349616ms th_a  witness.cpp:185  block_production_loo ] Generated block #3 with timestamp 2016-01-21T22:39:05 at time 2016-01-21T22:39:05
2350602ms th_a  witness.cpp:194  block_production_loo ] Not producing block because slot has not yet arrived
2353612ms th_a  witness.cpp:194  block_production_loo ] Not producing block because slot has not yet arrived
2354605ms th_a  witness.cpp:185  block_production_loo ] Generated block #4 with timestamp 2016-01-21T22:39:10 at time 2016-01-21T22:39:10
2355609ms th_a  witness.cpp:194  block_production_loo ] Not producing block because slot has not yet arrived
2356609ms th_a  witness.cpp:194  block_production_loo ] Not producing block because slot has not yet arrived
```

## 7、CLI 用法

现在可以将客户端和你的私链的见证人节点相关联。先确保你的见证人节点在运行状态，在另外一个CMD中运行以下命令：

```
cli_wallet --wallet-file=my-wallet.json --chain-id 8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824 --server-rpc-endpoint=ws://127.0.0.1:11011
```

**注意**

请确保用**你自己私链的区块链ID**替代上述ID`8b7bd36a...4294824`The blockchain id passed to the CLI needs to match the id generated and used by the witness node.

If you get the`set_password`prompt, it means your CLI has successfully conected to the testnet witness node.

### 创建一个新钱包

首先你需要Fist you need to create a new password for your wallet. This password is used to encrypt all the private keys in the wallet. For this tutorial we will use the password`supersecret`but obviously you are free to come up with your own combination of letters and numbers. Use this command to create the password:

```
>
>
>
set_password
supersecret
```

Now you can unlock the newly created wallet:

```
unlock
supersecret
```

### Gain access to the genesis stake

In Graphene, balances are contained in accounts. To import an account into your wallet, all you need to know its name and its private key. We will now import into the wallet an account called`nathan`using the`import_key`command:

```
import_key
nathan
5
KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
```

Note

Note that`nathan`happens to be the account name defined in the genesis file. If you had edited your`my-genesies.json`file just after it was created, you could have put a different name there. Also, note that`5KQwrPbwdL...P79zkvFD3`is the private key defined in the`config.ini`file.

Now we have the private key imported into the wallet but still no funds assocciated with it. Funds are stored in genesis balance objects. These funds can be claimed, with no fee, using the`import_balance`command:

```
import_balance
nathan
[
"5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
]
true
```

As a result, we have one account \(named`nathan`\) imported into the wallet and this account is well funded with BTS as we have claimed the funds stored in the genesis file. You can view this account by using this command:

```
get_account
nathan
```

and its balance by using this command:

```
list_account_balances
nathan
```

### Create another account

We will now create another account \(named`alpha`\) so that we can transfer funds back and forth between`nathan`and`alpha`.

Creating a new account is always done by using an existing account - we need it because someone \(i.e. the registrar\) has to fund the registration fee. Also, there is the requirement for the registrar account to have a lifetime member \(LTM\) status. Therefore we need to upgrade the account`nathan`to LTM, before we can proceed with creating other accounts. To upgrade to LTM, use the`upgrade_account`command:

```
upgrade_account
nathan
true
```

Note

Due to a known[caching issue](https://github.com/cryptonomex/graphene/issues/530), you need to restart the CLI at this stage as otherwise it will not be aware of`nathan`having been upgraded. Stop the CLI by pressing`ctrl-c`and start it again by using exactly the same command as before, i.e.

```
cli_wallet
--
wallet
-
file
=
my
-
wallet
.
json
--
chain
-
id
8
b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824
--
server
-
rpc
-
endpoint
=
ws
:
//
127.0
.
0.1
:
11011
```

Verify that`nathan`has now a LTM status:

```
get_account
nathan
```

In the response, next to`membership_expiration_date`you should see`1969-12-31T23:59:59`. If you get`1970-01-01T00:00:00`something is wrong and`nathan`has not been successfully upgraded.

We can now register an account by using`nathan`as registrar. But first we need to get hold of the public key for the new account. We do it by using the`suggest_brain_key`command:

```
suggest_brain_key
```

And the resposne should be something similar to this:

