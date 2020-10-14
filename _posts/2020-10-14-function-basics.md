---
layout: post
title: "[JS] 함수 기초, callback"
description: ""
date: 2020-10-13
tags: [Javascript, function, callback]
comments: true
share: true
---

## 함수란?

* 반복적으로 처리해야 하는 로직이다.
* 함수를 만들면 재사용이 가능하다.
* <mark>function</mark> 키워드를 사용해서 함수의 이름을 지정한다.
* 함수의 이름은 원하는것으로 짓되, 간결하고, 의미있는 것으로 짓는다.

<br>

```javascript
function add(a, b){
    return a + b;
}

const sum = add(3, 4); 
console.log(sum); //7
```
* 위에 a와 b를 받아서 a와 b를 더한 값을 return하는 함수 add를 만들었다.
* {} 이 안에 있는 코드블럭이 함수이고, 이 함수의 이름을 add로 지정을 해줬다.
* 자바스크립트 엔진에게 이것은 함수라고 알려주는 키워드가 'function'인 것이다.
* (a, b)이 인자인데, 인자는 외부에서 어떤 값을 받아올때 코드블럭안에서 접근이 가능하도록 해준다.
* <strong>함수이름()</strong> 를 통해 함수를 호출한다.
* 함수를 정의할때, 함수에서 정의한 {}를 포함한 코드블럭이 메모리 어딘가에 만들어진다.
* 함수가 들어있는 주소같은 즉, *reference*가 함수명에 저장된다.
    다시말해 위 함수를 보면, add라는 함수 이름은 함수가 정의된 곳을 가리키고 있는 reference가 들어있다.

<br>


```javascript
function add(num1, num2){
    return num1 + num2;
}

const doSomething = add;

const result = doSomething(2, 3);
console.log(result); //5
const result2 = add(2, 3);
console.log(result2); //5
```
doSomething이라는 변수에는 공간이 할당되는데, 이 공간에는 add가 가리키고 있는 reference가 복사되어 들어가게된다.<br>
즉, doSomething이나 add나 똑같은 함수를 가리키고 있다.

<br>
<br>


## 인자

* 인자는 함수를 호출하는 사람으로 부터 필요한 데이터를 받아오기 위해서 사용한다.
* 필요한 데이터를 받아올때, 함수 내부에서 조금더 이해하기 쉬운 의미있는 이름으로 인자를 부여한다.

```javascript
function print(){
    console.log('print');
}
print(); //print
print(2, 3); //print
```
아무런 인풋을 받지 않는 print함수를 만들어보았다.<br>
print함수를 호출할때, 어떤 인풋을 전달하든(print(2, 3);) print라는 텍스트만 출력한다.<br>
이렇게 아무런 인자를 받지않는 함수는 인풋을 받지 않는다.<br>
만약 받아온 데이터를 접근하고 싶다면 아래와 같이 수정해줘야 한다.

```javascript
function print(a, b){
    console.log(`${a} ${b}`);
}
print(2, 3); //2 3
```

<br>
<br>


## callback 함수


<p class="reference-txt">출처 : 
    <a href="https://youtu.be/-cAPq25P-68" target="_blankd">엘리 youtube</a>
</p>

--- 
