---
layout: post
title: "JavaScript [3] - 함수의 호출 apply"
description: ""
date: 2020-01-15
tags: [javascript]
comments: true
share: true
---

## 객체

객체는 속성들을 가지고 있다.<br>
* 그 속성에 값이 저장이 되어 있다면 우리는 그것을 그냥 **'속성(property)'** 라고 한다.
* 그 속성에 함수가 저장이 되어 있다면 우리는 그것을 **'메소드(method)'** 라고 한다.

<br>


```javascript
function func(){
}
func();
```

>함수는 일종의 객체이다.<br>
위 코드에서 func라는 함수는 객체이기 때문에 메소드를 가지고 있다. 그 메소드는 내장된 객체이다.<br>
<mark>func.apply</mark> 또는 <mark>func.call</mark> 처럼 **apply**와 **call** 메소드에 접근을 할 수 있다.<br>
**apply** 대해 알아보자.

## apply
* apply는 두번째 인자로 원래 함수의 인자를 배열로 호출을 한다.
* apply의 첫번째 인자를 null 말고 다른 것을 사용하기 위해서 apply를 사용한다.


```javascript
function sum(arg1, arg2){
    return arg1 + arg1;
}
sum(1,2); // 3

sum.apply(null, [1,2]); // 3
```

위 코드에서 sum을 호출한 값은 모두 '3'으로 똑같다.<br><br>

<br>

```javascript
o1 = {val1:1, val2:2, val3:3}
o2 = {v1:10, v2:50, v3:100, v4:25}
// o1과 o2는 객체이다.

function sum(){
    var _sum = 0;
    for(name in this){ // this는 o1, o2의 객체들이 들어온다.
        _sum += this[name];
    }
    return _sum;
}
alert(sum.apply(o1)) // 6
alert(sum.apply(o2)) // 185
```

--- 
