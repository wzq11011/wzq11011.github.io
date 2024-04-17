+++
title = 'leetcode'
date = 2023-07-13T15:43:58+08:00
draft = true
+++
# 代码随想录

地址：https://programmercarl.com/

> 以下学习内容来自于 chatgpt、通义千问等大语言模型（LLMs） [菜鸟教程 - 学的不仅是技术，更是梦想！](http://www.runoob.com)

代码随想录：

第一遍完成时间：2024-3-1 ~ 

## 1 c++

### 引用

### 指针

> 定义：在C++中，指针提供了直接访问内存地址的能力，允许对内存进行灵活的操作。

1、定义指针：指针是一个变量，其存储的值是另一个变量的内存地址。可使用以下语法定义指针：

```C++
int* ptr; // 定义一个指向整数的指针
```

此处的 `*` 表示指针，`int*` 表示指向整数的指针。

2、获取地址：可以使用取地址运算符 `&` 来获取变量的内存地址，并将其赋值给指针：

```C++
int var = 10;
int* ptr = &var; // ptr 指向变量 var 的地址
```

3、解引用：可以使用解引用运算符 `*` 来访问指针所指向的内存地址存储的值：

```C++
int var = 10;
int* ptr = &var;
int value = *ptr; // value 的值为10，即 ptr 所指向的内存地址处的值
```

4、空指针：指针可以指向空地址，表示不指向任何有效的内存位置，可以使用特殊的空指针常量 `nullptr` 来表示空指针

```C++
int* ptr = nullptr; // 定义一个空指针
```

5、动态内存分配：可以使用 `new` 运算符来在堆上动态分配内存，返回分配内存的地址，并将其赋值给指针。需要记得不再使用内存时，使用 `delete` 运算符释放内存，防止内存泄露。

```C++
int* ptr = new int; // 在堆上动态分配一个整数的内存，并将其地址赋值给指针
*ptr = 10; // 向分配的内存中存储值
delete ptr; // 释放分配的内存
```

6、数组指针：指针也可以指向数组的首地址，这样就可以通过指针来访问数组的元素

```C++
int arr[5] = {1, 2, 3, 4, 5};
int* ptr = arr; // 将数组的首地址赋值给指针
```

指针数组：让数组存储指向 int 或 char 或其他数据类型的指针

```C++
#include <iostream>

using namespace std;
const int MAX = 4;

int main() {
    const char *names[MAX] = {"Zara Ali", "Hina Ali", "Nuha Ali", "Sara Ali"};
    for (int i = 0; i < MAX; i++ ) {
        cout << "Value of names[" << i << "] = ";
        cout << names[i] << endl;
    }
    return 0;
}

// 输出结果如下：
Value of names[0] = Zara Ali
Value of names[1] = Hina Ali
Value of names[2] = Nuha Ali
Value of names[3] = Sara Ali
```

`names`是一个数组，数组中每个元素都是一个指向 `const char` 类型的指针。在将字符串常量作为初始值赋值给 `names` 数组时，实际上是将这些字符串常量的首地址赋给了 `names数组中的指针元素。所以在循环中打印 names[i]` 时会输出字符串内容而不是地址。

7、指针的算术运算：加法、减法等，但要注意指针的类型

```C++
int arr[5] = {1, 2, 3, 4, 5};
int* ptr = arr;
ptr++; // 指向数组的下一个元素
```

我们喜欢在程序中使用指针代替数组，因为变量指针可以递增，而数组不能递增，因为数组是一个常量指针。下面的程序递增变量指针，一遍顺序访问数组中的每一个元素：

```C++
#include <iostream>

using namespace std;
const int MAX = 3;

int main() {
    int var[MAX] = {10, 100, 200};
    int *ptr;
    
    // 指针中的数组地址
    ptr = var;
    for (int i = 0; i < MAX; i++) {
        cout << "Adress of var[" << i << "] = ";
        cout << ptr << endl;
        
        cout << "Value of var[" << i << "] = ";
        cout << *ptr << endl;
        
        // 将指针移动到下一个位置
        ptr++;
    }
    return 0;
}
```

以上代码的输出结果为：

```Shell
Address of var[0] = 0xbfa088b0
Value of var[0] = 10
Address of var[1] = 0xbfa088b4
Value of var[1] = 100
Address of var[2] = 0xbfa088b8
Value of var[2] = 200
```

指针的比较：指针可以用关系运算符进行比较，如 ==、< 和 > 。如果 p1 和 p2 指向两个相关的变量，例如同一个数组中的不同元素，则可以对 p1 和 p2 进行比较。

以上程序的另一种写法：只要变量指针所指向的地址小于等于数组最后一个元素的地址 `&var[MAX-1]` ，就把变量指针进行递增：

```C++
#include <iostream>

using namespace std;
const int MAX = 3;

int main() {
    int var[MAX] = {10, 100, 200};
    int *ptr;
    
    ptr = var; // 将数组中第一个元素的地址赋给指针
    int i = 0;
    while (ptr <= &var[MAX - 1]) {
        cout << "Adress of var[" << i << "] = ";
        cout << ptr << endl;
        
        cout << "Value of var[" << i << "] = ";
        cout << *ptr << endl;
        
        // 将指针移动到下一个位置
        ptr++;
        i++
    }
    return 0;
}
```

8、指针和函数：指针可以作为函数的参数，用于传递地址，实现对函数外部变量的修改。也可以作为函数的返回值，返回指向堆上分配内存的地址。

C++ 允许您传递指针给函数，只需要简单地声明函数参数为指针类型即可。

下面的实例中，我们传递一个无符号（C++中用于描述整数类型的关键字，表示该类型的取值范围为非负整数，包括0，不包括负整数）的 long 型指针给函数，并在函数内改变这个值：

```C++
#include <iostream>
#include <ctime>

using namespace std;

// 写函数时应习惯性的先声明函数，再定义函数
void getSeconds (unsigned long *par)

int main() {
    unsigned long sec;
    
    getSeconds (&sec);
    
    // 输出实际值
    cout << "Number of seconds: " << sec << endl;
    
    return 0;
}

void getSeconds (unsigned long *ptr) {
    // 获取当前秒数
    *ptr = time(NULL);
    return;
}
```

9、指向指针的指针：指向指针的指针是一种多级间接寻址形式，或者说是一个指针链。指针的指针就是将一个指针的地址存放到另一个指针里面。

通常，一个指针包含一个变量的地址。当我们定义一个指向指针的指针时，第一个指针包含了第二个指针的地址，第二个指针指向包含实际值的位置。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null))

一个指向指针的指针变量必须进行如下声明， 即在变量名前放置两个星号。例如，下面声明了一个指向 `int` 类型指针的指针：

```C++
int **var;    
```

当一个目标值被一个指针间接指向另一个指针时，访问这个值需要使用两个星号运算符，如下所示：

```C++
#include <iostream>

using namespace std;

int main() {
    int var;
    int *ptr;
    int **pptr;
    
    var = 3000;
    
    // 获取 var 的地址
    ptr = &var;
    
    // 使用运算符 & 获取 ptr 的地址
    pptr = &ptr;
    
    // 使用 pptr 获取值
    cout << "the value of var: " << var << endl;
    cout << "the value of *ptr: " << *ptr << endl;
    cout << "the value of **pptr: " << **pptr << endl;
    return 0;
}
```

总结：指针是C++中一个非常重要和强大的特性，它可以用于动态内存管理、数组访问、函数调用等方面，但需要谨慎使用，避免出现内存泄露和悬挂指针等问题。

### 模板

> 定义：c++中的模板（Template）是一种通用编程技术，它允许程序员编写通用的代码，使其可以适用于不同的数据类型。模板可以用于函数、类、结构体等，通过模板可以实现泛型编程。

以下是c++模板中的几种常见用法：

1、函数模板：允许定义通用的函数，可以用于处理不同类型的数据，定义函数模板的语法如下：

```C++
// 函数模板声明
template <typename T>
T add (T a, T b) {
    return a+b;
}
```

这个函数模板 `add` 可以对两个相同类型的数据进行加法运算，无论该类型是整数、浮点数、字符串还是其他类型。 

2、类模板：类模板允许定义通用的类，可用于创建不同类型的对象，定义语法如下：

```C++
template <typename T>
class Pair {
private:
    T first
}
```

### 泛型

> 在编写代码时，经常会遇到相同的逻辑需要用于不同的数据类型，此时没有必要为每种数据类型编写单独的代码。泛型就是为了解决这个问题而提出的一种编程范式。
>
> c++中，泛型编程通过模板（Template）实现，模板允许程序员编写通用的代码，使得它可以适用于不同的数据类型。

举例：假设我们有一个函数用于交换两个整数的值：

```C++
void swapIntegers(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}
```

如果我们需要交换两个浮点数或字符串，就需要重新编写一个交换函数，这样就会导致代码冗余和维护困难。

而使用泛型，可以定义一个通用的交换函数模板，如下：

```C++
template <typename T>
void swapIntegers(T& a, T& b) {
    T temp = a;
    a = b;
    b = a;
}
```

该模板中，typename T 表示我们将使用一个泛型类型 T，这个模板函数可以接受任意类型的参数 a 和 b，并交换它们的值。调用该函数时，编译器会根据传入参数的类型实例化模板，生成对应的函数版本。

### STL

STL（Standard Template Lubrary）是 C++ 标准库中的一个重要组成部分，提供了丰富的容器、算法和函数对象等工具，使得 C++ 变成更加高效和便捷。

#### 容器

`vector` 是一种动态数组，提供了快速的随机访问和动态调整大小的能力

```C++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 创建一个向量存储 int 类型数据
    vector<int> vec;
    int i;
    
    // 显示 vec 的原始大小
    cout << "vector size = " << vec.size() << endl;
    
    // 推入 5 个值到向量中
    for (int i = 0; i < 5; i++) {
        vec.push_back(i);
    }
    
    // 使用迭代器 iterator 范文值
    vector<int>::iterator v = vec.begin();
    while (v != vec.end()) {
        cout << "value of v = " << *v << endl;
        v++;
    }
    return 0;
}
```

- push_back() 成员函数在向量的末尾插入值，如果有必要则拓展向量的大小
- size() 函数显示向量的大小
- begin() 函数返回一个指向向量开头的迭代器
- end() 函数返回一个指向向量末尾的迭代器
- empty() 函数检查向量是否为空
- front() 函数获取向量的第一个元素
- back() 函数获取向量的最后一个元素
- data() 函数返回指向向量数据的指针
- at() 函数获取对应位置的元素

#### 算法

#### 迭代器

## 2 Leetcode

### 2.1 数组

#### 27.移除元素

[力扣题目链接(opens new window)](https://leetcode.cn/problems/remove-element/)

给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并原地修改输入数组。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

示例 1: 给定 nums = [3,2,2,3], val = 3, 函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。 你不需要考虑数组中超出新长度后面的元素。

示例 2: 给定 nums = [0,1,2,2,3,0,4,2], val = 2, 函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。

你不需要考虑数组中超出新长度后面的元素。

思路：数组的元素在内存地址中是连续的，不能单独删除数组中的某个元素，只能覆盖。

##### 方法一：暴力求解

两层`for` 循环，一个循环遍历数组元素，第二个循环更新数组

```C++
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int size =  nums.size();
        for (int i = 0; i < size; i++) {
            if (nums[i] == val) {
                for (int j = i + 1; j < size; j++) {
                    nums[j - 1] = nums[j];
                }
                // 因为每次进 for 都要对 i 加 1，前面删除了一个元素，
                // 此处 i-1 要保持下一次进入循环后还是原来的 i。
                i--;  
                size--;
            }
        }
        return size;
    }
};
```

时间复杂度：`O(n^2)`

空间复杂度：`O(1)`

##### 方法二：双指针法（快慢指针）

通过一个快指针和慢指针在一个 `for` 循环中完成两个 `for` 循环的工作

定义快慢指针

- 快指针：寻找新数组的元素，新数组就是不含目标元素的数组
- 慢指针：指向更新后的新数组下标的位置

删除过程：

暂时无法在飞书文档外展示此内容

双指针法（快慢指针法）在数组、链表、字符串等操作中很常见

```C++
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int slowIndex = 0;
        for (int fastIndex = 0; fastIndex < nums.size(); fastIndex++) {
            if (val != nums[fastIndex]) {
                // 未找到目标值元素时，两个指针都往后走一步
                // 找目标值元素时，慢指针不动，快指针继续往下走
                nums[slowIndex++] = nums[fastIndex];
            }
        }
        return slowIndex;
    }
};
```

时间复杂度：`O(n)`

空间复杂度：`O(1)`

相关题目推荐：

- [26.删除排序数组中的重复项(opens new window)](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)
- [283.移动零(opens new window)](https://leetcode.cn/problems/move-zeroes/)
- [844.比较含退格的字符串(opens new window)](https://leetcode.cn/problems/backspace-string-compare/)
- [977.有序数组的平方(opens new window)](https://leetcode.cn/problems/squares-of-a-sorted-array/)

Java 版本

```Java
class Solution {
    public int removeElement(int[] nums, int val) {
        // 快慢指针
        int slowIndex = 0;
        for (int fastIndex = 0; fastIndex < nums.length; fastIndex++) {
            if (nums[fastIndex] != val) {
                nums[slowIndex] = nums[fastIndex];
                slowIndex++;
            }
        }
        return slowIndex;
    }
}
```

#### 997.有序数组的平方

[力扣题目链接](https://leetcode.cn/problems/squares-of-a-sorted-array/)

[代码随想录](https://www.programmercarl.com/0977.有序数组的平方.html#思路)

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1：

- 输入：nums = [-4,-1,0,3,10]
- 输出：[0,1,9,16,100]
- 解释：平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]

示例 2：

- 输入：nums = [-7,-3,2,3,11]
- 输出：[4,9,9,49,121]

##### 方法一：暴力求解

每个数平方之后，再排序

```C++
class Solution {
public:
    vector<int> sortedSquares(vector<int>& A) {
        for(int i = 0; i < A.size(); i++) {
            A[i] *= A[i];  // 遍历每个数，然后平方
        }
        sort(A.begin(), A.end()); // 快速排序
        return A;
    }
};
```

该方法的时间复杂度为 O(n + nlogn)，可以近似为 O(nlogn) 的时间复杂度。

##### 方法二：双指针法

双指针法通常用于处理数组或链表等数据结构，这种技巧通常使用两个指针来解决问题，分别称为快指针和慢指针，它们分别在数据结构上以不同的速度移动，以达到解决问题的目的。

双指针法通常用于解决以下问题：

1、数组、链表中的搜索或遍历

2、数组、链表中的查找和匹配

3、数组、链表中的区间问题

双指针法分为两种类型：快慢指针、左右指针

本题使用左右指针，比较左右两侧数值的大小，取较大值存入新数组的最右边（以形成从小到大的排列规律）

暂时无法在飞书文档外展示此内容

```C++
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int k = nums.size() - 1;
        vector<int> result(nums.size(), 0);
        // for (int i = 0; int j = nums.size() - 1; i <= j) { 没有加分号
        for (int i = 0, j = nums.size() - 1; i <= j;) {
            if (nums[i] * nums[i] < nums[j] * nums[j]) {
                result[k--] = nums[j] * nums[j];
                j--;
            }
            else {
                result[k--] = nums[i] * nums[i];
                i++;
            }
        }
        return result;
    }
};
```

时间复杂度：`O(n)`

Java 版本代码

```Java
class Solution {
    public int[] sortedSquares(int[] nums) {
        int right = nums.length - 1;
        int left = 0;
        int[] result = new int[nums.length];
        int index = result.length - 1;
        while (left <= right) {
            if (nums[left] * nums[left] < nums[right] * nums[right]) {
                result[index--] = nums[right] * nums[right];
                right--;
            } else {
                result[index--] = nums[left] * nums[left];
                left++;
            }
        }
        return result;
    }
}
```

#### 209.长度最小的子数组

[力扣题目链接](https://leetcode.cn/problems/minimum-size-subarray-sum/)

给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

示例：

- 输入：s = 7, nums = [2,3,1,2,4,3]
- 输出：2
- 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

提示：

- 1 <= target <= 10^9
- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^5

##### 方法一：暴力解法

两个 `for` 循环不断地寻找符合条件的子序列，时间复杂度为 `O(n^2)` 。

```C++
class Solution {
public:
    int minSubArrayLen(int s, vector<int>& nums) {
        int result = INT32_MAX; // 储存最终的结果（最小子序列长度）
        int sum = 0; // 子序列之和
        int subLength = 0; // 子序列长度
        for(int i = 0; i < nums.size(); i++) {
            sum = 0;
            for(int j = i; j < nums.size(); j++) {
                sum += nums[j]; // 求和
                if(sum >= s) {
                    subLength = j - i + 1; // 计算子序列的长度
                    result = result < subLength ? result : subLength;
                    break; // 找到符合条件最短子序列，结束循环
                }
            }
        }
        // 如果result没有被赋值的话，就返回0，说明没有符合条件的子序列
        return result == INT32_MAX ? 0 : result;
    }
}
```

时间复杂度：`O(n^2)`

空间复杂度：`O(1)`

##### 方法二：滑动窗口

通过不断调整子序列的起始位置和终止位置，得到想要的结果

这里还是以题目中的示例来举例，s=7， 数组是 2，3，1，2，4，3，来看一下查找的过程：

暂时无法在飞书文档外展示此内容

```C++
class Solution {
public:
    int minSubArrayLen (int s, vector<int>& nums) {
        int result = INT32_MAX;  // 保存最终的结果
        int sum = 0;  // 滑动窗口数值之和
        int i = 0;   // 滑动窗口的起始位置
        int subLength = 0;  // 滑动窗口的长度
        for (int j = 0; j < nums.size(); j++) {
            sum += nums[j];  // 计算第一个元素到最后一个元素 j 的序列之和
            // 如果该序列和大于s，则缩减
            while (sum >= s) {
                subLength = j - i + 1;  // 计算子序列长度
                result = result < subLength ? result : subLength;  // 将长度存入 result
                sum -= nums[i--];  // 缩减长度，同时动态调整子序列的初始位置
            }
        }
        return result == INT32_MAX ? 0 : result;
    }
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)

一些录友会疑惑为什么时间复杂度是O(n)。

不要以为for里放一个while就以为是O(n^2)啊， 主要是看每一个元素被操作的次数，每个元素在滑动窗后进来操作一次，出去操作一次，每个元素都是被操作两次，所以时间复杂度是 2 × n 也就是O(n)。

##### 相关题目推荐

- [904.水果成篮(opens new window)](https://leetcode.cn/problems/fruit-into-baskets/)

- [76.最小覆盖子串(opens new window)](https://leetcode.cn/problems/minimum-window-substring/)

Java 语言版本

```Java
class Solution {
    // 滑动窗口
    public int minSubArrayLen (int s, int[] nums) {
        int left = 0;
        int sum = 0;
        int result = Integer.MAX_VALUE;
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum >= s) {
                result = Math.min(result, right - left + 1);
                sum -= nums[left++];
            }
        }
        return result == Integer.MAX_VALUE ? 0 : result;
    }
}
```

#### 59.螺旋矩阵II

[力扣题目链接(opens new window)](https://leetcode.cn/problems/spiral-matrix-ii/)

给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

示例:

输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]

面试频率较高，模拟过程，十分考察对代码的掌控能力。

模拟顺时针画矩阵的过程:

- 填充上行从左到右
- 填充右列从上到下
- 填充下行从右到左
- 填充左列从下到上

由外向内一圈一圈这么画下去。

可以发现这里的边界条件非常多，在一个循环中，如此多的边界条件，如果不按照固定规则来遍历，那就是一进循环深似海，从此offer是路人。

这里一圈下来，我们要画每四条边，这四条边怎么画，每画一条边都要坚持一致的左闭右开，或者左开右闭的原则，这样这一圈才能按照统一的规则画下来。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332484.(null))

这里每一种颜色，代表一条边，我们遍历的长度，可以看出每一个拐角处的处理规则，拐角处让给新的一条边来继续画。这也是坚持了每条边左闭右开的原则。

```C++
class Solution {
public:
    vector<vector<int>> generateMatrix (int n) {
        // 使用 vector 定义一个二维数组
        vector<vector<int>> res(n, vector<int>(n, 0));
        int startx = 0, starty = 0;  // 定义每循环一个圈的起始位置
        // 每个圈循环几次，例如n为奇数3，则loop=1，只循环一圈，矩阵中间的值需要单独处理
        int loop = n/2;  
        int mid = n/2;  // 矩阵中间的位置，例如n为3，则中间位置为（1,1），n为5，中间位置为（2,2）
        int count = 1;  // 用来给矩阵中每一个空格赋值
        int offset = 1;  // 需要控制每一条边遍历的长度，每次循环右边界收缩一位
        int i,j;
        
        while (loop--) {
            i = startx;
            j = starty;
            
            // 以下的四个for循环模拟转圈的过程
            // 模拟填充最上面一行，从左到右（左闭右开）
            for (j = starty; j < n - offset; j++) {
                res[startx][j] = count++;
            }
            
            // 模拟填充最右边一列，从上到下（左闭右开）
            for (i = startx; i < n - offset; i++) {
                res[i][j] = count++;
            }
            
            // 模拟填充最下面一行，从右到左（左闭右开）
            for (; j > starty; j--) {
                res[i][j] = count++;
            }
            
            // 模拟填充最左边一列，从下到上（左闭右开）
            for (; i > startx; i--) {
                res[i][j] = count++
            }
            
            // 第二圈开始的时候，起始位置要+1
            // 例如：第一圈起始位置为（0,0），第二圈起始位置为（1,1）
            startx++;
            starty++;
            
            // offset 控制每一圈每一条边遍历的长度
            offset++;
        }
        
        // 如果 n 为奇数的话，需要单独给矩阵最中间的位置赋值
        if (n % 2) {
            res[mid][mid] = count;
        }
        return res;
    }
};
```

时间复杂度：`O(n^2)`

空间复杂度：`O(1)`

类题：

- [54.螺旋矩阵(opens new window)](https://leetcode.cn/problems/spiral-matrix/)
- [剑指Offer 29.顺时针打印矩阵(opens new window)](https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332586.(null))

### 2.2 链表

#### 概念

链表是一种通过指针串联在一起的线性结构，每个节点由两部分组成，一个数据域（存放数据）一个指针域（存放指向下一个节点的指针），最后一个节点的指针域指向 null （空指针）。

链表的入口节点（头结点）为 head。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332494.(null))

双链表：每个节点有两个指针域，一个指向下一节点，一个指向上一节点。双链表既可向前查询又可向后查询。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332459.(null))

循环链表：首尾相连的链表，可以用来解决约瑟夫环问题。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332452.(null))

链表的存储方式：数组在内存中是连续分布的，链表在内存中可以不是连续分布的。链表通过指针域的指针链接在内存中各个节点，各个节点散乱分布在内存的某个地址上，分配机制取决于操作系统的内存管理。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332545.(null))

该链表起始节点为2，终止节点为7，各个节点分布在内存的不同地址空间上，通过指针串联在一起。

#### 链表节点定义

```C++
// 单链表
struct ListNode {
  int val; // 节点上存储的元素
  ListNode *next;  // 指向下一节点的指针
  ListNode(int x) : val(x), next(NULL) {}  // 节点的构造函数  
};
```

如果在链表节点的定义中不定义构造函数，C++会默认生成一个构造函数，但该构造函数不会初始化任何成员变量，例如：

- 通过自己定义的构造函数初始化节点：

```C++
ListNode* head = new ListNode(5);
```

- 使用默认构造函数初始化节点（注意：初始化时不能直接给变量赋值）：

```C++
ListNode* head = new ListNode();
head->val = 5;
```

#### 链表操作

##### 删除节点

要删除 D 节点，只需要将 C 节点的 next 指针指向 E 节点就可以了。然后再手动的释放 D 节点 （释放内存），其他语言如 Java、Python 有自己的内存回收机制，不用手动释放内存。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332622.(null))

##### 添加节点

添加节点类似，只需要改动指针指向即可。链表的增添和删除都是 `O(1)` 操作，不会影响其他节点。

但需注意：如果要删除最后一个节点，需要从头结点查找到倒数第二个节点，然后通过 next 指针进行删除操作，查找的时间复杂度是 `O(n)`。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332608.(null))

##### 性能分析

数组在定义的时候，长度就是固定的，如果想改动数组的长度，就需要重新定义一个新的数组。

链表的长度可以是不固定的，并且可以动态增删， 适合数据量不固定，频繁增删，较少查询的场景。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332687.(null))

#### 203.移除链表元素

[力扣题目链接(opens new window)](https://leetcode.cn/problems/remove-linked-list-elements/)

题意：删除链表中等于给定值 val 的所有节点。

示例 1： 输入：head = [1,2,6,3,4,5,6], val = 6 输出：[1,2,3,4,5]

示例 2： 输入：head = [], val = 1 输出：[]

示例 3： 输入：head = [7,7,7,7], val = 7 输出：[]

对于单链表，如果删除头结点如何处理？

两种操作方式：

- 直接使用原来的链表进行删除操作

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332855.(null))

```C++
class Solution {
public:
    ListNode* removeElements (ListNode* head, int val) {
        // 当链表存在且头结点的值是目标值时，删除头结点
        while (head != NULL && head->val == val) {
            ListNode* tmp = head;
            head = head->next;
            delete tmp;
        }
        
        // 删除非头结点
        ListNode* cur = head;
        while (cur != NULL && cur->next != NULL) {
            if (cur->next->val == val) {
                ListNode* tmp = cur->next;
                cur->next = tmp->next;  // cur->next->next
                delete tmp;
            } else {
                cur = cur->next;
            }
        }
        return head;
    }
};
```

时间复杂度：`O(n)`  

空间复杂度：`O(1)`

- 设置一个虚拟头结点进行删除操作

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332784.(null))

```C++
class Solution {
public:
    ListNode* removeElements (ListNode* head, int val) {
        ListNode* dummyHead = new ListNode(0);  // 设置一个虚拟头结点
        dummyHead->next = head;  // 将虚拟头结点指向head，方便后面的删除操作
        ListNode* cur = dummyHead;
        while (cur->next != NULL) {
            if (cur->next->val == val) {
                ListNode* tmp = cur->next;
                cur->next = tmp->next;
                delete tmp;
            } else {
                cur = cur->next;
            }
        }
        head = dummyHead->next;
        delete dummyHead;
        return head;
    }
};
```

时间复杂度：`O(n)`  

空间复杂度：`O(1)`

#### 707 设计链表

[力扣题目链接(opens new window)](https://leetcode.cn/problems/design-linked-list/)

题意：

在链表类中实现这些功能：

- get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
- addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
- addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
- addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
- deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332842.(null))

- 使用虚拟头结点，代码实现更方便。虚拟头结点通常用于简化链表操作，使得头结点和其他节点的操作一致化。

```C++
class MyLinkedList {
public:
    // 定义链表节点结构体
    struct LinkedNode {
        int val;
        LinkedNode* next;
        // 该构造函数的简写是 C++ 中的一种特性，称为成员初始化列表。
        // 在构造函数的参数列表后面使用冒号，按照成员变量的顺序列出每个成员变量，
        // 后面跟着该成员变量的初始化值。
        LinkedNode(int val):val(val), next(nullptr){}  // 构造函数
    };
    
    // 初始化链表。无参构造函数，用于初始化 'MyLinkedList' 类的对象
    MyLinkedList() {
        _dummyHead = new LinkedNode(0);
        _size = 0;
    }
    
    // 获取第 index 个节点数值，如果 index 是非法数值直接返回 -1
    int get (int index) {
        if (index > _size - 1 || index < 0) {
            return -1;
        }
        LinkedNode* cur = _dummyHead->next;
        // 只有当判断为 0 时才会跳出 while 循环，非零情况会一直循环下去
        while (index--) {  // --index 会陷入死循环，一开始就输入 0
            cur = cur->next;
        }
        return cur->val;
    }
    
    // 在链表最前面插入一个节点，插入完成后，新插入的结点为链表的新头结点
    void addAtHead (int val) {
        LinkedNode* newNode = new LinkedNode(val);
        newNode->next = _dummyHead->next;
        _dummyHead->next = newNode;
        _size++;
    }
    
    // 在链表最后添加一个节点
    void addAtTail (int val) {
        LinkedNode* newNode = new LinkedNode(val);
        LinkedNode* cur = _dummyHead;
        while (cur->next != nullptr) {
            cur = cur->next;
        }
        cur->next = newNode;
        _size++;
    }
    
    // 在第index个节点之前插入一个新节点，例如index为0，那么新插入的节点为链表的新头节点。
    // 如果index 等于链表的长度，则说明是新插入的节点为链表的尾结点
    // 如果index大于链表的长度，则返回空
    // 如果index小于0，则在头部插入节点
    void addAtIndex (int index, int val) {
        if (index > _size) return;
        
        // index 小于等于零时，添加新的头结点
        if (index < 0) index = 0;
        LinkedNode* newNode = new LinkedNode(val);
        LinkedNode* cur = _dummyHead;
        while (index--) {
            cur = cur->next;
        }
        newNode->next = cur->next;
        cur->next = newNode;
        _size++;
    }
    
    void deleteAtIndex (int index) {
        if (index >= _size || index < 0) {
            return;
        }
        LinkedNode* cur = _dummyHead;
        while (index--) {
            cur = cur->next;
        }
        LinkedNode* tmp = cur->next;
        cur->next = tmp->next;
        delete tmp;
        tmp = nullptr;
        _size--;
    }
    
    void printLinkedList () {
        LinkedNode cur = _dummyHead;
        while (cur->next != nullptr) {
            cout << cur->next->val << " ";
            cur = cur->next;
        }
        cout << endl;
    }
    
private:
    int _size;
    LinkedNode* _dummyHead;
};
```

时间复杂度：

空间复杂度：`O(n)`

#### 206 翻转链表

[力扣题目链接(opens new window)](https://leetcode.cn/problems/reverse-linked-list/)

题意：反转一个单链表。

示例: 输入: 1->2->3->4->5->NULL 输出: 5->4->3->2->1->NULL

思路：

直接改变链表 next 指针的指向，可以将链表直接反转，而不用定义一个新的链表。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332807.(null))

暂时无法在飞书文档外展示此内容

##### 双指针法

```C++
class Solution {
public:
    ListNode* reverseList (ListNode* head) {
        ListNode* tmp;
        ListNode* cur = head;
        ListNode* pre = NULL:
        while (cur) {
            tmp = cur->next;  // 保存 cur 的下一个节点
            cur->next = pre;  // 反转链表节点指向
            pre = cur;
            cur = tmp;
        }
        return pre;
    }
};
```

##### 递归法

与双指针法类似的逻辑，当 cur 为空的时候循环结束，不断地将 cur 指向 pre 的过程。

```C++
class Solution {
public:
    ListNode* reverse (ListNode* pre, ListNode* cur) {
        if (cur == NULL) return pre;
        ListNode* tmp = cur->next;
        cur->next = pre;
        return reverse(cur, tmp);
    }

    ListNode* reverseList (ListNode* head) {
        // 与双指针法的初始化逻辑一直
        // ListNode* cur = head;
        // ListNode* pre = NULL;
        return (NULL, head);
    }
};
```

时间复杂度：`O(n)` ，需要递归处理链表的每个节点

空间复杂度：`O(n)` ，递归调用了 n 层栈空间

（未理解）另外一种递归写法：从后往前反转指针指向

```C++
class Solution {
public:
    ListNode* reverseList (ListNode* head) {
        // 边缘条件判断
        if (head == NULL) return NULL;
        if (head->next = NULL) return head;
        
        ListNode* last = reverseList(head->next);
        
        head->next->next = head;
        
        head->next = NULL;
        return last;
    }
};
```

时间复杂度：`O(n)`

空间复杂度：`O(n)`

#### 24 两两交换链表中的节点

[力扣题目链接(opens new window)](https://leetcode.cn/problems/swap-nodes-in-pairs/)

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332942.(null))

思路：

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332927.(null))

```C++
class Solution {
public:
    /**
     * @param head ListNode类
     * @return ListNode类
    */
    ListNode* reverseList (ListNode* head) {
        ListNode* dummyHead = new ListNode(0);  // 设置一个虚拟头结点
        dummyHead->next = head;
        ListNode* cur = dummyHead;

        // 例子： dummyHead(cur) -> 1(tmp) -> 2 -> 3(tmp1) -> 4 -> null
        // dummyHead(cur) -> 2 -> 1 -> 3 -> 4 -> null
        while (cur->next != nullptr && cur->next->next != nullptr) {
            ListNode* tmp = cur->next;
            ListNode* tmp1 = tmp->next->next->next;

            cur->next = tmp->next;
            cur->next->next = tmp;
            tmp->next = tmp1;
            
            cur = cur->next->next;  // cur移动两位，准备下一轮的交换
        }
        return dummyHead->next;
    }
};
```

时间复杂度：`O(n)`

空间复杂度：`O(1)`

#### 19 删除链表的倒数第 N 个节点

[力扣题目链接(opens new window)](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

进阶：你能尝试使用一趟扫描实现吗？

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333265.(null))

思路：

##### 方法一：暴力遍历

两次遍历，第一遍历得到链表长度 L；第二次遍历找到第 L-n+1 个节点，然后删除。

```C++
class Solution {
public:
    ListNode* removeNthFromEnd (ListNode* head, int n) {
        
    }
};
```

##### 方法二：双指针法

#### 链表相交

#### 环形链表

### 2.3 哈希表

#### 定义

哈希表（散列表）是根据关键码的值（key）而直接进行访问的数据结构，提高查找速度。哈希表中的关键码就类似于数组中的下标，因而我们可以通过关键码直接访问数据，如下：

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193332999.(null))

**一般哈希表都是用来快速判断一个元素是否出现集合里。**

#### 哈希函数

哈希函数如下图所示，通过hashCode把名字转化为数值，一般hashcode是通过特定编码方式，可以将其他数据格式转化为不同的数值，这样就把学生名字映射为哈希表上的索引数字了。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333089.(null))

如果 hashCode 得到的数值大于哈希表的大小了，也就是大于tableSize了，怎么办呢？

此时为了保证映射出来的索引数值都落在哈希表上，我们会在再次对数值做一个取模的操作，这样我们就保证了学生姓名一定可以映射到哈希表上了。

此时问题又来了，哈希表我们刚刚说过，就是一个数组。

如果学生的数量大于哈希表的大小怎么办，此时就算哈希函数计算的再均匀，也避免不了会有几位学生的名字同时映射到哈希表 同一个索引下标的位置。

#### 哈希碰撞

如图所示，小李和小王都映射到了索引下标 1 的位置，这一现象叫做**哈希碰撞**。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333142.(null))

一般哈希碰撞有两种解决方法， 拉链法和线性探测法。

##### **拉链法**

刚刚小李和小王在索引1的位置发生了冲突，发生冲突的元素都被存储在链表中。 这样我们就可以通过索引找到小李和小王了。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333183.(null))

（数据规模是dataSize， 哈希表的大小为tableSize）

其实拉链法就是要选择适当的哈希表的大小，这样既不会因为数组空值而浪费大量内存，也不会因为链表太长而在查找上浪费太多时间。

##### **线性探测法**

使用线性探测法，一定要保证tableSize大于dataSize。 我们需要依靠哈希表中的空位来解决碰撞问题。

例如冲突的位置，放了小李，那么就向下找一个空位放置小王的信息。所以要求tableSize一定要大于dataSize ，要不然哈希表上就没有空置的位置来存放冲突的数据了。如图所示：

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333218.(null))

#### 常见的三种哈希结构

当我们想使用哈希法来解决问题的时候，一般会选择三种数据结构：数组、集合（set）、映射（map）

在C++中，set 和 map 分别提供以下三种数据结构，其底层实现以及优劣如下表所示：

| 集合               | 底层实现 | 是否有序 | 数值是否可以重复 | 能否更改数值 | 查询效率 | 增删效率 |
| ------------------ | -------- | -------- | ---------------- | ------------ | -------- | -------- |
| std::set           | 红黑树   | 有序     | 否               | 否           | O(log n) | O(log n) |
| std::multiset      | 红黑树   | 有序     | 是               | 否           | O(logn)  | O(logn)  |
| std::unordered_set | 哈希表   | 无序     | 否               | 否           | O(1)     | O(1)     |

std::unordered_set底层实现为哈希表，std::set 和std::multiset 的底层实现是红黑树，红黑树是一种平衡二叉搜索树，所以key值是有序的，但key不可以修改，改动key值会导致整棵树的错乱，所以只能删除和增加。

| 映射               | 底层实现 | 是否有序 | 数值是否可以重复 | 能否更改数值 | 查询效率 | 增删效率 |
| ------------------ | -------- | -------- | ---------------- | ------------ | -------- | -------- |
| std::map           | 红黑树   | key有序  | key不可重复      | key不可修改  | O(logn)  | O(logn)  |
| std::multimap      | 红黑树   | key有序  | key可重复        | key不可修改  | O(log n) | O(log n) |
| std::unordered_map | 哈希表   | key无序  | key不可重复      | key不可修改  | O(1)     | O(1)     |

std::unordered_map 底层实现为哈希表，std::map 和std::multimap 的底层实现是红黑树。同理，std::map 和std::multimap 的key也是有序的（这个问题也经常作为面试题，考察对语言容器底层的理解）。

当我们要使用集合来解决哈希问题的时候，优先使用unordered_set，因为它的查询和增删效率是最优的，如果需要集合是有序的，那么就用set，如果要求不仅有序还要有重复数据的话，那么就用multiset。

那么再来看一下map ，在map 是一个key value 的数据结构，map中，对key是有限制，对value没有限制的，因为key的存储方式使用红黑树实现的。

其他语言例如：java里的HashMap ，TreeMap 都是一样的原理。可以灵活贯通。

虽然std::set、std::multiset 的底层实现是红黑树，不是哈希表，std::set、std::multiset 使用红黑树来索引和存储，不过给我们的使用方式，还是哈希法的使用方式，即key和value。所以使用这些数据结构来解决映射问题的方法，我们依然称之为哈希法。 map也是一样的道理。

这里在说一下，一些C++的经典书籍上 例如STL源码剖析，说到了hash_set hash_map，这个与unordered_set，unordered_map又有什么关系呢？

实际上功能都是一样一样的， 但是unordered_set在C++11的时候被引入标准库了，而hash_set并没有，所以建议还是使用unordered_set比较好，这就好比一个是官方认证的，hash_set，hash_map 是C++11标准之前民间高手自发造的轮子。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333279.(null))

总结：

当我们遇到了要快速判断一个元素是否出现集合里的时候，就要考虑哈希法。

但是哈希法也是牺牲了空间换取了时间，因为我们要使用额外的数组，set或者是map来存放数据，才能实现快速的查找。

如果在做面试题目的时候遇到需要判断一个元素是否出现过的场景也应该第一时间想到哈希法！

#### 242 有效的字母异位词

[力扣题目链接(opens new window)](https://leetcode.cn/problems/valid-anagram/)

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

示例 1: 输入: s = "anagram", t = "nagaram" 输出: true

示例 2: 输入: s = "rat", t = "car" 输出: false

说明: 你可以假设字符串只包含小写字母。

##### 方法一：暴力求解

两层 for 循环，同时要记录字符是否重复出现，时间复杂度 `O(n^2)`

##### 方法二：排序

t 是 sss 的异位词等价于「两个字符串排序后相等」。因此我们可以对字符串 sss 和 ttt 分别排序，看排序后的字符串是否相等即可判断。此外，如果 sss 和 ttt 的长度不同，ttt 必然不是 sss 的异位词。

作者：[力扣官方题解](https://leetcode.cn/problems/valid-anagram/solutions/493231/you-xiao-de-zi-mu-yi-wei-ci-by-leetcode-solution/)

```C++
class Solution {
public:
    bool isAnagram (string s, string t) {
        if (s.length() != t.length()) {
            return false;
        }
        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        return s == t;
    }
};
```

时间复杂度：排序的时间复杂度为 `O(nlogn)` ，比较两个字符串是否相等时间复杂度为 `O(n)` ，总体时间复杂度为 `O(nlogn+n)=O(nlogn)` 。

空间复杂度：`O(logn)`

##### 方法三：哈希表 （需要重点掌握）

定义一个 record 数组用来记录字符串 s 中字符出现的次数，需要把字符映射到数组也就是哈希表的索引下标上，**因为字符a到字符z的ASCII是26个连续的数值，所以字符a映射为下标0，相应的字符z映射为下标25。**

在遍历字符串 s 的时候，**只需要将 s[i] - ‘a’ 所在的元素做 +1 操作即可**，并不需要记住字符 a 的ASCII，只要求出一个相对数值就可以了。

那看一下如何检查字符串t中是否出现了这些字符，同样在遍历字符串t的时候，**对t中出现的字符映射哈希表索引上的数值再做-1的操作。**

那么**最后检查一下，record数组如果有的元素不为零**，说明字符串s和t一定是谁多了字符或者谁少了字符，return false。

最后**如果record数组所有元素都为零，说明字符串s和t是字母异位词**，return true。

时间复杂度为O(n)，空间上因为定义是的一个常量大小的辅助数组，所以空间复杂度为O(1)。

```C++
class Solution {
public:
    bool isAnagram (string s, string t) {
        int record[26] = {0};
        for (int i = 0; i < s.size(); i++) {
            record[s[i] - 'a']++;  // ASCII 码值相减即为下标
        }
        for (int i = 0; i < t.size(); i++) {
            record[t[i] - 'a']--;
        }
        for (int i = 0; i < 26; i++) {
            if (record[i] != 0) {
                return false;
            }
        }
        return true;
    }
};
```

Java 版本

```Java
class Solution {
    public boolean isAnagram (String s, String t) {
        int[] record = new int[26];
        
        for (int i = 0; i < s.length(); i++) {
            record[s.charAt(i) - 'a']++;
        }
        
        for (int i = 0; i < t.length(); i++) {
            record[t.charAt(i) - 'a']--;
        }
        
        for (int count:record) {
            if (count != 0) {
                return false;
            }
        }
        return true;
    }
}
```

#### 349 两个数组的交集

[力扣题目链接(opens new window)](https://leetcode.cn/problems/intersection-of-two-arrays/)

题意：给定两个数组，编写一个函数来计算它们的交集。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333493.(null))

练习本道题目掌握 unordered_set 这一数据结构。

注意：输出结果中每一个元素是唯一的，需要去除重复的元素，可以不考虑输出结果的顺序。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333531.(null))

- unordered_set：基于哈希表实现，具有常数时间复杂度的查找操作，可以快速确定元素是否存在于集合中。另外它还可以自动去除重复的元素，具有更好的性能。
- 引用传递参数：如果不使用引用传递参数，而直接传递 vector 对象，会触发一次复制构造函数的调用，将原始 vector 复制一份传递给函数，在处理大型 vector 时会消耗大量的时间和内存。通过引用传递参数，函数可以直接修改原始的 vector 对象，而不需要返回值来传递修改后的结果。

```C++
class Solution {
public:
    vector<int> intersection (vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> result_set;  // 定义无序集合，用于存储两个输入向量的交集
        // 使用 nums1.begin() 和 nums1.end() 作为参数传递给 unordered_set 的构造函数
        // 这里的 begin() 和 end() 是 vector<int> 类型的成员函数，
        // 用于返回指向 nums1 向量的第一个元素和最后一个元素之后的位置的迭代器。
        // nums_set 对象被初始化为包含从 nums1.begin() 到 nums1.end() 范围内的所有唯一元素的无序集合。
        unordered_set<int> nums_set(nums1.begin(), nums1.end());
        for (int num : nums2) {
            // 遍历 nums2 中每一个元素，判断当前遍历元素 num 是否在 nums1 中存在
            // find() 返回一个迭代器：如何查找元素存在，则返回一个指向该元素的迭代器。
            // 否则，返回指向集合尾部的迭代器，通常使用 unordered_set.end() 表示
            if (nums_set.find(num) != nums_set.end()) {
                result_set.insert(num);
            }
        }
        return vector<int>(result_set.begin(), result_set.end());
    }
};
```

时间复杂度：`O(n+m)` ，m 是最后将 set 转为 vector

空间复杂度：`O(n)` 

使用数组来做哈希表（条件：元素的值有范围，不能太大）

```C++
class Solution {
public:
    vector<int> intersection (vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> result_set;
        int hash[1005] = {0};
        if (int num : nums1) {
            hash[num] = 1;
        }
        for (int num : nums2) {
            if (hash[num] == 1) {
                result_set.insert(num);
            }
        }
        return vector<int>(result_set.begin(), result_set.end());
    }
};
```

#### 202 快乐数

[力扣题目链接(opens new window)](https://leetcode.cn/problems/happy-number/)

编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。如果 可以变为  1，那么这个数就是快乐数。

如果 n 是快乐数就返回 True ；不是，则返回 False 。

示例：

输入：19

输出：true

解释：

1^2 + 9^2 = 82

8^2 + 2^2 = 68

6^2 + 8^2 = 100

1^2 + 0^2 + 0^2 = 1

##### 分析

求和的时候，sum 的值可能会重复出现，所以需要快速判断一个元素是否在集合中，考虑使用哈希法。

```C++
class Solution {
public:
    // 计算一个数各个位置上数字的平方和
    int getSum (int n) {
        int sum = 0;
        while (n) {
            sum += (n % 10) * (n % 10);
            n /= 10;
        }
        return sum;
    }
    
    bool isHappy (int n) {
        unordered_set<int> set;
        while (1) {
            int sum = getSum(n);
            if (sum == 1) return true;
            
            // 如果该 sum 曾经出现过，说明已经进入了无限循环，立即退出
            if (set.find(sum) != set.end()) {
                return false;
            } else {
                set.insert(sum);
            }
            n = sum;
        }
    }
};
```

- 时间复杂度: O(logn)
- 空间复杂度: O(logn)

#### 两数之和

[力扣题目链接(opens new window)](https://leetcode.cn/problems/two-sum/)

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9

所以返回 [0, 1]

##### 思路

1、暴力求解：两层 for 循环查找，时间复杂度为 `O(n^2)`

2、map

再来看一下使用数组和set来做哈希法的局限。

- 数组的大小是受限制的，而且如果元素很少，而哈希值太大会造成内存空间的浪费。

注意到方法一的时间复杂度较高的原因是寻找 target - x 的时间复杂度过高。因此，我们需要一种更优秀的方法，能够快速寻找数组中是否存在目标元素。如果存在，我们需要找出它的索引。

使用哈希表，可以将寻找 target - x 的时间复杂度降低到从 O(N)O(N)O(N) 降低到 O(1)O(1)O(1)。

这样我们创建一个哈希表，对于每一个 x，我们首先查询哈希表中是否存在 target - x，然后将 x 插入到哈希表中，即可保证不会让 x 和自己匹配。

作者：力扣官方题解

链接：https://leetcode.cn/problems/two-sum/solutions/434597/liang-shu-zhi-he-by-leetcode-solution/

来源：力扣（LeetCode）

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

此时就要选择另一种数据结构：map ，map是一种key value的存储结构，可以用key保存数值，用value再保存数值所在的下标。

C++中map，有三种类型：

| 映射               | 底层实现 | 是否有序 | 数值是否可以重复 | 能否更改数值 | 查询效率 | 增删效率 |
| ------------------ | -------- | -------- | ---------------- | ------------ | -------- | -------- |
| std::map           | 红黑树   | key有序  | key不可重复      | key不可修改  | O(log n) | O(log n) |
| std::multimap      | 红黑树   | key有序  | key可重复        | key不可修改  | O(log n) | O(log n) |
| std::unordered_map | 哈希表   | key无序  | key不可重复      | key不可修改  | O(1)     | O(1)     |

std::unordered_map 底层实现为哈希表，std::map 和std::multimap 的底层实现是红黑树。

```C++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hashtable;
        for (int i = 0; i < nums.size(); i++) {
            // auto 关键字用于自动推断变量的类型
            // 通过 auto 关键字，编译器会根据 hashtable.find(target - nums[i]) 返回的类型
            // 自动推断 it 的类型为哈希表的迭代器类型，而无需显式地指定其类型。
            auto iter = hashtable.find(target - nums[i]);
            if (iter != hashtable.end()) {
                return {iter->second, i}
            }
            hashtable[nums[i]] = i;
        }
        return {};
    }
};
```

- 时间复杂度: O(n)
- 空间复杂度: O(n)

#### 454 四数相加II

[力扣题目链接(opens new window)](https://leetcode.cn/problems/4sum-ii/)

给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -2^28 到 2^28 - 1 之间，最终结果不会超过 2^31 - 1 。

例如:

输入:

- A = [ 1, 2]
- B = [-2,-1]
- C = [-1, 2]
- D = [ 0, 2]

输出:

2

解释:

两个元组如下:

1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0

思路与算法

我们可以将四个数组分成两部分，AAA 和 BBB 为一组，CCC 和 DDD 为另外一组。

对于 AAA 和 BBB，我们使用二重循环对它们进行遍历，得到所有 A[i]+B[j]A[i]+B[j]A[i]+B[j] 的值并存入哈希映射中。对于哈希映射中的每个键值对，每个键表示一种 A[i]+B[j]A[i]+B[j]A[i]+B[j]，对应的值为 A[i]+B[j]A[i]+B[j]A[i]+B[j] 出现的次数。

对于 CCC 和 DDD，我们同样使用二重循环对它们进行遍历。当遍历到 C[k]+D[l]C[k]+D[l]C[k]+D[l] 时，如果 −(C[k]+D[l])-(C[k]+D[l])−(C[k]+D[l]) 出现在哈希映射中，那么将 −(C[k]+D[l])-(C[k]+D[l])−(C[k]+D[l]) 对应的值累加进答案中。

最终即可得到满足 A[i]+B[j]+C[k]+D[l]=0A[i]+B[j]+C[k]+D[l]=0A[i]+B[j]+C[k]+D[l]=0 的四元组数目。

作者：力扣官方题解

链接：https://leetcode.cn/problems/4sum-ii/solutions/499745/si-shu-xiang-jia-ii-by-leetcode-solution/

来源：力扣（LeetCode）

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

```C++
class Solution {
public:
    int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {
        unordered_map<int, int> countAB;
        for (int a : nums1) {
            for (int b : nums2) {
                countAB[a + b]++;
            }
        }
        int count = 0;
        for (int c : nums3) {
            for (int d : nums4) {
                if (countAB.find(0 - (c + d)) != countAB.end()) {
                    count += countAB[0 - (c + d)];
                }
            }
        }
        return count;
    }
};
```

- 时间复杂度: O(n^2)
- 空间复杂度: O(n^2)，最坏情况下A和B的值各不相同，相加产生的数字个数为 n^2

#### 383 赎金信

[力扣题目链接(opens new window)](https://leetcode.cn/problems/ransom-note/)

给定一个赎金信 (ransom) 字符串和一个杂志(magazine)字符串，判断第一个字符串 ransom 能不能由第二个字符串 magazines 里面的字符构成。如果可以构成，返回 true ；否则返回 false。

(题目说明：为了不暴露赎金信字迹，要从杂志上搜索各个需要的字母，组成单词来表达意思。杂志字符串中的每个字符只能在赎金信字符串中使用一次。)

注意：

你可以假设两个字符串均只含有小写字母。

canConstruct("a", "b") -> false

canConstruct("aa", "ab") -> false

canConstruct("aa", "aab") -> true

##### 暴力解法

两层 for 循环，不断的寻找

```C++
class Solution {
public:
    bool canConstruct (string ransomNote, string magazine) {
        for (int i = 0; i < magazine.size(); i++) {
            for (int j = 0; j < ransomNote.size(); j++) {
                if (magazine[i] == ransomNote[j]) {
                    ransomeNote.erase(ransomNote.begin() + j);
                    break;
                }
            }
        }
        if (ransomNote.length() == 0) {
        return true;
        }
        return false;
    }
};
```

- 时间复杂度: O(n^2)
- 空间复杂度: O(1)

##### 哈希表

题目中说只有小写字母，可以采用空间换时间的哈希策略，用一个长度为 26 的数组来记录 magazine 中字母出现的次数。然后再使用 ransomNote 去验证该数组中是否包含了其所需的所有字母。（相比较于使用 map，在数据量大的时候，map空间消耗更大一些。）

```C++
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        // 代码随想录
        // int record[26] = {0};
        // if (ransomNote.size() > magazine.size()) {
        //     return false;
        // }
        // for (int i = 0; i < magazine.size(); i++) {
        //     record[magazine[i] - 'a']++;
        // }
        // for (int j = 0; j < ransomNote.size(); j++) {
        //     record[ransomNote[j] - 'a']--;
        //     if (record[ransomNote[j] - 'a'] < 0) {
        //         return false;
        //     }
        // }
        // return true;

        // leetcode 官方题解
        if (ransomNote.size() > magazine.size()) {
            return false;
        }

        vector<int> cnt(26);
        // auto 关键字用于自动类型推断
        // auto& 自动推断并创建一个引用变量 
        for (auto & c : magazine) {
            cnt[c - 'a']++;
        }
        for (auto & c : ransomNote) {
            cnt[c - 'a']--;
            if (cnt[c - 'a'] < 0) {
                return false;
            }
        }
        return true;
    }
};
```

#### 三数之和

[力扣题目链接(opens new window)](https://leetcode.cn/problems/3sum/)

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意： 答案中不可以包含重复的三元组。

示例：

给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

##### 哈希法

```C++
class Solution {
public:
    vector<vector<int>> threeSum (vector<int>& nums) {
        
    }
};
```

##### 排序+双指针

#### 四数之和

### 2.4 字符串

#### 344 反转字符串

[力扣题目链接(opens new window)](https://leetcode.cn/problems/reverse-string/)

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

示例 1：

输入：["h","e","l","l","o"]

输出：["o","l","l","e","h"]

示例 2：

输入：["H","a","n","n","a","h"]

输出：["h","a","n","n","a","H"]

分析：与之前反转链表的思路一样，使用双指针的方法

暂时无法在飞书文档外展示此内容

```C++
class Solution {
public:
    void reverseString (vector<char>& s) {
        for (int i = 0, j = s.size()-1; i < s.size()/2; i++,j--) {
            swap(s[i], s[j]);
        }
    }
};
```

- 时间复杂度: O(n)
- 空间复杂度: O(1)

#### 541 反转字符串II

[力扣题目链接(opens new window)](https://leetcode.cn/problems/reverse-string-ii/)

给定一个字符串 s 和一个整数 k，从字符串开头算起, 每计数至 2k 个字符，就反转这 2k 个字符中的前 k 个字符。

如果剩余字符少于 k 个，则将剩余字符全部反转。

如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。

示例:

输入: s = "abcdefg", k = 2

输出: "bacdfeg"

分析：按照题目意思，反转每个下标从 2k的倍数开始的，长度为 k 的子串。若该子串长度不足 k，则反转整个子串。

```C++
class Solution {
public:
    string reverseStr(string s, int k) {
        int n = s.length();
        for (int i = 0; i < n; i += 2 * k) {
            reverse(s.begin() + i, s.begin() + min(i + k, n));
        }
        return s;
    }
};
```

#### 替换数字

[卡码网题目链接(opens new window)](https://kamacoder.com/problempage.php?pid=1064)

给定一个字符串 s，它包含小写字母和数字字符，请编写一个函数，将字符串中的字母字符保持不变，而将每个数字字符替换为number。

例如，对于输入字符串 "a1b2c3"，函数应该将其转换为 "anumberbnumbercnumber"。

对于输入字符串 "a5b"，函数应该将其转换为 "anumberb"

输入：一个字符串 s,s 仅包含小写字母和数字字符。

输出：打印一个新的字符串，其中每个数字字符都被替换为了number

样例输入：a1b2c3

样例输出：anumberbnumbercnumber

数据范围：1 <= s.length < 10000。

思路：（java 中的 string 不能修改，本题需要使用额外的辅助空间）

双指针法一步步填充：`i` 指向新长度的末尾，`j` 指向旧长度的末尾。

很多数组填充类问题，都是预先给数组扩容到填充的大小，然后在从后向前进行操作。优点：

- 不用申请新数组。
- 从后向前填充元素，避免了从前向后填充元素时，要把添加元素之后的所有元素都向后移动的问题。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333471.(null))

```C++
#include <iostream>
using namespace std;

// class Solution {
    
// };

int main() {
    string s;
    while (cin >> s) {
        int count = 0;  // 统计数字的个数
        int sOldSize = s.size();
        for (int i = 0; i < sOldSize; i++) {
            if (s[i] >= '0' && s[i] <= '9') {
                count++;
            }
        }
        
        // 计算扩充字符串后 s 的大小，然后重构 s
        s.resize(sOldSize + count * 5);
        int sNewSize = s.size();
        
        // 从后向前将空格替换为 number
        for (int i = sNewSize - 1, j = sOldSize - 1; j < i; i--, j--) {
            if (s[j] > '9' || s[j] < '0') {
                s[i] = s[j];
            } else {
                s[i] = 'r';
                s[i - 1] = 'e';
                s[i - 2] = 'b';
                s[i - 3] = 'm';
                s[i - 4] = 'u';
                s[i - 5] = 'n';
                i -= 5;
            }
        }
        cout << s << endl;
    }
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)

双指针题目汇总：

- [27.移除元素(opens new window)](https://programmercarl.com/0027.移除元素.html)
- [15.三数之和(opens new window)](https://programmercarl.com/0015.三数之和.html)
- [18.四数之和(opens new window)](https://programmercarl.com/0018.四数之和.html)
- [206.翻转链表(opens new window)](https://programmercarl.com/0206.翻转链表.html)
- [142.环形链表II(opens new window)](https://programmercarl.com/0142.环形链表II.html)
- [344.反转字符串(opens new window)](https://programmercarl.com/0344.反转字符串.html)

字符串是若干字符组成的有限序列，也可以理解为是一个字符数组。在 C++ 中，提供一个 string 类，该类会提供一个 size 接口，可以用来判断 string 类字符串是否结束。

```C++
// 判断字符串是否结束
string a = "asd";
for (int i = 0; i < a.size(); i++) {
}
```

`vector<char>` 和 `string` 在基本操作上没区别，但 `string` 会提供更多的字符串的处理接口。

#### 151 反转字符串里的单词

[力扣题目链接(opens new window)](https://leetcode.cn/problems/reverse-words-in-a-string/)

给定一个字符串，逐个翻转字符串中的每个单词。

示例 1：

输入: "the sky is blue"

输出: "blue is sky the"

示例 2：

输入: "  hello world!  "

输出: "world! hello"

解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

示例 3：

输入: "a good   example"

输出: "example good a"

解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

思路：

- 简单：使用 `split` 库函数，分隔单词，然后定义新的 `string` 字符串，最后倒序相加
- 进阶：（要求不能使用辅助空间，空间复杂度要求为 `O(1)`）
- 方法：移除多余空格、将整个字符串反转、将每个单词反转

```C++

```

#### 右旋转字符串

#### 实现 strStr()

#### 重复的字符串

### 2.5 双指针法

### 2.6 栈与队列

GPT

队列（Queue）

原理：

- 队列是一种先进先出（FIFO，First In First Out）的数据结构，类似于现实生活中排队的场景，先到先服务。
- 在队列中，元素从队列的一端（称为队尾）添加，从另一端（称为队首）移除。
- 新的元素总是被添加到队列的末尾，而最老的元素总是在队列的开头。

用法：

- 队列常用于模拟排队、任务调度、广度优先搜索（BFS）等场景。
- 实现队列通常有两种方式：基于数组实现的顺序队列和基于链表实现的链式队列。
- 在C++中，可以使用`std::queue`模板类来实现队列，其提供了队列的常用操作，如入队、出队、查看队首元素等。

栈（Stack）

原理：

- 栈是一种后进先出（LIFO，Last In First Out）的数据结构，类似于一摞盘子，最后放上去的盘子最先被取走。
- 在栈中，元素的添加和删除操作只能在栈顶进行。
- 新的元素总是被添加到栈顶，而最新添加的元素总是在栈顶，最老的元素在栈底。

用法：

- 栈常用于递归函数调用、表达式求值、括号匹配、深度优先搜索（DFS）等场景。
- 实现栈通常有两种方式：基于数组实现的顺序栈和基于链表实现的链式栈。
- 在C++中，可以使用`std::stack`模板类来实现栈，其提供了栈的常用操作，如入栈、出栈、查看栈顶元素等。

一些常见的示例：

```C++
#include <iostream>
#include <queue>

int main() {
    // 创建一个队列
    std::queue<int> q;
    
    // 入队操作
    q.push(10);
    q.push(20);
    q.push(30);
    
    // 出队操作
    while (!q.empty()) {
        std::cout << q.front() << " ";  // 访问队首元素
        p.pop();  // 移除队首元素
    }
    std::cout << std::endl;
    return 0;
}
```

同理：对栈也有类似的操作

push()：入栈操作

empty(): 判断栈内元素是否为空

top(): 访问栈顶元素

pop(): 移除栈顶元素

#### 基础

队列是先进先出，栈是先进后出。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333432.(null))

1. C++中stack 是容器么？
2. 我们使用的stack是属于哪个版本的STL？
3. 我们使用的STL中stack是如何实现的？
4. stack 提供迭代器来遍历stack空间么？

首先大家要知道 栈和队列是STL（C++标准库）里面的两个数据结构。

C++标准库是有多个版本的，要知道我们使用的STL是哪个版本，才能知道对应的栈和队列的实现原理。

那么来介绍一下，三个最为普遍的STL版本：

1. HP STL 其他版本的C++ STL，一般是以HP STL为蓝本实现出来的，HP STL是C++ STL的第一个实现版本，而且开放源代码。
2. P.J.Plauger STL 由P.J.Plauger参照HP STL实现出来的，被Visual C++编译器所采用，不是开源的。
3. SGI STL 由Silicon Graphics Computer Systems公司参照HP STL实现，被Linux的C++编译器GCC所采用，SGI STL是开源软件，源码可读性甚高。

接下来介绍的栈和队列也是SGI STL里面的数据结构， 知道了使用版本，才知道对应的底层实现。

栈先进后出，如图所示：

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333592.(null))

栈提供 push 和 pop 等等接口，所有元素必须符合先进后出规则，所以栈不提供走访功能，也不提供迭代器(iterator)。 不像是set 或者map 提供迭代器iterator来遍历所有元素。

栈是以底层容器完成其所有的工作，对外提供统一的接口，底层容器是可插拔的（也就是说我们可以控制使用哪种容器来实现栈的功能）。

所以STL中栈往往不被归类为容器，而被归类为container adapter（容器适配器）。

那么问题来了，STL 中栈是用什么容器实现的？

从下图中可以看出，栈的内部结构，栈的底层实现可以是vector，deque，list 都是可以的， 主要就是数组和链表的底层实现。

![img](/Users/sebas/Documents/wzq11011.github.io/source/_posts/leetcode.assets/(null)-20240417193333661.(null))

我们常用的**SGI STL，如果没有指定底层实现的话，默认是以deque为缺省情况下栈的底层结构**。

deque是一个双向队列，只要封住一段，只开通另一端就可以实现栈的逻辑了。

SGI STL中 队列底层实现缺省情况下一样使用deque实现的。

我们也可以指定vector为栈的底层实现，初始化语句如下：

```C++
std::stack<int, std::vector<int>> third;  // 使用 vector 为底层容器的栈
```

队列中先进先出的数据结构，同样不允许有遍历行为，不提供迭代器, SGI STL中队列一样是以deque为缺省情况下的底部结构。

也可以指定list 为起底层实现，初始化queue的语句如下：

```C++
std::queue<int, std::list<int third; // 定义以list为底层容器的队列
```

所以STL 队列也不被归类为容器，而被归类为container adapter（ 容器适配器）。

### 2.7 二叉树

### 2.8 回溯算法

### 2.9 贪心算法

### 2.10 动态规划

### 2.11 单调栈

### 2.12 图论

## 3 牛客网

## 4 其他问题

### ACM模型

在 Leetcode 上刷题，采用的是核心代码模型。而很多公司的笔试题和面试题都是 ACM 模型，即需要自己处理数据的输入输出。

练习地址：[卡码网KamaCoder](https://kamacoder.com/problemset.php?page=1)

题解地址：[GitHub - youngyangyang04/kamacoder-solutions: 卡码网题解全集](https://github.com/youngyangyang04/kamacoder-solutions)

使用git提交代码：[如何在Github上提交PR(pull request) | 代码随想录](https://www.programmercarl.com/qita/join.html)

## 5 刷题记录

回溯

贪心

分治

动态规划：

[647. 回文子串 - 力扣（LeetCode）](https://leetcode.cn/problems/palindromic-substrings/description/)   （2024-4-11 20:31）

[5. 最长回文子串 - 力扣（LeetCode）](https://leetcode.cn/problems/longest-palindromic-substring/description/)（2024-4-11 20:31）

## 6 面试高频考点

> 参考：[面试高频算法真题](https://interviewguide.cn/notes/03-hunting_job/03-algorithm/04-high_frquency_algorithm/01-high_frquency_algorithm.html#_12、top-k问题)

### 6.1 排序算法

#### 冒泡排序

#### 快速排序

#### 归并排序

#### 堆排序

























