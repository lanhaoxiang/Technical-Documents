# 如何使用docker启动钱包和见证节点
## 1.首先安装docker
通过以下地址安装合适版本的docker

```
https://store.docker.com/search?offering=community&type=edition
```
安装完成之后执行
```
docker --version
```
若能显示类似如下版本信息，则安装成功

```
Docker version 17.09.0-ce, build afdb6d4
```

## 2.下载钱包和见证节点镜像
使用以下命令即可下载钱包和见证节点的镜像文件

```
docker pull gxbdevelop/gxb-core
```
显示下载完成之后，运行

```
docker images
```
则显示以下信息代表下载成功：

```
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
gxbdevelop/gxb-core     latest              54cf6c48134b        3 hours ago         675MB
```
## 3.通过docker启动程序
### 1）运行环境变量（docker run采用“-e”添加环境变量）

```
bool_wallet：运行模式，“true”或者不设置则运行钱包程序，“false”则运行见证人节点程序

data_dir:数据文件目录，用于存放区块等数据

以下参数为运行钱包程序下使用：
ws_server:钱包连接节点参数，例如：“ws://127.0.0.1:8091”
rpc_endpoint:钱包提供rpc接口参数，例如：“0.0.0.0:8092”
wallet_file:钱包数据文件，可以指定钱包文件，例如：“wallet.json”

以下参数为见证人节点程序下使用：
rpc_endpoint：见证节点提供rpc接口参数，例如：“0.0.0.0:8092”
witness_id：见证人ID，例如：“"1.6.1"”
seed_nodes：连接其它P2P节点列表，可以多个，例如：“["127.0.0.1:1700"]”
p2p_endpoint：提供给其它P2P节点连接的ip和端口，例如：“0.0.0.0:8093”
genesis_json：指定创世文件，例如：“genesis.json”
replay：是否采用重放的方式启动见证人节点程序，“true”或者不设置则采用重放方式启动，否则采用删除数据文件重新加载方式启动
log_file：日志是否打印在文件中，“true”则日志在文件中打印，否则直接打印到控制台
```
### 2）运行，关闭和重启程序
第一次运行采用docker run命令，这里需要注意，由于docker文件系统不能存储文件，所以需要存储下来的文件需要映射主机文件夹，且目前docker镜像只开放了8091、8092、8093端口。
#### 启动钱包

```
docker run -it -e bool_wallet='true' -e rpc_endpoint='0.0.0.0:8092' -e ws_server='wss://node15.gxb.io' -e data_dir='docker_filepath/trust_node' -p 8092:8092 -p 8093:8093 -v your_local_filepath:docker_filepath --name="gxb-cli-wallet" gxbdevelop/gxb-core
备注：docker_filepath和your_local_filepath为抽象地址，实际使用时需要填写实际存在的路径
```
#### 启动见证人节点

```
docker run -it -e bool_wallet='false' -e rpc_endpoint='0.0.0.0:8091' -e data_dir='/docker_filepath/trust_node' -e seed_nodes='["192.168.1.118:6790"]' -e p2p_endpoint='0.0.0.0:8093' -e genesis_json='genesis.json.bak' -p 8091:8091 -p 8092:8092 -p 8093:8093 -v your_local_filepath:docker_filepath --name="gxb-witness-node" gxbdevelop/gxb-core
备注：docker_filepath和your_local_filepath为抽象地址，实际使用时需要填写实际存在的路径
```
#### 关闭docker运行的程序

```
docker stop [containerID]
```

#### 重启docker程序

```
docker start [containerID]
```