# 其他说明 {#其他说明}

## 1. 如何获取私钥 {#privatekey}

GXB-Box使用的是活跃权限私钥，可以在 账户-&gt;权限-&gt;活跃权限-&gt;点击公钥-&gt;解锁 进行查看

## 2. 系统状态码说明 {#2-系统状态码说明}

| **状态码** | **描述** |
| :--- | :--- |
| NOT\_FOUND | 数据项不存在 |
| INVALID\_PARAMS | 参数错误 |
| FORBIDDEN | 已下架 |
| BALANCE\_NOT\_ENOUGH | 余额不足 |
| DATASOURCE\_OFFLINE | 数据源离线 |
| UNKNOWN\_ERROR | 未知错误 |

## 3. 元数据定义 {#3-元数据定义}

```
{
    "<字段名称>":{
        "type":<基本类型>,
        "desc":<字段描述>
        "required":<ture|false,代表是否必须>,
        "sample":<举例>
    }
}
```

基本类型：

| 类型 | 含义 |
| :--- | :--- |
| string | 字符串类型 |
| integer | 整数类型 |
| number | 浮点数类型 |
| boolean | 布尔型（true或者false） |

嵌套类型：

| 类型 | 含义 |
| :--- | :--- |
| json | json结构，json类型的fields字段定义了多个基本类型 |
| array | 数组类型，array类型的columns字段定义了多个基本类型 |

> json和array的用法见下方：[复杂格式数据定义](https://doc.gxb.io/box/other.html#complex)

## 4. 复杂格式数据定义 {#complex}

来看一个最复杂的数据格式定义，下面的数据格式定义中包含了所有支持的数据类型以及定义方式：

```
{
    "name": {
        "type": "string",
        "desc": "姓名",
        "required:":true,
        "sample": "张三"
    },
    "isBoy":{
        "type":"boolean",
        "desc":"是否为男孩",
        "sample":true
    }
    "age":{
        "type":"integer",
        "desc":"年龄",
        "sample":20
    },
    "balance":{
        "type":"number"，
        "desc":"余额",
        "sample":1000.11
    },
    "history":{
        "type":"array",
        "desc":"交易历史",
        "columns":{
            "date":{
                "type":"integer",
                "desc":"时间戳",
                "defaultsTo":0
            },
            "amount":{
                "type":"number",
                "desc":"金额",
                "defaultsTo":0.0
            }
        }
    },
    other:{
        "type":"json",
        "desc":"其他信息",
        "fields":{
            "remark":{
                "type":"string",
                "desc":"备注",
                "sample":"其他信息备注"
            }
            "parents":{
                "type":"array",
                "desc":"父母信息",
                "columns":{
                    "name":{
                        "type":"string",
                        "desc":"姓名",
                        "sample":"父亲"
                    },
                    "age":{
                        "type":"integer",
                        "desc":"年龄",
                        "sample":50
                    }
                }
            }
        }
    }
}
```

非必要情况下不建议使用array和json这种复杂的数据格式定义，以免增加对接复杂度

## 5. 生产环境启动 {#pm2}

推荐使用pm2来启动生产环境GXB-Box，安装方法:

```
npm install pm2 -g
```

进入gxb-box目录并在命令行下执行:

```
pm2 stop gxb-box
pm2 start dist/gxb-box.js --name gxb-box --log-date-format="YYYY-MM-DD HH:mm Z"
```

进程查看:

```
pm2 ls

```

日志查看:

```
pm2 logs gxb-box

```

监控:

```
pm2 monit

```

重启:

```
pm2 restart gxb-box

```

关闭:

```
pm2 stop gxb-box

```

更多命令可查看PM2官方API文档:[http://pm2.keymetrics.io/](http://pm2.keymetrics.io/)

## 6. 源码方式启动 {#sourcecode}

首次下载

```
git clone https://github.com/gxchain/gxb-box
cd gxb-box
npm install -d
npm install webpack -g
npm run build
pm2 start dist/gxb-box.js --name gxb-box --log-date-format="YYYY-MM-DD HH:mm Z"
```

代码升级

```
git stash
git pull 
git stash pop
npm install -d 
npm run build
pm2 restart gxb-box
```

## 7. npm install很慢 {#7-npm-install很慢}

国内主机建议切换成淘宝镜像

```
npm config set registry https://registry.npm.taobao.org
```

## 8. 模块安装失败 {#8-模块安装失败}

部分模块依赖gcc

```
yum -y install gcc
yum -y install gcc-c++
```

## 9. 返回数据结构说明 {#9-返回数据结构说明}

创建交易请求返回格式\(json\)：

```
{
    code:"",
    message:"",
    data:{}
}
```

通过/api/request/:request\_id/data返回数据格式\(array\)

```
[{
    request_id:"",
    datasource:"", //针对联盟市场，自由市场非必须
    body: {
        code: "",
        message: "",
        data:{}
    }
}]
```

推送返回数据格式\(json\)

```
{
    request_id:"",
    datasource:"",//针对联盟市场，自由市场非必须
    body: {
        code: "",
        message: "",
        data:{}
    }
}
```



