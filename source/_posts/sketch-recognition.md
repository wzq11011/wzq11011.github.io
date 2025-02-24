---
title: sketch recognition
date: 2023-06-02 15:25:01
tags:
description: sketch recognition
---

# 1 数据集处理

服务器地址：10.1.16.116

数据集目录：/home/data1/sebas/projects/sketch-recognition/resnet152-test/dataset



* 原图

  * sketch_data/train   原图训练集（250类别，每个类别72张）

  * sketch_data/val   原图测试集（250类别，每个类别8张）

* 外部轮廓

  * sketch_data/train_external   外轮廓训练集（250类别，每个类别72张）

  * sketch_data/val_external   外轮廓测试集（250类别，每个类别8张）

* 内部细节

  * sketch_data/train_internal   内部细节训练集（250类别，每个类别72张）

  * sketch_data/val_internal   内部细节测试集（250类别，每个类别8张）

# 2 网络结构

> 三分支网络，以resnet152为backbone，前两个分支之间做交叉注意力机制学习，然后再和第三个分支进行特征融合。三个分支的输入分别是三个不同的数据集，每个数据集中的图像是1111x1111x1的灰度图（白色背景，黑色线条）。



```python
    optim.Adam(model.parameters(), lr=lr)

    best_acc = 0.0

    train_steps = len(train_loader)

    for epoch in range(epochs):
        model.train()
        train_loss = 0.0
        train_correct_num = 0
        train_bar = tqdm(zip(train_external_loader, train_internal_loader, train_loader), file=sys.stdout)

        for step, (external_data, internal_data, data) in enumerate(train_bar):
            external_images, external_labels = external_data
            internal_images, internal_labels = internal_data
            images, labels = data

            optimizer.zero_grad()

            external_images = external_images.to(device)
            external_labels = external_labels.to(device)
            internal_images = internal_images.to(device)
            internal_labels = internal_labels.to(device)
            images = images.to(device)
            labels = labels.to(device)

            external_outputs, internal_outputs, outputs = model(external_images, internal_images, images)

            _, external_predicted = torch.max(external_outputs, 1)
            train_correct_num += (external_predicted == external_labels).sum().item()

            _, internal_predicted = torch.max(internal_outputs, 1)
            train_correct_num += (internal_predicted == internal_labels).sum().item()

            _, predicted = torch.max(outputs, 1)
            train_correct_num += (predicted == labels).sum().item()

            external_loss = criterion(external_outputs, external_labels)
            internal_loss = criterion(internal_outputs, internal_labels)
            loss = criterion(outputs, labels)

            total_loss = external_loss + internal_loss + loss
            total_loss.backward()
            optimizer.step()

            train_loss += total_loss.item()

```





# 3 实验结果

