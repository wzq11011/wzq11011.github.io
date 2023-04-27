---
title: nerf-slam
date: 2023-04-27 16:15:57
tags: slam
Categories: slam
---



# Nerf-SLAM





## 1 配置环境



## 1.1 Ubuntu Clash 终端代理

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



## 1.2 Install nerf-slam

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

编译 ngp （cmake 版本需要大于 3.22）

```shell
sudo apt install cmake
cmake ./thirdparty/instant-ngp -B build_ngp
cmake --build build_ngp --config RelWithDebInfo -j
```

编译 gtsam

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



## 1.3 下载样本数据集

```shell
# 下载数据集
./scripts/download_replica_sample.bash

# 执行命令
python ./examples/slam_demo.py --dataset_dir=./datasets/Replica/office0 --dataset_name=nerf --buffer=100 --slam --parallel_run --img_stride=2 --fusion='nerf' --multi_gpu --gui
```

也可以更改参数 `--fusion='sigma'` 来运行实现 Sigma-Fusion ，论文地址：https://arxiv.org/abs/2210.01276



## 1.4 监控 GPU





















