### 保存witness\_node节点内存数据快照

#### 下载最新版witness\_node程序，下载地址

**程序可能会 更新，请**[**点击这里**](https://github.com/gxchain/gxb-core/releases/latest)**下载最新程序。**

| 阿里云 | [http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb\_1.0.180604.tar.gz](http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_1.0.180604.tar.gz) |
| :--- | :--- |
| github | [https://github.com/gxchain/gxb-core/releases/download/1.0.180604/gxb\_1.0.180604.tar.gz](https://github.com/gxchain/gxb-core/releases/download/1.0.180604/gxb_1.0.180604.tar.gz) |

#### 启动witness\_node程序, 在启动参数里指定区块高度和快照文件路径

```
./programs/witness_node/witness_node --data-dir=trusted_node \
--rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:6789" \
 --log-file --max-ops-per-account=0 --partial-operations=true \
 --data-transaction-lifetime=1 \
 --plugins snapshot \
 --snapshot-at-block 9623000 --snapshot-to snapshot.0604.txt &
```

其中--snapshot-at-block 9623000指定区块高度，即在此区块高度时，保存快照； --snapshot-to snapshot.0604.txt指定了快照文件，保存在当前目录下\(也可以使用绝对路径\)

如果指定的区块高度小于最新区块高度，即过去某个时间点的快照，启动witness\_node时需要再加上--replay-blockchain参数

#### 快照文件中将保存所有的内存数据对象，按行保存，每一行是一个json。如下：

```
{"id":"1.2.0","membership_expiration_date":"2106-02-07T06:28:15","merchant_expiration_date":"1970-01-01T00:00:00","datasource_expiration_date":"1970-01-01T00:00:00","data_transaction_member_expiration_date":"1970-01-01T00:00:00","registrar":"1.2.0","referrer":"1.2.0","lifetime_referrer":"1.2.0","merchant_auth_referrer":"1.2.0","datasource_auth_referrer":"1.2.0","network_fee_percentage":2000,"lifetime_referrer_fee_percentage":8000,"referrer_rewards_percentage":0,"name":"committee-account","owner":{"weight_threshold":1,"account_auths":[],"key_auths":[],"address_auths":[]},"active":{"weight_threshold":23858,"account_auths":[["1.2.6",45685],["1.2.7",203],["1.2.8",203],["1.2.9",203],["1.2.10",203],["1.2.11",203],["1.2.12",203],["1.2.13",203],["1.2.14",203],["1.2.15",203],["1.2.16",203]],"key_auths":[],"address_auths":[]},"options":{"memo_key":"GXC1111111111111111111111111111111114T1Anm","voting_account":"1.2.5","num_witness":0,"num_committee":0,"votes":[],"extensions":[]},"statistics":"2.6.0","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"owner_special_authority":[0,{}],"active_special_authority":[0,{}],"top_n_control_flags":0}
{"id":"1.2.1","membership_expiration_date":"2106-02-07T06:28:15","merchant_expiration_date":"1970-01-01T00:00:00","datasource_expiration_date":"1970-01-01T00:00:00","data_transaction_member_expiration_date":"1970-01-01T00:00:00","registrar":"1.2.1","referrer":"1.2.1","lifetime_referrer":"1.2.1","merchant_auth_referrer":"1.2.0","datasource_auth_referrer":"1.2.0","network_fee_percentage":2000,"lifetime_referrer_fee_percentage":8000,"referrer_rewards_percentage":0,"name":"witness-account","owner":{"weight_threshold":1,"account_auths":[],"key_auths":[],"address_auths":[]},"active":{"weight_threshold":251270,"account_auths":[["1.2.6",45685],["1.2.7",45689],["1.2.8",45685],["1.2.9",45685],["1.2.10",45685],["1.2.11",45685],["1.2.12",45685],["1.2.13",45685],["1.2.14",45685],["1.2.15",45685],["1.2.16",45685]],"key_auths":[],"address_auths":[]},"options":{"memo_key":"GXC1111111111111111111111111111111114T1Anm","voting_account":"1.2.5","num_witness":0,"num_committee":0,"votes":[],"extensions":[]},"statistics":"2.6.1","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"owner_special_authority":[0,{}],"active_special_authority":[0,{}],"top_n_control_flags":0}
{"id":"1.2.2","membership_expiration_date":"2106-02-07T06:28:15","merchant_expiration_date":"1970-01-01T00:00:00","datasource_expiration_date":"1970-01-01T00:00:00","data_transaction_member_expiration_date":"1970-01-01T00:00:00","registrar":"1.2.2","referrer":"1.2.2","lifetime_referrer":"1.2.2","merchant_auth_referrer":"1.2.0","datasource_auth_referrer":"1.2.0","network_fee_percentage":2000,"lifetime_referrer_fee_percentage":8000,"referrer_rewards_percentage":0,"name":"relaxed-committee-account","owner":{"weight_threshold":1,"account_auths":[],"key_auths":[],"address_auths":[]},"active":{"weight_threshold":23858,"account_auths":[["1.2.6",45685],["1.2.7",203],["1.2.8",203],["1.2.9",203],["1.2.10",203],["1.2.11",203],["1.2.12",203],["1.2.13",203],["1.2.14",203],["1.2.15",203],["1.2.16",203]],"key_auths":[],"address_auths":[]},"options":{"memo_key":"GXC1111111111111111111111111111111114T1Anm","voting_account":"1.2.5","num_witness":0,"num_committee":0,"votes":[],"extensions":[]},"statistics":"2.6.2","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"owner_special_authority":[0,{}],"active_special_authority":[0,{}],"top_n_control_flags":0}
...
{"id":"2.13.37553","time":"2018-06-04T06:00:00","record":{"time_since_last_budget":600,"from_initial_reserve":"10193891740740","from_accumulated_fees":0,"from_unused_witness_budget":300000,"requested_witness_budget":20000000,"total_budget":24209195,"witness_budget":20000000,"worker_budget":4209195,"leftover_worker_funds":4209195,"supply_delta":19700000}}
{"id":"2.13.37554","time":"2018-06-04T06:10:00","record":{"time_since_last_budget":600,"from_initial_reserve":"10193872040740","from_accumulated_fees":0,"from_unused_witness_budget":300000,"requested_witness_budget":20000000,"total_budget":24209148,"witness_budget":20000000,"worker_budget":4209148,"leftover_worker_funds":4209148,"supply_delta":19700000}}
{"id":"2.13.37555","time":"2018-06-04T06:20:00","record":{"time_since_last_budget":600,"from_initial_reserve":"10193852340740","from_accumulated_fees":0,"from_unused_witness_budget":300000,"requested_witness_budget":20000000,"total_budget":24209101,"witness_budget":20000000,"worker_budget":4209101,"leftover_worker_funds":4209101,"supply_delta":19700000}}
...
{"id":"1.25.1","owner":"1.2.15","create_date_time":"2017-10-31T14:16:16","lock_days":90,"program_id":"3","amount":{"amount":10000000,"asset_id":"1.3.1"},"interest_rate":400,"memo":""}
{"id":"1.25.3","owner":"1.2.15","create_date_time":"2017-10-31T14:16:27","lock_days":1,"program_id":"1","amount":{"amount":10000000,"asset_id":"1.3.1"},"interest_rate":400,"memo":""}
{"id":"1.25.17","owner":"1.2.17","create_date_time":"2017-10-31T14:18:22","lock_days":1,"program_id":"1","amount":{"amount":500000,"asset_id":"1.3.1"},"interest_rate":400,"memo":""}
...
{"id":"2.5.0","owner":"1.2.0","asset_type":"1.3.0","balance":"1982649276131"}
{"id":"2.5.1","owner":"1.2.17","asset_type":"1.3.0","balance":"99975815407107840"}
{"id":"2.5.2","owner":"1.2.18","asset_type":"1.3.0","balance":"100275999963"}
{"id":"2.5.3","owner":"1.2.6","asset_type":"1.3.0","balance":75234770}
{"id":"2.5.4","owner":"1.2.7","asset_type":"1.3.0","balance":"9921797683209"}
{"id":"2.5.5","owner":"1.2.8","asset_type":"1.3.0","balance":"49990752447"}
...
{"id":"2.16.0","accumulated_fba_fees":0,"designated_asset":"1.3.743"}
{"id":"2.16.1","accumulated_fba_fees":0,"designated_asset":"1.3.743"}
{"id":"2.16.2","accumulated_fba_fees":0,"designated_asset":"1.3.743"}
```

上面的json文件中，每一行是一个json，其中id为对象id, 1.25.x为忠诚计划余额对象, 2.5.x为余额对象; 对象id文件参考[这里](https://github.com/gxchain/gxb-core/wiki/Objects-and-IDS)

如果要解析帐户GXS余额，需要解析1.25.x和2.5.x两个对象， asset\_id的1.3.1, owner为余额所属帐户。

