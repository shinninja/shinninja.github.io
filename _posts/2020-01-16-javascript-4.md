---
layout: post
title: "[JS] 객체"
description: ""
date: 2020-01-16
tags: [javascript, 객체]
comments: true
share: true
---

## 객체(Object)

* 배열과 유사한 역할을 한다.
   * 배열 : 연관되어 있는 데이터들을 담아내기 위한 일종의 '그릇'이다.

<br>

### 배열과 차이점

* 배열 : index의 값을 숫자로 지정한다.
* 객체 : index의 값을 숫자뿐만 아니라 문자등 index의 값으로 원하는 데이터를 지정을 할 수가 있다.

<br>

### 객체의 생성

#### 방법1.

```javascript
var grades = {'shinninja': 10, 'k8805': 6, 'sorialgi': 80};
```

위 코드에서 객체는 **'shinninja', 'k8805', 'sorialgi'** 3개의 문자열 index가 있다.<br>
**10, 6, 80** 는 index의 값이다.

#### 방법2.

```javascript
var grades = {};
grades['shinninja'] = 10;
grades['k8805'] = 6;
grades['sorialgi'] = 80;
```

#### 방법3.

```javascript
var grades = new Object(); // 방법2의 'var grades = {};' 과 같은 의미이다.
grades['shinninja'] = 10;
grades['k8805'] = 6;
grades['sorialgi'] = 80;
```


#### 객체에서 필요한 값 가져오기

```javascript
var grades = {'shinninja': 10, 'k8805': 6, 'sorialgi': 80};
alert(grades['sorialgi']);
alert(grades['sori' + 'algi']); //문자열이기 때문에 이렇게 해도 같은 결과값이 나온다.
alert(grades.sorialgi);
```

--- 
