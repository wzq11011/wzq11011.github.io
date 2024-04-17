---
title: voldor-imu
date: 2023-04-25 17:56:33
description: voldor 环境配置、ai-imu 论文精读
---

VOLDOR-SLAM: For the times when feature-based or direct methods are not good enough (ICRA 2021)

# 1 环境配置

## 1.1 VOLDOR-SLAM

```Shell
# env
conda create -n voldor python==3.6.9

# activate
conda activate voldor

# install the python dependencies
cd slam_py/install
pip install -r ./requirements.txt

# install OpenCV
sudo apt install libopencv-dev

# PyOpenGL
sudo apt install python-opengl

# Ceres: http://ceres-solver.org/installation.html
wget https://github.com/ceres-solver/ceres-solver/archive/refs/tags/2.1.0.tar.gz
tar -zxvf 2.1.0.tar.gz
mv ceres-solver-2.1.0 ceres-solver
cd ceres-solver
mkdir build && cd build
cmake ..
sudo make install -j12

# pyDBoW3
git clone https://github.com/htkseason/pyDBoW3.git
```

libboost.python

```Shell
wget https://boostorg.jfrog.io/artifactory/main/release/1.68.0/source/boost_1_68_0.tar.gz
```

在编译安装 pyDBoW3时遇到一些问题，把 build.sh 文件拆分一步步执行，排除错误。

VOLDOR/slam_py/install/pyDBoW3/src/CMakeLists.txt 中加入 DBoW3 路径

```Plaintext
set(DBoW3_DIR /home/data1/sebas/projects/VOLDOR/slam_py/install/pyDBoW3/install/DBow3/lib/cmake/DBoW3)
SET(DBoW3_USE_STATIC_LIBS ON)
find_package(DBoW3 REQUIRED)
```

然后执行在 pyDBoW3/build 目录下执行 cmake 命令

```Shell
sudo cmake -DBUILD_PYTHON3=on \
      -DPYTHON_EXECUTABLE=/usr/bin/python3.6 \
      -DBUILD_STATICALLY_LINKED=OFF \
      -DOpenCV_DIR=/data/zhangjiguang/wzq/projects/VOLDOR/slam_py/install/pyDBoW3/install/opencv3/build \
      -DDBoW3_DIR=/data/zhangjiguang/wzq/projects/VOLDOR/slam_py/install/pyDBoW3/install/DBow3/build \
      -DDBoW3_INCLUDE_DIRS=/data/zhangjiguang/wzq/projects/VOLDOR/slam_py/install/pyDBoW3/install/DBow3/src \
      -DCMAKE_BUILD_TYPE=Release ../src
 
# 导入路径的方法：在CMakeLists.txt中更改；或者在命令行设置全局变量 
export DBoW3_DIR=/home/data1/sebas/projects/VOLDOR/slam_py/install/pyDBoW3/install/DBow3
export CMAKE_PREFIX_PATH=/home/data1/sebas/projects/VOLDOR/slam_py/install/pyDBoW3/install/DBow3:$CMAKE_PREFIX_PATH

export CMAKE_PREFIX_PATH=/usr/lib/x86_64-linux-gnu:$CMAKE_PREFIX_PATH

sudo make -j12
```

以上命令都执行成功后，在 build 目录下会生成一个 pyDBoW3.so 文件，将其复制到 demo 目录下。

```Shell
# build vo only
cd slam_py/install  
python setup_linux_vo.py build_ext -i

# build full slam pipeline
cd slam_py/install  
python setup_linux_full.py build_ext -i
```

## 1.2 AI-IMU

```Shell
# ai-imu
conda create -n ai-imu python==3.6.9

# install dependencies
pip install matplotlib numpy termcolor scipy navpy

# torch
# 新版本会报错
conda install pytorch==1.12.1 torchvision==0.13.1 torchaudio==0.12.1 cudatoolkit=10.2 -c pytorch

# 使用旧版本
conda install pytorch torchvision cudatoolkit=10.2
```

clone the repo and test

```Shell
# clone 
git clone https://github.com/mbrossar/ai-imu-dr.git

# Download reformated pickle format of the 00-11 KITTI IMU raw data
wget "https://www.dropbox.com/s/ey41xsvfqca30vv/data.zip"
mkdir ai-imu-dr/results
unzip data.zip -d ai-imu-dr
rm data.zip


# Download training parameters
wget "https://www.dropbox.com/s/77kq4s7ziyvsrmi/temp.zip"
unzip temp.zip -d ai-imu-dr/temp
rm temp.zip

# Test the filters
cd ai-imu-dr/src
python3 main_kitti.py
```

## 1.3 Docker

ubuntu 安装 docker

```Bash
# 安装
sudo apt install docker.io nvidia-docker2

# 创建 docker 用户组
sudo groupadd docker

# 将用户加入 docker 用户组
sudo gpasswd -a ${username} docker

# 重启 docker 应用
sudo systemctl restart docker

# 添加访问和执行权限
sudo chmod a+rw /var/run/docker.sock

# 更换 docker 默认存储位置及镜像源
docker info

# 将默认位置的 docker 文件夹复制到新目录
sudo mv /var/lib/docker /home/data1/

sudo vim /etc/docker/daemon.json

# 以下为修改内容
{
    "runtimes": {
        "nvidia": {
            "path": "nvidia-container-runtime",
            "runtimeArgs": []
        }
    },
    "data-root":"/home/data1/docker",
    "registry-mirrors":[
                        "https://hub-mirror.c.163.com/",
                        "https://docker.mirrors.ustc.edu.cn/"
                        ]
}

# 重启 docker 服务
sudo systemctl daemon-reload
sudo systemctl restart docker


# 查看当前文件夹及文件大小
sudo du -h --max-depth=1

# df 以磁盘分区为单位查看文件系统
df -lh

# 拉取镜像:https://hub.docker.com/r/nvidia/cuda/tags?page=3&name=18
docker pull nvidia/cuda:11.4.0-devel-ubuntu18.04

# test
sudo docker run --rm --gpus all nvidia/cuda:11.4.0-devel-ubuntu18.04 nvidia-smi

# -i 控制台交互  -t 支持终端登录  -d 指定容器运行于后台
# -v 给容器挂载存储卷，挂载到容器某个目录（前者是宿主机目录，后者是容器目录，中间以:分隔）
# -p 端口映射（前者是宿主机目录，后者是容器目录，中间以:分隔，例如 -p 80:80）
# -m  --memory=[] 指定容器内存上限
# --name=[] 指定容器名字
# --gpus all 使用宿主机gpu
# --rm 容器停止后自动删除容器，常用来测试
docker run -itd -v ~/work:/work --name=Ubuntu20.04-CUDA --gpus all nvidia/cuda:11.4.2-cudnn8-devel-ubuntu20.04

# Titan X
docker run --gpus all -itd --privileged=true -p 50097:22 --name voldor-imu \
       -v /home/data1/projects:/home/projects \
       -e DISPLAY=$DISPLAY \
       -e GDK_SCALE \
       -e GDK_DPI_SCALE \
       nvidia/cuda:11.4.0-devel-ubuntu18.04 /bin/bash
       

# A6000
docker run --gpus all -itd --privileged=true -p 50097:22 --name voldor-imu \
       -v /data/zhangjiguang/wzq/voldor-imu:/home/voldor-imu \
       -e DISPLAY=$DISPLAY \
       -e GDK_SCALE \
       -e GDK_DPI_SCALE \
       nvidia/cuda:11.4.0-devel-ubuntu18.04 /bin/bash

# 查看创建的容器ID
docker ps -a 

# 进入已创建的容器
docker attach [ID]

# 设置 root 密码
passwd

# 配置ssh
apt update
apt install openssh-server vim wget curl cmake

# 设置 ssh 配置文件
sudo vim /etc/ssh/sshd_config

Port 22
PermitRootLogin yes  
UsePAM no

# 
service ssh restart

# connect
ssh root@10.1.16.116 -X -p 50096

# DISPLAY
export DISPLAY=10.1.16.227:0.0
echo $DISPLAY

# test
apt install x11-apps
xclock
```

其他源介绍：

科大镜像：https://docker.mirrors.ustc.edu.cn/

网易：https://hub-mirror.c.163.com/

七牛云加速器：https://reg-mirror.qiniu.com

Docker中国区官方镜像：https://registry.docker-cn.com

阿里云：https://阿里云镜像服务id.mirror.aliyuncs.com

原文链接：https://blog.csdn.net/m0_37282062/article/details/115770314

### 1.3.1 docker 换源及存储位置

### 1.3.2 打包发布镜像

```bash
docker commit 07da voldor-imu:v1

# tag
docker tag voldor-imu:v1 wzq11011/voldor-imu:v1

# push
docker push wzq11011/voldor-imu:v1
```





退出容器但不关闭容器：ctrl+p+q

vscode 修改文件提示没有权限，修改文件所有者

```Bash
# 递归修改文件所有者
sudo chown -R sebas projects/

# 更改用户组
chgrp -R sebas projects/
git clone https://github.com/htkseason/VOLDOR.git
git clone https://github.com/mbrossar/ai-imu-dr.git

# python 3.6.9
python3

# pip
apt install python3-pip

pip3 install --upgrade pip

# ceres-solver
# http://ceres-solver.org/installation.html#linux
apt install cmake libgoogle-glog-dev libgflags-dev libatlas-base-dev libeigen3-dev libsuitesparse-dev

# boost
# https://blog.csdn.net/qq_41854911/article/details/119454212
apt install libboost-all-dev
docker exec -it 07da /bin/bash
```

# 2 报错信息记录：

## 2.1 cmake版本问题

报错：internal error, please report: running "cmake" failed: cannot create transient scope: DBus error "org.freedesktop.DBus.Error.TimedOut": [Failed to activate service 'org.freedesktop.systemd1': timed out (service_start_timeout=25000ms)]

解决：

```Shell
pip uninstall cmake

sudo apt install cmake

# 然后再重新编译解决
```

## 2.2 Boost

报错：

```Shell
-- Boost 1.54 found.
CMake Error at /usr/lib/cmake/Boost-1.81.0/BoostConfig.cmake:141 (find_package):
  Could not find a package configuration file provided by "boost_python-py36"
  (requested version 1.81.0) with any of the following names:

    boost_python-py36Config.cmake
    boost_python-py36-config.cmake

  Add the installation prefix of "boost_python-py36" to CMAKE_PREFIX_PATH or
  set "boost_python-py36_DIR" to a directory containing one of the above
  files.  If "boost_python-py36" provides a separate development package or
  SDK, be sure it has been installed.
Call Stack (most recent call first):
  /usr/lib/cmake/Boost-1.81.0/BoostConfig.cmake:262 (boost_find_component)
  /usr/share/cmake-3.10/Modules/FindBoost.cmake:242 (find_package)
  CMakeLists.txt:130 (FIND_PACKAGE)
```

解决：

```Shell
# 手动下载编译 boost
wget https://boostorg.jfrog.io/artifactory/main/release/1.68.0/source/boost_1_68_0.tar.gz

tar -zxvf boost_1_68_0.tar.gz

./bootstrap.sh --with-libraries=all --with-toolset=gcc
./b2
sudo ./b2 install
sudo ldconfig
```

## 2.3 opencv

执行demo的时候报错

> 报错信息如下：

```Bash
Exception in thread Thread-29:
Traceback (most recent call last):
  File "/usr/lib/python3.6/threading.py", line 916, in _bootstrap_inner
    self.run()
  File "/usr/lib/python3.6/threading.py", line 864, in run
    self._target(*self._args, **self._kwargs)
  File "../slam_py/voldor_slam.py", line 718, in vo_thread
    cv2.imshow('tmpkf_depth', (self.basefocal*0.04)/self.frames[self.fid_cur_tmpkf].get_scaled_depth())
cv2.error: OpenCV(4.7.0) /tmp/pip-install-ftep5xuc/opencv-python_faa811634b06405b915df5c9319b9c00/opencv/modules/highgui/src/window.cpp:1272: error: (-2:Unspecified error) The function is not implemented. Rebuild the library with Windows, GTK+ 2.x or Cocoa support. If you are on Ubuntu or Debian, install libgtk2.0-dev and pkg-config, then re-run cmake or configure script in function 'cvShowImage'
```

解决方法

```Bash
# 查看 opencv-python 版本
pip show opencv-python

# 安装对应版本的 opencv-contrib
pip install opencv-contrib-python==4.7.0.72
```

参考：https://blog.csdn.net/qq_46018888/article/details/121430749







# 3 论文

## 3.1 VOLDOR-SLAM

### 3.1.1 摘要总结

作者提出了一种基于外部密集光流输入的密集间接SLAM系统。扩展了概率视觉里程计模型VOLDOR [Min et al. CVPR’20]，通过引入几何先验来从单目捕获中鲁棒地引导估计，同时无缝地支持立体或RGB-D图像。论文中定制的后端将中间几何估计与管理增量姿态图连接性的自适应优先级方案紧密耦合。利用密集光流方法的最新进展，实现了准确和稳健的相机姿态估计，同时构建了细粒度的全局一致的密集环境地图。我们的开源实现在单个GTX1080Ti GPU上在线运行，速度约为15 FPS。

相关工作部分回顾了间接SLAM、直接SLAM和密集光流方法的相关文献，并指出了它们的优缺点。间接SLAM方法通过稀疏关键点匹配来建立帧间的几何关系，然后通过PnP或BA等算法来估计相机姿态和场景结构。这些方法通常可以实时运行，但是可能受到缺乏纹理、重复结构或退化几何配置等因素的影响。直接SLAM方法通过联合光流估计一致的场景结构和相机姿态来避免关键点匹配，但是这些方法通常对光照变化敏感，需要精确的光度校准，并且需要有足够的纹理区域。密集光流方法通过计算帧间像素级别的运动来提供稠密的几何信息，计算成本高昂，并且可能受到遮挡、运动模糊或低纹理等因素的影响。

### 3.1.2 使用方法

论文中使用的方法是**密集间接SLAM**，它基于外部密集光流输入来估计相机姿态和场景结构。论文的方法分为两个部分：前端和后端。

- 前端部分是基于VOLDOR的概率视觉里程计模型，它使用密集光流残差来建立帧间的几何关系，并利用几何先验来从单目、双目或RGB-D图像中恢复相机运动和深度图。前端部分还包括了一个帧对齐模块，用于校正光流估计的误差，并提高深度图的质量。
- 后端部分是一个定制的位姿图优化模块，它将前端的几何估计与一个自适应的优先级方案紧密耦合，以管理增量位姿图的连接性。后端部分还包括了一个地图重建模块，用于从关键帧的深度图中构建细粒度的全局一致的密集环境地图。

### 3.1.3 实验部分

- 实验部分首先介绍了实验的设置和评估指标，包括相机姿态误差、绝对轨迹误差、相对姿态误差和地图重建误差等。
- 然后在四个数据集上进行了实验，分别是TartanAir、KITTI、EuRoC和TUM RGB-D。这些数据集涵盖了不同的输入模式、场景复杂度和运动模式，以验证论文的方法的通用性和鲁棒性。
- 接着展示了论文的方法在不同输入模式下的定量结果，包括单目、双目和RGB-D。实验结果表明，论文的方法在所有数据集上都取得了优秀的性能，超过了其他SLAM方法的表现。
- 最后展示了论文的方法在不同输入模式下的定性结果，包括相机轨迹、深度图和密集地图。实验结果显示，论文的方法能够有效地估计相机姿态和场景结构，并构建细粒度的全局一致的密集环境地图。

## 3.2 AI-IMU

### 3.2.1 摘要总结

论文的主要贡献是提出了一种基于惯性测量单元（IMU）的新颖准确的车辆自定位方法：论文的主要思想是利用卡尔曼滤波器和深度神经网络来动态地调整滤波器的噪声参数。作者在KITTI里程计数据集上进行了实验，证明了该方法仅使用IMU就能准确地估计车辆的三维位置、速度、方向和IMU偏差。其结果在平均平移误差上达到了1.10%，与使用激光雷达或立体视觉的顶级方法相媲美。

### 3.2.2 论文结构

论文使用的方法主要包括以下几个部分：

- 基于IMU的自定位模型，使用一个非线性状态空间模型来描述车辆的运动状态和IMU的偏差，其中状态变量包括位置、速度、方向、陀螺仪偏差和加速度计偏差。
- 卡尔曼滤波器，使用一个扩展卡尔曼滤波器（EKF）来根据IMU的测量值对状态变量进行估计和更新，其中测量方程是一个恒等映射。
- 神经网络，使用一个多层感知机（MLP）来根据IMU的测量值和历史噪声参数来预测当前的噪声参数，包括过程噪声协方差矩阵和测量噪声协方差矩阵。
- 训练策略，使用一个端到端的训练策略来同时优化EKF和MLP的参数，目标函数是最小化EKF的估计误差和MLP的预测误差。

### 3.2.3 实验部分

- 数据集，使用KITTI里程计数据集，该数据集包含了22个序列的车辆运动数据，其中11个序列提供了地面真值1。论文使用了前10个序列作为训练集，后一个序列作为测试集。
- 评估指标，使用平均平移误差（ATE）和平均方向误差（AOE）来评估定位的准确性。ATE是指估计的轨迹与地面真值之间的欧氏距离的平均值。AOE是指估计的方向与地面真值之间的角度差的平均值。
- 实现细节，使用PyTorch框架实现了EKF和MLP的模型。EKF的状态维度是15，测量维度是6。MLP有两个隐藏层，每层有64个神经元，激活函数是ReLU。训练时使用Adam优化器，学习率是0.001，批大小是256，训练轮数是1000。

结果分析，使用不同的方法在测试集上进行了定位，并与其他基于激光雷达或立体视觉的方法进行了比较。结果显示，论文提出的方法在ATE上达到了1.10%的误差，在AOE上达到了0.33°的误差。这些结果优于其他仅使用IMU的方法，并且与使用其他传感器的方法相当或更好。

### 3.2.4 代码部分

仅使用惯性测量单元在 KITTI 里程计数据集上的平移误差位 1.10%

![img](./Voldor.assets/(null)-20230518214845352.(null))

- main_kitti.py

- - 导入必要的模块和库
  - class KITTIParameters 定义KITTI数据集参数和类
  - class KITTIDataset 读取KITTI数据集文件并处理
  - def test_filter 定义测试滤波器
  - def launch(*args*) 程序入口，通过调节read_data的值，来选择是否读数据集。train_filter、test_filter、results_filter
    - train_filter()
    - test_filter()
    - results_filter()

卡尔曼滤波是一种用于估计系统状态的递归滤波器，

# 4 光流与IMU结合

- AI-IMU：对IMU数据进行预处理，得到初始的相机姿态和场景结构的估计，以及IMU偏差的自校准。
- VOLDOR：对密集光流数据进行处理，得到帧间的几何关系和深度图，以及帧对齐的校正。
- 将AI-IMU方法和论文的方法的输出作为位姿图优化模块的输入，利用自适应优先级方案来管理增量位姿图的连接性，并进行全局优化。
- 使用地图重建模块对关键帧的深度图进行融合，得到细粒度的全局一致的密集环境地图。
