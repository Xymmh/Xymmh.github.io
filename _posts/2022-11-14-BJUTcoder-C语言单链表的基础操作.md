---
layout:     post
title:      BJUTcoder - C语言单链表的基础操作
subtitle:   BJUTcoder - Basic operation of singly linked list in C language
date:       2022-11-14
author:     Xymmh Wang
header-img: img/titlephoto5.jpg
catalog: false
tags:
    - C语言
    - BJUT
---

最近学到C语言的单链表，虽然实际上不难，但理解起来真是个问题。

花了好几天理解，以下为我写的单链表的基本操作代码，每一个函数对应一个功能。

注释非常详细，希望对刚入门的新手有一定帮助。

~~~
#include <stdio.h> 
#include <stdlib.h>

typedef struct node{
	int data;
	struct node *next;
}NODE;  //定义结构体，其中node为结构体名，NODE为利用typedef语句定义的新数据类型 

  //node和NODE的区别在于，当需要创建一个新的结构体变量a时： 
  //struct node a;   此为node用法 
  //NODE a;          此为NODE用法 
  
NODE *createbytail();
NODE *createbyhead();
void print(NODE *L);  //函数中主要操作（即传入的）的单链表指针一般将其定义为L
NODE *insert(NODE *L, int i, int x);
NODE *deleteL(NODE *L, int i);
NODE *insert_sort(NODE *L, int x);
NODE *destroy(NODE *L);
  //函数预先定义
   
int main()
{
	NODE *h1, *h2;
	int x;
	
	printf("1、利用尾插法创建单链表h1，输入0结束\n");
	h1 = createbytail();
	
	printf("\n2、显示单链表h1\n");
	print(h1);
	
	printf("\n3、利用头插法创建单链表h2, 输入0结束\n");
	h2 = createbyhead();
	
	printf("\n4、显示单链表h2\n");
	print(h2);
	
	printf("\n5、在单链表h1的第i个位置之前插入x\n");
	int i;
	printf("请输入i："); 
	scanf("%d", &i);
	printf("请输入x："); 
	scanf("%d", &x);
	insert(h1, i, x);
	
	printf("\n6、显示（新的）单链表h1\n");
	print(h1);
	
	printf("\n7、删除单链表h1第i个位置的元素\n");
	printf("请输入i：");
	scanf("%d", &i);
	h1 = deleteL(h1, i);
	
	printf("\n8、显示（新的）单链表h1\n");
	print(h1);
	
	printf("\n9、输入一个整数x，在有序（如果）单链表h2中插入x，使h2依然有序\n"); 
	printf("请输入x：");
	scanf("%d", &x);
	h2 = insert_sort(h2, x); 
	
	printf("\n10、显示（新的）单链表h2\n");
	print(h2);
	
	printf("\n11、销毁单链表h1\n");
	h1 = destroy(h1);
	
	printf("\n12、销毁单链表h2\n");
	h2 = destroy(h2);
	
	return 0;
}

NODE *createbytail()
{
	int x;
	NODE *s, *f = NULL, *L = NULL;  //定义三个指针，一般将s当作新指针，f当作尾指针 
	printf("请输入：");
	scanf("%d",&x);
	while(x != 0)
	{
		s = (NODE*)malloc(sizeof(NODE));  //为指针s分配新地址 
		s -> data = x;
		s -> next = NULL;  //为指针s所指地址赋值
		if(L == NULL)
		{
			L = s;  //若指针L所指地址为空，则将s地址赋值给L 
		} 
		else
		{
			f -> next = s;  //将链表最后一个结点的next赋值为s的地址 
		}
		f = s;   //将s的地址赋值给f，这样f始终指向最后的结点
		scanf("%d", &x); //为下次循环做好准备 
	}
	return L;  //返回指向表头地址的指针
}

void print(NODE *L)
{
	NODE *p = L;  //定义指针p，一般将p当作临时指针，目的是不改变L的指向 
	while(p != NULL)  //如果指针不为空 
	{
		printf("%d ", p -> data);
		p = p -> next;  //将指针赋值为下一个地址 
	} 
	printf("\n");
}

NODE *createbyhead()
{
	int x;
	NODE *p, *L = NULL;
	printf("请输入：");
	scanf("%d", &x);
	while(x != 0)
	{
		p = (NODE*)malloc(sizeof(NODE));
		p -> data = x;
		p -> next = L;
		L = p;  //其实含义很简单，但不易理解
		scanf("%d", &x); 
	}
	return L;  //记得返回表头指针 
}

NODE *insert(NODE *L, int i, int x)
{
	NODE *p, *s;  //定义指针p、s，一般将p当作临时指针，s当作新结点 
	int j = 1;  //从第一个结点开始寻找 
	s = (NODE*)malloc(sizeof(NODE));
	s -> data = x;  //s为新添加的结点 
	s -> next = NULL;
	if(L == NULL)
	{
		L = s;
	}
	else
	{
		p = L;  //不需返回首地址时，可不定义p指针 
		while(p != NULL && j < i - 1)  //寻找i前面的那个结点 
		{
			p = p -> next;
			j ++;
		}
		s -> next = p -> next;  //将p的下一个地址赋值给s
		p -> next = s;  //将p的下一个地址指向s的地址  
	}  //由以上两行核心代码，就完成了结点的插入 
}

NODE *deleteL(NODE *L, int i)
{
	NODE *p, *s;  
	int j = 1;
	p = L;  //同上，不需返回首地址时，可不定义p指针 
	if(i == 1)
	{
		L = L -> next;
		free(p);
	}
	else
	{
		while(p -> next && j < i - 1)
		{
			p = p -> next;
			j ++;
		}
		s = p -> next;  //此时s的地址为待删结点的结点的地址 
		p -> next = s -> next;  //此时p的next指针指向待删结点的下一个结点的地址 
	}  //由以上两行核心代码，就完成了结点的删除 
	return L;  //记得返回表头指针 
}

NODE *insert_sort(NODE *L, int x)
{
	NODE *p, *s;  
	s = (NODE*)malloc(sizeof(NODE));
	p = L;  //同上，不需返回首地址时，可不定义p指针 
	while(p -> next -> data < x)  //实践证明，对单链表的操作时，使用while语句更加灵活 
	{
		p = p -> next;
	}  //找到data比x大的结点 
	s -> data = x;  
	s -> next = p -> next;  //将新节点s的next指针赋值为下一个结点的地址 
	p -> next = s;  //将data比x大的结点的next指针赋值为新结点s的地址 
	  //由以上两行核心代码，就完成了结点的顺序插入 
	return L;  //记得返回表头指针 
}

NODE *destroy(NODE *L)
{
	NODE *p;
	while(L != NULL)
	{
		p = L;
		L = L -> next;
		free(p);  //释放p指向的结点
	} 
	printf("完成！\n");
	return L;  //记得返回表头指针 
} 
~~~
