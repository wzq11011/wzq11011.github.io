+++
title = 'nerf-slam'
date = 2023-04-27T16:15:57+08:00
draft = true
+++
# Nerf-SLAM

## 1 配置环境

### 1.1 Ubuntu Clash 终端代理

clash 选择节点并调整为 global 模式，在 ~/.bashrc 中添加以下内容

```shell
export https_proxy=http://127.0.0.1:7890 
export http_proxy=http://127.0.0.1:7890 
export all_proxy=socks5://127.0.0.1:7890
```

保存文件，并更新文件

```shell
source ~/.bashrc

# 测试终端是否代理
curl cip.cc

# 显示香港的节点，则代表成功
```

### 1.2 Install nerf-slam

项目地址：[ToniRV/NeRF-SLAM: NeRF-SLAM: Real-Time Dense Monocular SLAM with Neural Radiance Fields. https://arxiv.org/abs/2210.13641 + Sigma-Fusion: Probabilistic Volumetric Fusion for Dense Monocular SLAM https://arxiv.org/abs/2210.01276 (github.com)](https://github.com/ToniRV/NeRF-SLAM)

使用 git 拉取项目代码

```shell
git clone https://github.com/ToniRV/NeRF-SLAM.git --recurse-submodules
git submodule update --init --recursive
```



使用 conda 创建一个虚拟环境，防止污染其他环境

```shell
# 创建一个名为 nerf-slam 的虚拟环境
conda create -n nerf-slam

# 查看所有虚拟环境
conda env list

# 进入创建的虚拟环境
conda activate nerf-slam

# install torch (CUDA 11.3)
pip install torch==1.12.1+cu113 torchvision==0.13.1+cu113 --extra-index-url https://download.pytorch.org/whl/cu113
```

使用 pip 安装依赖

```shell
pip install -r requirements.txt

# 安装第三方库 gtsam 所需的依赖
pip install -r ./thirdparty/gtsam/python/requirements.txt
```

### 1.3 编译 ngp 

官方教程：（cmake 版本需要大于 3.22）

```shell
sudo apt install cmake
cmake ./thirdparty/instant-ngp -B build_ngp
cmake --build build_ngp --config RelWithDebInfo -j
```

实操：

```shell
# nerf-slam 环境下，安装最新版 cmake
conda install cmake

# NeRF-SLAM 目录下
mkdir build_ngp && cd build_ngp

# 编译 ngp
cmake ../thirdparty/instant-ngp

# 报错 1：randr headers not found;install libxrandr
sudo apt install libxrandr-dev

# 报错 2：Xinerama headers not found; install libxinerama development package
sudo apt install libxinerama-dev

# 报错 3：Xcursor headers not found; install libxcursor development package
sudo apt install libxcursor-dev

# 报错 4：Could NOT find GLEW (missing: GLEW_INCLUDE_DIRS GLEW_LIBRARIES)
sudo apt install libglew-dev

# 到这一步基本没问题了
cd ..
cmake --build build_ngp --config RelWithDebInfo -j
```



按以上步骤操作，最后运行demo.py会报 pyngp 错误，使用另一个分支解决

报错信息：

```shell
self.ngp = ngp.Testbed(mode, 0) # NGP can only use device = 0
TypeError: __init__(): incompatible constructor arguments. The following argument types are supported:
    1. pyngp.Testbed(arg0: pyngp.TestbedMode)
    2. pyngp.Testbed(arg0: pyngp.TestbedMode, arg1: str, arg2: str)
    3. pyngp.Testbed(arg0: pyngp.TestbedMode, arg1: str, arg2: json)
```

解决方法：

```shell
# 删除原 instant-ngp
cd thirdparty
rm -rf instant-ngp

# 地址：https://github.com/ToniRV/instant-ngp/tree/feature/nerf_slam
git clone https://github.com/ToniRV/instant-ngp.git

# 安装依赖
sudo apt-get install build-essential git python3-dev python3-pip libopenexr-dev libxi-dev libglfw3-dev libglew-dev libomp-dev libxinerama-dev libxcursor-dev

# 更新
git submodule update --init --recursive

# NeRF-SLAM/
mkdir build_ngp && cd build_ngp

# 编译 ngp
cmake ../thirdparty/instant-ngp
cd ..
cmake --build build_ngp --config RelWithDebInfo -j
```



### 1.4 编译 gtsam

官方教程：

```shell
cmake ./thirdparty/gtsam -DGTSAM_BUILD_PYTHON=1 -B build_gtsam 
cmake --build build_gtsam --config RelWithDebInfo -j
cd build_gtsam
make python-install
```

安装

```shell
python setup.py install
```



实操：

```shell
# 创建编译目录
mkdir build_gtsam && cd build_gtsam

# 编译 gtsam
cmake ../thirdparty/gtsam -DGTSAM_BUILD_PYTHON=1

# 报错 1：Missing required Boost components >= v1.65, please install/upgrade Boost or configure your search paths.
# 解决方式 1： 创建 software，下载 boost 1.65.1 压缩包，解压编译安装
cd ..
mkdir software && cd software
wget https://boostorg.jfrog.io/artifactory/main/release/1.65.1/source/boost_1_65_1.tar.gz

# 解决方法 2：直接使用 apt 命令安装
conda install boost

cmake --build build_gtsam --config RelWithDebInfo -j


# 报错 ：ModuleNotFoundError: No module named 'pyparsing'
conda install pyparsing

# 报错：
# 解决：https://github.com/ToniRV/NeRF-SLAM/issues/23


# gtsam 安装 （gtsam > 4.0.3）
cd software
wget https://github.com/borglab/gtsam/archive/refs/tags/4.1.0.tar.gz
tar -xzvf 4.1.0.tar.gz
cd gtsam-4.1.0
mkdir build && cd build

# 编译，加入参数无TBB编译
cmake .. -DGTSAM_BUILD_PYTHON=1 -DGTSAM_PYTHON_VERSION=3.10.11 -DGTSAM_WITH_TBB=OFF

make python-install

```



Install:

```shell
python setup.py install
```



增加虚拟内存

```shell
# bs 单位：1024*1024*1024=1073741824
sudo dd if=/dev/zero of=swapfile bs=1024 count=96000000
sudo dd if=/dev/zero of=swapfile bs=1073741824 count=48

# 把空间格式化为 swap 
sudo mkswap /swapfile

# 使用创建的 swap 空间
chmod 0600 /swapfile
sudo swapon /swapfile

# 释放空间
swapoff -a
```







### 1.5 下载样本数据集

```shell
# 下载数据集
./scripts/download_replica_sample.bash

# 执行命令
python ./examples/slam_demo.py --dataset_dir=./datasets/Replica/office0 --dataset_name=nerf --buffer=100 --slam --parallel_run --img_stride=2 --fusion='nerf' --multi_gpu --gui

# 报错：AttributeError: type object 'gtsam.gtsam.Pose3' has no attribute 'identity'. Did you mean: 'Identity'?


```

也可以更改参数 `--fusion='sigma'` 来运行实现 Sigma-Fusion ，论文地址：https://arxiv.org/abs/2210.01276



### 1.6 监控 GPU

### 1.7 X11

报错信息：

```shell
03:47:17 ERROR    GLFW error #65544: X11: The DISPLAY environment variable is missing
```

> 如果以上配置仍然出现问题，可按对应问题在 Issues 里面寻找解决方案，或者也可以尝试后面第二节给出的配置流程（亲测：Titan X 显存不足，A6000 可以跑）

# 2 [jrpowers](https://github.com/jrpowers)/**[NeRF-SLAM](https://github.com/jrpowers/NeRF-SLAM)**



## 2.1 Install

[jrpowers/NeRF-SLAM: Real-Time Dense Monocular SLAM with Neural Radiance Fields. https://arxiv.org/abs/2210.13641 + Sigma-Fusion: Probabilistic Volumetric Fusion for Dense Monocular SLAM https://arxiv.org/abs/2210.01276 (github.com)](https://github.com/jrpowers/NeRF-SLAM)

Clone repo with submodules:

```shell
git clone https://github.com/jrpowers/NeRF-SLAM.git --recurse-submodules
git submodule update --init --recursive
cd thirdparty/instant-ngp/ && git checkout feature/nerf_slam
```



## 2.2 Install CUDA 11.7 and Pytorch

Use a virtual environment

```shell
conda create -n nerf-slam
conda activate nerf-slam

# CUDA
conda install -c "nvidia/label/cuda-11.7.0" cuda-toolkit

# pytorch
conda install python==3.7
pip install torch==1.13.1+cu117 torchvision==0.14.1+cu117 --extra-index-url https://download.pytorch.org/whl/cu117
```



## 2.3 Pip install requirements

```shell
pip install -r requirements.txt
pip install -r ./thirdparty/gtsam/python/requirements.txt
```



## 2.4 Compile ngp(cmake>3.22)

```shell
# 原版ngp会报错，该分支解决问题
cd thirdparty/instant-ngp/ && git checkout feature/nerf_slam

# NeRF-SLAM 目录下
mkdir build_ngp && cd build_ngp

# 编译 ngp
cmake ../thirdparty/instant-ngp
cd ..
cmake --build build_ngp --config RelWithDebInfo -j
```



## 2.5 Compile gtsam and enable the python wrapper

```shell
# 创建编译目录
mkdir build_gtsam && cd build_gtsam

# 编译 gtsam
cmake ../thirdparty/gtsam -DGTSAM_BUILD_PYTHON=1
cd ..
cmake --build build_gtsam --config RelWithDebInfo -j
cd build_gtsam
make python-install
```



## 2.6 Run

```shell
# Install
python setup.py install

# Download Sample Data
./scripts/download_replica_sample.bash

# run the command or run.sh
python ./examples/slam_demo.py --dataset_dir=./datasets/Replica/office0 --dataset_name=nerf --buffer=100 --slam --parallel_run --img_stride=2 --fusion='nerf' --multi_gpu --gui
./run.sh
```











