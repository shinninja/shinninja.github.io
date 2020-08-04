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
변수에 있는 값이 복사되어 다른 변수에 저장되는 것을 의미한다. 즉 메모리에 있는 값을 복사하는 형대이다.

### Primitive Type의 종류
* string : 텍스트 데이터를 나타내는데 사용한다.
* number
    * ECMAScript 표준에 따르면, 숫자의 자료형은 배정밀도 64비트 형식 IEEE 754 값 (-(253 -1) 와 253 -1 사이의 숫자값) 단 하나만 존재한다.
    * 정수만을 표현하기 위한 특별한 자료형은 없다.
    * 부동 소수점을 표현할 수 있는 것 말고도, Number 타입은 세 가지 의미있는 몇가지 상징적인 값들도 표현할 수 있다. 
        * +무한대, -무한대, NaN(숫자가 아님)

* boolean : 논리적인 요소를 나타내고, true와 false의 두 가지 값을 가진다.
* null : Null 타입은 딱 한 가지 값, null 을 가질 수 있다.
* undefined : 값을 할당하지 않은 변수는 undefined 값을 가진다.

<br>

```javascript
var foo = 1;
var bar = foo;

foo = 9;

console.log(foo, bar); // => 9, 1
```

위 예제에서 보면 변수 bar 에는 number 데이터 값 1이 들어 있는 변수 foo가 들어있다.
변수 foo의 값을 9로 바꾸면 변수 foo가 들어있는 변수 bar 또한 9로 바뀐다고 생각할 수 있다.
하지만 결과 값을 보면 bar는 9가 아닌 1을 가지고 있다.

이와 같은 결과 값이 나오는 이유는 Primitive Type은 데이터를 복사하여 전달하기 때문에 원본 데이터가 변경되었다고 해서 복사된 데이터에 영향을 받지 않기 때문이다.

<br>

## Reference Type(참조타입)
Object 형식의 타입이며, 메모리의 주소를 가리킨다.

### Reference Type의 종류
* Object(객체)
    

* Array(배열)
    * 데이터의 순서 있는 목록으로 리스트와 비슷한 객체이다.
    * 타입의 구애를 받지 않는다.
    * 길이와 요소의 자료형은 고정되어 있지 않다.
    * 동적으로 크기를 조절하기 때문에 데이터를 추가 하면 자동으로 커진다.

* Function
    javascript에서 함수는 객체이다. 모든 함수는 Function타입의 인스턴스이며, 프로퍼티와 메서드가 존재한다.
    함수란 어떤 특정 작업을 수행하기 위해 필요한 일련의 구문(알고리즘, 로직)들을 그룹화하기 위한 개념이다.

<br>


<br>

<p class="reference-txt">출처 : 
    <a href="https://github.com/airbnb/javascript/tree/es5-deprecated/es5#table-of-contents" target="_blankd">github</a>,
    <a href="https://velog.io/@surim014/JavaScript-Primitive-Type-vs-Reference-Type" target="_blankd">블로그1</a>,
    <a href="https://ryulog.tistory.com/140" target="_blankd">블로그2</a>,
    <a href="https://m.blog.naver.com/PostView.nhn?blogId=gi_balja&logNo=221137914754&proxyReferer=https:%2F%2Fwww.google.com%2F" target="_blankd">블로그3</a>,
    <a href="https://velog.io/@recordboy/자료형참조-타입" target="_blankd">블로그4</a>,
    <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures" target="_blankd">사이트</a>
</p>

--- 
https://github.com/airbnb/javascript/tree/es5-deprecated/es5#table-of-contents <br>
https://velog.io/@surim014/JavaScript-Primitive-Type-vs-Reference-Type <br>
https://ryulog.tistory.com/140<br>
https://m.blog.naver.com/PostView.nhn?blogId=gi_balja&logNo=221137914754&proxyReferer=https:%2F%2Fwww.google.com%2F<br>
https://velog.io/@recordboy/자료형참조-타입<br>
https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures