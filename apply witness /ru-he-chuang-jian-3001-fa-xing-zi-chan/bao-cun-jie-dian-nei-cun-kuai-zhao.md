### 保存witness\_node节点内存数据快照

下载最新版witness\_node程序，下载地址

| 阿里云 | [http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb\_1.0.180604.tar.gz](http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_1.0.180604.tar.gz) |
| :--- | :--- |


启动witness\_node程序, 在启动参数里指定区块高度和快照文件路径

```
./programs/witness_node/witness_node --data-dir=trusted_node \
--rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:6789" \
 --log-file --max-ops-per-account=0 --partial-operations=true \
 --data-transaction-lifetime=1 \
 --plugins snapshot \
 --snapshot-at-block 9623000 --snapshot-to snapshot.0604.txt &
```

其中--snapshot-at-block 9623000指定区块高度，即在此区块高度时，保存快照； --snapshot-to snapshot.0604.txt指定了快照文件，保存在当前目录下\(也可以使用绝对路径\)

快照文件中将保存所有的内存数据对象，按行保存，每一行为一个json。如下：

```
{"id":"1.2.0","membership_expiration_date":"2106-02-07T06:28:15","merchant_expiration_date":"1970-01-01T00:00:00","datasource_expiration_date":"1970-01-01T00:00:00","data_transaction_member_expiration_date":"1970-01-01T00:00:00","registrar":"1.2.0","referrer":"1.2.0","lifetime_referrer":"1.2.0","merchant_auth_referrer":"1.2.0","datasource_auth_referrer":"1.2.0","network_fee_percentage":2000,"lifetime_referrer_fee_percentage":8000,"referrer_rewards_percentage":0,"name":"committee-account","owner":{"weight_threshold":1,"account_auths":[],"key_auths":[],"address_auths":[]},"active":{"weight_threshold":23858,"account_auths":[["1.2.6",45685],["1.2.7",203],["1.2.8",203],["1.2.9",203],["1.2.10",203],["1.2.11",203],["1.2.12",203],["1.2.13",203],["1.2.14",203],["1.2.15",203],["1.2.16",203]],"key_auths":[],"address_auths":[]},"options":{"memo_key":"GXC1111111111111111111111111111111114T1Anm","voting_account":"1.2.5","num_witness":0,"num_committee":0,"votes":[],"extensions":[]},"statistics":"2.6.0","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"owner_special_authority":[0,{}],"active_special_authority":[0,{}],"top_n_control_flags":0}
{"id":"1.2.1","membership_expiration_date":"2106-02-07T06:28:15","merchant_expiration_date":"1970-01-01T00:00:00","datasource_expiration_date":"1970-01-01T00:00:00","data_transaction_member_expiration_date":"1970-01-01T00:00:00","registrar":"1.2.1","referrer":"1.2.1","lifetime_referrer":"1.2.1","merchant_auth_referrer":"1.2.0","datasource_auth_referrer":"1.2.0","network_fee_percentage":2000,"lifetime_referrer_fee_percentage":8000,"referrer_rewards_percentage":0,"name":"witness-account","owner":{"weight_threshold":1,"account_auths":[],"key_auths":[],"address_auths":[]},"active":{"weight_threshold":251270,"account_auths":[["1.2.6",45685],["1.2.7",45689],["1.2.8",45685],["1.2.9",45685],["1.2.10",45685],["1.2.11",45685],["1.2.12",45685],["1.2.13",45685],["1.2.14",45685],["1.2.15",45685],["1.2.16",45685]],"key_auths":[],"address_auths":[]},"options":{"memo_key":"GXC1111111111111111111111111111111114T1Anm","voting_account":"1.2.5","num_witness":0,"num_committee":0,"votes":[],"extensions":[]},"statistics":"2.6.1","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"owner_special_authority":[0,{}],"active_special_authority":[0,{}],"top_n_control_flags":0}
{"id":"1.2.2","membership_expiration_date":"2106-02-07T06:28:15","merchant_expiration_date":"1970-01-01T00:00:00","datasource_expiration_date":"1970-01-01T00:00:00","data_transaction_member_expiration_date":"1970-01-01T00:00:00","registrar":"1.2.2","referrer":"1.2.2","lifetime_referrer":"1.2.2","merchant_auth_referrer":"1.2.0","datasource_auth_referrer":"1.2.0","network_fee_percentage":2000,"lifetime_referrer_fee_percentage":8000,"referrer_rewards_percentage":0,"name":"relaxed-committee-account","owner":{"weight_threshold":1,"account_auths":[],"key_auths":[],"address_auths":[]},"active":{"weight_threshold":23858,"account_auths":[["1.2.6",45685],["1.2.7",203],["1.2.8",203],["1.2.9",203],["1.2.10",203],["1.2.11",203],["1.2.12",203],["1.2.13",203],["1.2.14",203],["1.2.15",203],["1.2.16",203]],"key_auths":[],"address_auths":[]},"options":{"memo_key":"GXC1111111111111111111111111111111114T1Anm","voting_account":"1.2.5","num_witness":0,"num_committee":0,"votes":[],"extensions":[]},"statistics":"2.6.2","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"owner_special_authority":[0,{}],"active_special_authority":[0,{}],"top_n_control_flags":0}
...
{"id":"2.13.37553","time":"2018-06-04T06:00:00","record":{"time_since_last_budget":600,"from_initial_reserve":"10193891740740","from_accumulated_fees":0,"from_unused_witness_budget":300000,"requested_witness_budget":20000000,"total_budget":24209195,"witness_budget":20000000,"worker_budget":4209195,"leftover_worker_funds":4209195,"supply_delta":19700000}}
{"id":"2.13.37554","time":"2018-06-04T06:10:00","record":{"time_since_last_budget":600,"from_initial_reserve":"10193872040740","from_accumulated_fees":0,"from_unused_witness_budget":300000,"requested_witness_budget":20000000,"total_budget":24209148,"witness_budget":20000000,"worker_budget":4209148,"leftover_worker_funds":4209148,"supply_delta":19700000}}
{"id":"2.13.37555","time":"2018-06-04T06:20:00","record":{"time_since_last_budget":600,"from_initial_reserve":"10193852340740","from_accumulated_fees":0,"from_unused_witness_budget":300000,"requested_witness_budget":20000000,"total_budget":24209101,"witness_budget":20000000,"worker_budget":4209101,"leftover_worker_funds":4209101,"supply_delta":19700000}}
{"id":"2.16.0","accumulated_fba_fees":0,"designated_asset":"1.3.743"}
{"id":"2.16.1","accumulated_fba_fees":0,"designated_asset":"1.3.743"}
{"id":"2.16.2","accumulated_fba_fees":0,"designated_asset":"1.3.743"}
```







