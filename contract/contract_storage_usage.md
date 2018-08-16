# <a name="index"></a>index
* [合约存储简介](#smart_contract_storage_brief_introduction)
* [example](#example)
* [定义存储类型](#define_type)
* [增](#add)
* [删](#delete)
* [查](#find)
* [改](#modify)


## <a name="smart_contract_storage_brief_introduction"></a>合约存储简介
用于持久化存储合约数据  
数据必须以c++类的实例为单位存储，所以必须在合约中定义存储的c++类，每个类一张表，类似于关系型数据库的单表，不同的是他有以下特点：  
```  
支持多索引   
不支持联合索引   
只有主键是唯一的   
索引类型只支持uint64_t类型   
如果想要将字符串作为索引，必须用合约库中的uint64_t string_to_name(string str)将字符串转为uint64_t，字符串长度限制为12个字符以内，只能包括([a-z].[1-5])共32个字符   
对于除主键以外的索引，当有多条记录索引值一样时，获取的对象是最早插入存储的记录   
支持增删查改操作  
```
后面的内容围绕example来说明  
[go_back](#index)  


## <a name="example"></a>example
```c++
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/multi_index.hpp>
#include <graphenelib/print.hpp>

using namespace graphene;

class multindex : public contract
{
    struct offer;

  public:
    multindex(uint64_t id)
        : contract(id)
        , offers(_self, _self)
    {
    }

    //@abi action
    void additem(uint64_t i1, uint64_t i2, std::string name)
    {
        uint64_t pk = offers.available_primary_key();
        print("pk=", pk);
        offers.emplace(0, [&](auto &o) {
            o.id = pk;
            o.idx1 = i1;
            o.idx2 = i2;
            o.stringidx = graphenelib::string_to_name(name.c_str());
        });
    }

    //@abi action
    void getbypk(uint64_t key)
    {
        auto it = offers.find(key);
        if (it != offers.end()) {
            dump_item(*it);
        }
    }

    //@abi action
    void getbyidx1(uint64_t key)
    {
        auto idx = offers.template get_index<N(idx1)>();
        auto matched_offer_itr = idx.lower_bound(key);
        if (matched_offer_itr != idx.end()) {
            dump_item(*matched_offer_itr);
        }
    }

    //@abi action
    void getbyidx2(uint64_t key)
    {
        auto idx = offers.template get_index<N(idx2)>();
        auto matched_offer_itr = idx.lower_bound(key);
        if (matched_offer_itr != idx.end()) {
            dump_item(*matched_offer_itr);
        }
    }
    
    //@abi action
    void getbystring(std::string key)
    {
        auto idx = offers.template get_index<N(stringidx)>();
        auto matched_offer_itr = idx.lower_bound(N(key));
        if (matched_offer_itr != idx.end()) {
            dump_item(*matched_offer_itr);
        }
    }

  private:
    void dump_item(const offer &o)
    {
        print("offer.id:", o.id, "\n");
        print("offer.idx1:", o.idx1, "\n");
        print("offer.idx2:", o.idx2, "\n");
        graphenelib::name n;
        n.value = o.stringidx;
        print("offer.stringidx:", n.to_string().c_str(), "\n");
    }

  private:
    //@abi table offer i64
    struct offer {
        uint64_t id;
        uint64_t idx1;
        uint64_t idx2;
        uint64_t stringidx;

        uint64_t primary_key() const { return id; }

        uint64_t by_index1() const { return idx1; }

        uint64_t by_index2() const { return idx2; }
        
        uint64_t by_stringidx() const {return stringidx; }

        GRAPHENE_SERIALIZE(offer, (id)(idx1)(idx2)(stringidx))
    };

    typedef multi_index<N(offer), offer,
                        indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,
                        indexed_by<N(idx2), const_mem_fun<offer, uint64_t, &offer::by_index2>>,
                        indexed_by<N(stringidx), const_mem_fun<offer, uint64_t, &offer::by_stringidx>>>
        offer_index;

    offer_index offers;
};

GRAPHENE_ABI(multindex, (additem)(getbypk)(getbyidx1)(getbyidx2)(getbystring))

```


## <a name="define_type"></a>定义存储类型
```c++
  private:
    //@abi table offer i64
    struct offer {
        uint64_t id;
        uint64_t idx1;
        uint64_t idx2;
        uint64_t stringidx;

        uint64_t primary_key() const { return id; }

        uint64_t by_index1() const { return idx1; }

        uint64_t by_index2() const { return idx2; }
        
        uint64_t by_stringidx() const {return stringidx; }

        GRAPHENE_SERIALIZE(offer, (id)(idx1)(idx2)(stringidx))
    };

    typedef multi_index<N(offer), offer,
                        indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,
                        indexed_by<N(idx2), const_mem_fun<offer, uint64_t, &offer::by_index2>>,
                        indexed_by<N(stringidx), const_mem_fun<offer, uint64_t, &offer::by_stringidx>>>
        offer_index;

    offer_index offers;
```

类型必须要带注释//@abi table offer i64  
@abi table固定写法  
offer是表名字，根据业务需求自定义不能超过12个字符并且只能是[a-z][1-5].共32种字符，以字母和.开头  
i64是索引类型，固定写i64即可  

对于struct offer{...}就是普通的c++类，最下面的GRAPHENE_SERIALIZE(offer, (id)(idx1)(idx2)(stringidx))用于序列化  
GRAPHEN\_SERIALIZE(类型名, (字段名1)(字段名2)(字段名3)(字段名4)...)  

uint64_t primary\_key() const { return id; } 这段代码的函数名和类型都是固定的，不能改动，用于指定唯一主键，这里把id作为主键  

其他3个函数用于定义二级索引时使用  

下面的代码用于根据定义的c++类来定义索引：  
```
    typedef multi_index<N(offer), offer,  
                        indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,  
                        indexed_by<N(idx2), const_mem_fun<offer, uint64_t, &offer::by_index2>>,  
                        indexed_by<N(stringidx), const_mem_fun<offer, uint64_t, &offer::by_stringidx>>>  
        offer_index;  
typedef multi_index<N(offer), offer,这一行代码N(offer)与注释'//@abi table offer i64'中的offer要一致  
, offer用于指定之前定义的类型名字 
``` 

```
indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,这段代码用于定义一个二级索引，一个表可以定义最多16个二级索引，这里定义了3个  
N(idx1)用于定义索引名  
const_mem_fun<offer, uint64_t, &offer::by_index1>尖括号中第一个参数是之前定义的offer类型名，第二个参数是索引的类型，第三个参数是索引调用的offer类中的函数名  
```

最后需要在合约中定义索引的实例变量offer_index offers， 在合约的构造函数中需要使用合约的_self(合约id)来初始化：   
```c++_
    multindex(uint64_t id)
        : contract(id)
        , offers(_self, _self)
    {
    }
```
[go_back](#index)  


## <a name="add"></a>增
```c++
uint64_t pk = offers.available_primary_key();
print("pk=", pk);
offers.emplace(0, [&](auto &o) {
    o.id = pk;
    o.idx1 = i1;
    o.idx2 = i2;
    o.stringidx = graphenelib::string_to_name(name.c_str());
});
```
uint64_t pk = offers.available\_primary\_key(); 用于获取自增主键的下一个合法主键，也可以自己指定  

```c++
offers.emplace(0, [&](auto &o) {  
    o.id = pk;  
    o.idx1 = i1;  
    o.idx2 = i2;  
    o.stringidx = graphenelib::string_to_name(name.c_str());  
});
```

插入对象用lambda表达式来给新增的对象o赋值

o.stringidx = graphenelib::string_to_name(name.c_str());这里就是用字符串类型作为索引的实现方式，不支持直接用字符串作为索引

[go_back](#index)  


## <a name="delete"></a>删
请先阅读[查](#find)  
删除一般通过表的迭代器删除，一般先调用find来找到需要删除的对象的迭代器来删除

offers.delete(it);  it是查找返回的对象的迭代器
[go_back](#index)  


## <a name="find"></a>查
```c++
auto idx = offers.template get_index<N(stringidx)>();
auto matched_offer_itr = idx.lower_bound(N(key));
if (matched_offer_itr != idx.end()) {
    dump_item(*matched_offer_itr);
}
```

auto idx = offers.template get_index<N(stringidx)>();获取offer表名字为stringidx的索引，offer表有4个索引，一个是主键索引，其他3个二级分别是idx1，idx2，  stringidx，主键索引的查找更方便一些，不需要通过索引的名字先获取索引，再根据索引查找对应的key，而是直接offers.find(pk)，同样也是返回对象的迭代器。  

auto matched_offer_itr = idx.lower_bound(N(key));通过索引查找字符串key对应的主键对象，并返回相应的迭代器matched_offer_itr  
[go_back](#index)  


## <a name="modify"></a>改

请请先阅读[查](#find)  

修改对象一般是通过对象的迭代器和lambda表达式来修改

```c++
offers.modify(it, 0, [&](auto &o) {
	//这里是对象的修改代码
	o.idx1 = 1000;
});
```

[go_back](#index)  
