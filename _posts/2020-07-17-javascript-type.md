---
layout: post
title: "[JS] Javascript - Type"
description: ""
date: 2020-07-17
tags: [Javascript, type, primitives, complex]
comments: true
share: true
---

Javascript의 자료형에는 Primitive Type(원시타입)과 Reference Type(참조타입) 두 가지 타입이 존재한다.
Object를 제외한 모든것들은 Primitive(원시)적인 성격을 갖고 있다.

<br>

## Primitive Type(원시타입)
### Primitive Type의 종류
* string : 텍스트 데이터를 나타내는데 사용한다.
* number
    * ECMAScript 표준에 따르면, 숫자의 자료형은 배정밀도 64비트 형식 IEEE 754 값 (-(253 -1) 와 253 -1 사이의 숫자값) 단 하나만 존재한다.
    * 정수만을 표현하기 위한 특별한 자료형은 없다.
    * 부동 소수점을 표현할 수 있는 것 말고도, Number 타입은 세 가지 의미있는 몇가지 상징적인 값들도 표현할 수 있다. <br>
    : +무한대, -무한대, NaN(숫자가 아님)
    
* boolean : 논리적인 요소를 나타내고, true와 false의 두 가지 값을 가진다.
* null : Null 타입은 딱 한 가지 값, null 을 가질 수 있다.
* undefined : 값을 할당하지 않은 변수는 undefined 값을 가진다.


### Primitive Type의 변수 복사
각 변수 간에 Primitive Type 데이터를 복사할 경우, <strong>데이터의 값이 복사된다.</strong>

```javascript
var foo = 1;
var bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9
```
<br>

## Reference Type(참조타입)

    

<br>


<br>

<p class="reference-txt">출처 : 
    <a href="https://github.com/airbnb/javascript/tree/es5-deprecated/es5#table-of-contents" target="_blankd">github</a>,
    <a href="https://velog.io/@surim014/JavaScript-Primitive-Type-vs-Reference-Type" target="_blankd">블로그1</a>,
    <a href="https://ryulog.tistory.com/140" target="_blankd">블로그2</a>,
    <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures" target="_blankd">사이트</a>
</p>

--- 
https://github.com/airbnb/javascript/tree/es5-deprecated/es5#table-of-contents <br>
https://velog.io/@surim014/JavaScript-Primitive-Type-vs-Reference-Type <br>
https://ryulog.tistory.com/140<br>
https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures