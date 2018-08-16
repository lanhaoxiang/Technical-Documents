GXChain智能合约数据库操作

------

智能合约数据库的操作，主要使用multi-index table的emplace, erase, modify和find方法。

### 1. 增加

使用emplace方法，完成table中新对象的增加。其中emplace函数接收两个参数，第一个是`payer`,第二个是`lamada`表达式。

```c++
        tables.emplace(payer, [&](auto &o) {
            o.issuer = owner;
        }); 
```

### 2. 删除

使用erase方法，删除table中指定的对象。

```c++
        tables.erase(table_iter);
```

### 3. 更新

使用modify方法，更新table中的对象。

```c++
        tables.modify(table_iter, payer, [&](auto &o) {
            o.issuer = new_issuer;
        });
```

### 4. 查询

查询数据库有两种方法：使用主键查询和使用二级索引查询。

使用主链查询：

```
        auto table_itr = tables.find(issuer);
```
