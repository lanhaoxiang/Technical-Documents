## 上链彩蛋

目前仅支持cli\_wallet操作。要求cli\_wallet已经导入帐户私钥。

### 启动cli\_wallet, 连接到主网的node1钱包接入点

```
./programs/cli_wallet/cli_wallet -swss://node1.gxb.io -w wallet.json
```

启动成功，钱包处于锁定状态，会打印如下的交互提示符：

```
locked>>>
```

### 解锁钱包

```
unlock "密码"
```

其中"密码"是一串字符，为你的本地钱包密码  
unlock成功后，交互提示符变为:`unlocked >>>`

### 使用custom命令，在区块链上记录自定义的数据

命令行格式为

`custom 帐户名 0 "文本" GXS false`

其中帐户名为已导入钱包的帐户名； 0表示序号，正整数即可； "文本" 是一串长字符串，会按原样记录在区块链上; GXS为使用GXS支付记帐手续费; false表示只预演，不实际执行，如果要执行，需要把false改为true

例如，使用b22帐户，在区块链上记录一段文字：

```
custom b22 0 "\n鹅鹅鹅，\n曲项向天歌。\n白毛浮绿水，\n红掌拨清波。\n" GXS false
```

文本中的换行使用\n替换。终端会打印：

```
unlocked >>> 
custom b22 0 "\n鹅鹅鹅，\n曲项向天歌。\n白毛浮绿水，\n红掌拨清波。\n" GXS false
unlocked >>> custom b22 0 "\n鹅鹅鹅，\n曲项向天歌。\n白毛浮绿水，\n红掌拨清波。\n" GXS false
3162718ms th_a       wallet.cpp:3761               custom               ] raw_data: 
鹅鹅鹅，
曲项向天歌。
白毛浮绿水，
红掌拨清波。
{
  "ref_block_num": 21160,
  "ref_block_prefix": 2495112407,
  "expiration": "2018-06-21T07:53:09",
  "operations": [[
      35,{
        "fee": {
          "amount": 2000,
          "asset_id": "1.3.1"
        },
        "payer": "1.2.466",
        "required_auths": [],
        "id": 0,
        "data": "0ae9b985e9b985e9b985efbc8c0ae69bb2e9a1b9e59091e5a4a9e6ad8ce380820ae799bde6af9be6b5aee7bbbfe6b0b4efbc8c0ae7baa2e68e8ce68ba8e6b885e6b3a2e380820a"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "2006d3f54a8a480b83743da496bd038d87cfc46810784f74baf540eacfe786eb162f98993401eb39a349c30bd186ba5100fec65085769ed02dc1457edd2f2da477"
  ]
}
unlocked >>
```

记录成功后，返回一串格式化的jso字符串。在区块链上是以十六进制字符串保存的。



