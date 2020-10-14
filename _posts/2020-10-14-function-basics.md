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
* 자바스크립트 엔진에게 이것은 함수라고 알려주는 키워드가 <mark>function</mark>인 것이다.
* 함수의 이름은 원하는것으로 짓되, <u>간결하고, 의미있는 것</u>으로 짓는다.
* **함수이름()** 를 통해 함수를 호출한다.
* 함수를 정의할때, 함수에서 정의한 {}를 포함한 코드블럭이 메모리 어딘가에 만들어진다.

<br>

```javascript
function add(a, b){
    return a + b;
}

const sum = add(3, 4); 
console.log(sum); //7
```
위에 a와 b를 받아서 a와 b를 더한 값을 return하는 함수 add를 만들었다.<br>
{} 이 안에 있는 코드블럭이 함수이고, 이 함수의 이름을 add로 지정을 해줬다.<br>
(a, b)가 인자인데, 이 인자는 외부에서 어떤 값을 받아올때 코드블럭 안에서 접근이 가능하도록 해준다.<br>
함수가 들어있는 주소같은 즉, *reference*가 함수명에 저장된다.<br>
다시말해 위 함수를 보면, add라는 함수 이름은 함수가 정의된 곳을 가리키고 있는 *reference*가 들어있다.


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
doSomething이라는 변수를 선언하면 공간이 할당되는데, 이 공간에는 add가 가리키고 있는 *reference*가 복사되어 들어가게된다.<br>
즉, doSomething이나 add나 똑같은 함수를 가리키고 있다.

<br>
<br>


## 인자

* 인자는 함수를 호출하는 사람으로 부터 필요한 데이터를 받아오기 위해서 사용한다.
* 필요한 데이터를 받아올때, 함수 내부에서 조금 더 이해하기 쉬운 의미있는 이름으로 인자를 부여한다.

<br>

```javascript
function print(){
    console.log('print');
}
print(); //print
print(2, 3); //print
```
아무런 인풋을 받지 않는 print함수를 만들어보았다.<br>
print함수를 호출할때, 어떤 인풋을 전달하든 print라는 텍스트만 출력한다.<br>
이렇게 아무런 인자를 받지않는 함수는 인풋을 받지 않는다.<br>
만약 받아온 데이터를 접근하고 싶다면 아래와 같이 인자를 넣어서 수정해줘야 한다.

```javascript
function print(a, b){
    console.log(`${a} ${b}`);
}
print(2, 3); //2 3
```

<br>
<br>


## callback 함수

```javascript
//STEP1.
function add(num1, num2){
    return num1 + num2;
}

function surprise(operator){
    const result = operator();
    console.log(result);
}
surprise();
```
surprise라는 함수를 만들었다. 이 함수는 어떤 동작을 수행하는 *operator*라는 인자를 받는다.<br>
이 함수는 받아온 *operator* 인자를 실행한다. 그리고 그 결과값을 내부에 있는 result라는 변수에 할당해서 출력한다.<br>
이 상태로 출력해보면 아래와 같이 **operator is not a function**이라고 에러가 난다.<br>
![작은 이미지](/assets/images/post/20201014_function.png)<br>
그 이유는 *operator*는 아무런 값을 전달하지 않아서 현재 *undefined*인 상태이기 때문이다.

<br>

```javascript
//STEP2.
function add(num1, num2){
    return num1 + num2;
}

function surprise(operator){
    const result = operator();
    console.log(result);
}
surprise(add); //add 추가
```
에러를 해결하기 위해 surprise함수 호출할때 add를 전달한다.<br>
그러면 operator인자에는 add의 reference가 복사되어 전달된다.<br>
그래서 변수 result가 operator를 호출한다는것은 add를 수행하는것과 동일하다.<br>
이 상태로 출력해보면 **NaN(Not a Number)**가 출력된다.<br>
그 이유는, 지금 add함수의 인자값인 num1, num2에 아무런 데이터가 전달이 되지 않았기 때문이다.

<br>

```javascript
//STEP3.
function add(num1, num2){
    return num1 + num2;
}

function surprise(operator){
    const result = operator(2, 3); //2, 3 데이터 전달
    console.log(result); //5
}
surprise(add);
```
문제를 해결하기 위해 operator에 데이터값을 전달한다.<br>
이제 정상적으로 값이 출력된다.<br>
변수 result는 add를 호출한거나 다름없다.

<br>

```javascript
//STEP4.
function add(num1, num2){
    return num1 + num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function surprise(operator){
    const result = operator(2, 3);
    console.log(result); 
}
surprise(add);
surprise(divide;
```


<p class="reference-txt">출처 : 
    <a href="https://youtu.be/-cAPq25P-68" target="_blankd">엘리 youtube</a>
</p>

--- 
