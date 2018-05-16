# 如何源码编译公信宝见证节点和命令行钱包 {#如何源码编译公信宝见证节点和命令行钱包}

目前支持ubuntu 和 macOS。

## 依赖安装 {#依赖安装}

### ubuntu系统 {#ubuntu系统}

推荐系统为ubuntu14.04 LTS, 如果openssl版本不是1.0.x，则需要源码安装openssl1.0.x。

先安装gcc5

```
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install gcc-5 g++-5
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-5 60 --slave /usr/bin/g++ g++ /usr/bin/g++-5

```

安装依赖包：

```
sudo apt-get install cmake make python-dev libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp

```

安装boost库：

```
wget 'http://sourceforge.net/projects/boost/files/boost/1.57.0/boost_1_57_0.tar.gz' -O boost_1_57_0.tar.gz
tar zxvf boost_1_57_0.tar.gz
cd boost_1_57_0
bash ./bootstrap.sh --prefix=/usr
sudo ./b2 --buildtype=complete install

```

### macOS {#macos}

推荐macOS Sierra 10.12.6

安装依赖包：

```
brew install wget cmake git openssl autoconf automake doxygen libtool
```

安装 boost库：

```
wget 'http://sourceforge.net/projects/boost/files/boost/1.57.0/boost_1_57_0.tar.gz' -O boost_1_57_0.tar.gz
tar zxvf boost_1_57_0.tar.gz
cd boost_1_57_0
bash ./bootstrap.sh --prefix=/usr
./b2 --buildtype=complewte install toolset=clang cxxflags="-arch x86_64" linkflags="-arch x86_64"

```

## 下载源码，编译 {#下载源码，编译}

```
git clone https://github.com/gxchain/gxb-core.git
cd gxb-core
git submodule update --init --recursive
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo .
make

```

如果编译报openssl找不到，则需要修改cmake参数，如：

```
cmake -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl \
-DOPENSSL_INCLUDE_DIR=/usr/include/openssl -DOPENSSL_LIBRARIES=/usr/lib/openssh \
 -DCMAKE_BUILD_TYPE=RelWithDebInfo .
```



