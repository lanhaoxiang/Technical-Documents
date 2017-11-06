# get\_account\_history\_by\_operations

##### 说明：根据oeration\_type查询帐户最近的交易记录，支持翻页并且返回operation对应的txID {#说明：根据oerationtype查询帐户最近的交易记录，支持翻页并且返回operation对应的txid}

##### usage: get\_account\_history\_by\_operations \[\] start limit\_num {#usage-getaccounthistorybyoperations--start-limitnum}

##### 参数：account\_name\_or\_id, \[\], start, limit\_num {#参数：accountnameorid--start-limitnum}

| 参数 | 说明 |
| :--- | :--- |
| account\_name\_or\_id | 帐户名或者id |
| \[\] | operation\_type，比如转帐为0，可以写成\[0\]。若传空，则表示查询所有的operation\_type |
| start | 起始序号，同get\_relative\_account\_history |
| limit\_num | 显示最近limit条交易记录 |



