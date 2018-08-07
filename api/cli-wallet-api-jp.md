## Cli-wallet コマンドリスト

| コマンド | パラメーター | 説明　| 備考 |
| :--- | :--- | :--- | :--- |
| [set\_password](/api/cli-wallet-api/setpassword.md) | &lt;new\_password&gt; | 新しいパスワードを設定するコマンド。初回起動する時にパスワードの設定が必要です |  |
| [unlock](/api/cli-wallet-api/unlock.md) | &lt;my\_password&gt; | ウォレット解除 |  |
| [import\_key](/api/cli-wallet-api/importkey.md) | &lt;account\_name\_or\_id&gt;         &lt;true&gt; &lt;wif\_private\_key&gt; | ウォレットにプライベートキーインポート |  |
| [dump\_private\_keys](/api/cli-wallet-api/dumpprivate-keys.md) |  | ウォレットにあるすべてのプライベートキーをプリントする |  |
| [get\_account](/api/cli-wallet-api/getaccount.md) | &lt;account\_name\_or\_id&gt; | 指定アカウントの情報を確認する。パラメータはアカウント名或いはアカウントid |  |
| [list\_account\_balances](/api/cli-wallet-api/listaccount-balances.md) | &lt;account\_name\_or\_id&gt; | アカウント残高確認 |  |
| [get\_account\_history](/api/cli-wallet-api/getaccount-history.md) | &lt;account\_name\_or\_id&gt;         &lt;limt\_num&gt; | アカウント最近の取引履歴確認 |  |
| [get\_relative\_account\_history](/api/cli-wallet-api/getrelative-account-history.md) | &lt;account\_name\_or\_id&gt;       &lt;start&gt; &lt;limit&gt; &lt;stop&gt; | アカウント最近の取引履歴確認、 ページ変換機能付き |  |
| [get\_account\_history\_by\_operations](/api/cli-wallet-api/getrelative-account-history_by_operations.md) | &lt;account\_name\_or\_id&gt; &lt;\[\]&gt;  &lt;start&gt; &lt;limit\_num&gt; | oeration\_typeにより最近の取引履歴確認、operationが対応しているtxIDを返す |  |
| [transfer](/api/cli-wallet-api/transfer.md) | &lt;from\_account&gt;                   &lt;to\_account&gt; &lt;amount&gt;     &lt;GXS&gt; &lt;memo&gt; &lt;true&gt; | トランザクション操作 |  |
| [transfer2](/api/cli-wallet-api/transfer2.md) | &lt;from\_account&gt;                   &lt;to\_account&gt; &lt;amount&gt;     &lt;GXS&gt; &lt;memo&gt; &lt;true&gt; | トランザクション操作、transferのパラメーターと一緒、該当取引のidを返す |  |
| [get\_block](/api/cli-wallet-api/getblock.md) | &lt;block\_num&gt; | 指定ブロック情報を収集 |  |
| [info](/api/cli-wallet-api/info.md) |  | ブロックチェーン情報を収集、本コマンドで最新ブロックの長さを確認できる |  |
| [help](/api/cli-wallet-api/help.md) |  | ヘルプコマンド、ウォレットに適応しているすべてのインターネットを返す |  |
| [gethelp](/api/cli-wallet-api/gethelp.md) | &lt;command&gt; | ヘルプコマンド、特定ウォレットを確認する |  |

### **使用例**

get\_accountsを例にすると

#### CURL  POST コマンドリクエスト

コマンドモードにする（cmd），

```
curl --data '{"jsonrpc": "2.0", "method": "call", "params": [0, "get_accounts", [["1.2.1","1.2.2"]]], "id": 1}'  https://node1.gxb.io/rpc
```

を入力すると、結果が見れる

#### POSTリクエスト例

リクエストURLは以下


```
https://node1.gxb.io/
```

本体をリクエスト


```
{
"jsonrpc": "2.0", 
"method": "call", 
"params": [0, "get_accounts", [["1.2.1","1.2.2"]]], "id": 1
}
```

注意：paramsのフォーマットは\[API種類，APIコマンド，パラメーター\]

例えば、上記のget\_accountsコマンドでは、database API，database APIの種類コードは0。



返す結果


```
{"id":1,"jsonrpc":"2.0","result":[{"id":"1.2.1",
"membership_expiration_date":"1969-12-31T23:59:59",
"merchant_expiration_date":"1970-01-01T00:00:00",
"datasource_expiration_date":"1970-01-01T00:00:00",
"data_transaction_member_expiration_date":"1970-01-01T00:00:00",
"registrar":"1.2.1",
"referrer":"1.2.1",
"lifetime_referrer":"1.2.1",
"merchant_auth_referrer":"1.2.0",
"datasource_auth_referrer":"1.2.0",
"network_fee_percentage":2000,"lifetime_referrer_fee_percentage":8000,
"referrer_rewards_percentage":0,"name":"witness-account",
"owner":{"weight_threshold":1,
"account_auths":[],
"key_auths":[],"address_auths":[]},
"active":{"weight_threshold":391175,"account_auths":[["1.2.18",37288],["1.2.19",37253],["1.2.20",37253],["1.2.21",37253],["1.2.22",37253],["1.2.29",37253],["1.2.30",37253],["1.2.31",37253],["1.2.32",37253],["1.2.33",37253],["1.2.34",37253],["1.2.35",37253],["1.2.36",37253],["1.2.37",37253],["1.2.38",37253],["1.2.39",37253],["1.2.3429",37253],["1.2.3431",37253],["1.2.3432",37253],["1.2.3433",37253],["1.2.3434",37253]],"key_auths":[],"address_auths":[]},"options":{"memo_key":"GXC1111111111111111111111111111111114T1Anm","voting_account":"1.2.5","num_witness":0,"num_committee":0,"votes":[],"extensions":[]},"statistics":"2.6.1","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"owner_special_authority":[0,{}],"active_special_authority":[0,{}],"top_n_control_flags":0},{"id":"1.2.2","membership_expiration_date":"1969-12-31T23:59:59","merchant_expiration_date":"1970-01-01T00:00:00","datasource_expiration_date":"1970-01-01T00:00:00","data_transaction_member_expiration_date":"1970-01-01T00:00:00","registrar":"1.2.2","referrer":"1.2.2","lifetime_referrer":"1.2.2","merchant_auth_referrer":"1.2.0","datasource_auth_referrer":"1.2.0","network_fee_percentage":2000,"lifetime_referrer_fee_percentage":8000,"referrer_rewards_percentage":0,"name":"relaxed-committee-account","owner":{"weight_threshold":1,"account_auths":[],"key_auths":[],"address_auths":[]},"active":{"weight_threshold":204892,"account_auths":[["1.2.18",37253],["1.2.19",37253],["1.2.20",37253],["1.2.21",37253],["1.2.22",37253],["1.2.23",37253],["1.2.24",37253],["1.2.25",37253],["1.2.26",37253],["1.2.27",37253],["1.2.28",37253]],"key_auths":[],"address_auths":[]},"options":{"memo_key":"GXC1111111111111111111111111111111114T1Anm","voting_account":"1.2.5","num_witness":0,"num_committee":0,"votes":[],"extensions":[]},"statistics":"2.6.2","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"owner_special_authority":[0,{}],"active_special_authority":[0,{}],"top_n_control_flags":0}]}
```

### 

テストツール

おすすめのテストツールはPOSTMAN


[https://www.getpostman.com](https://www.getpostman.com)

![](/assets/test tool.png)

