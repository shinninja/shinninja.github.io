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

* 컴퓨터 과학에서 객체는 식별자로 참조할 수 있는, 메모리에 있는 값이다.
* 배열과 유사한 역할을 한다.
* 배열 : 연관되어 있는 데이터들을 담아내기 위한 일종의 '그릇'이다.
* javascript에서 객체는 속성명(key), 값(value) 형태의 속성(property)들을 담고있는 가방(collection)으로 볼 수 있다.
* 객체의 속성 값은 객체를 포함해 어떠한 자료형도 될 수 있고, 그 덕분에 복잡한 데이터 구조를 형성하는게 가능해진다.

<br>

### 배열과 차이점

* 배열 : index의 값을 숫자로 지정한다.
* 객체 : index의 값을 숫자뿐만 아니라 문자등 index의 값으로 원하는 데이터를 지정을 할 수가 있다.

<br>

### 객체 생성1. 리터럴 방식

#### 사용법
* 객체는 중괄호{}안에 프로퍼티(속성)와 값(value)을 입력해서 객체를 생성할 수 있다. 이 선언 방식을 객체 리터럴 방식이라고 한다.
* 하나의 객체 안에 여러가지 프로퍼티와 값들을 정의할 수 있다.
* 함수도 객체이기 때문에 프로퍼티로 사용가능하고, 또 하나의 객체 리터럴 방식으로도 정의할 수 있다.
* 배열처럼 대괄호([])로 접근하려면 프로퍼티를 ''("")안에 작성한다.

```javascript
var obj = {
   property_1 : 'value_1', // 문자열
   property_2 : 20, // 숫자
   property_func : function(){ // 함수
      return null;
   },
   property_data : { // 객체
      property_data_1 : 1,
      property_data_2 : 2,
   }
}

// 객체의 프로퍼티에 접근 하는 방법1
console.log(obj.property_1); // 'value_1'
console.log(obj.property_2); // 20
console.log(obj.property_func()); // null
console.log(obj.property_data.property_data_1); // 1
console.log(obj.property_data.property_data_2); // 2

// 객체의 프로퍼티에 접근 하는 방법2
console.log(obj["property_1"]); // 'value_1'
console.log(obj["property_2"]); // 20
console.log(obj["property_func"]); // null
console.log(obj["property_data[property_data_1]"]); // 1
console.log(obj["property_data[property_data_2]"]); // 2
```

<br>

```javascript
var grades = {'shinninja-1': 10, 'sorialgi': 80};

// 객체의 프로퍼티에 접근 하는 방법2
console.log(grades['shinninja-1']); // 10
console.log(grades['sori' + 'algi']); //문자열이기 때문에 이렇게 해도 같은 결과값이 나온다.
```
* 하이픈(-)은 프로퍼티로 정의 할 수 없으나, 사용해야 할 경우 ''("")를 사용하면 정의 할 수 있다.

<br>

### 객체 생성2. Object 생성자 함수 방식
* javascript에서 지원하는 기본 객체 생성자인 Object() 생성자를 이용하는 방법이다.
* obj에는 빈 객체를 먼저 대입하고, 프로퍼티를 추가한다.

```javascript
var obj = new Object();

obj.property1 = 'value_1';
obj.property2 = 20;
```

<br>

### 객체 생성3. 사용자 정의 생성자 함수 방식
* 사용자가 직접 생성자 함수를 정의하여 그 함수를 이용해 객체를 생성하는 방법이다.

```javascript
// 생성자 함수
function Obj(property1, property2){
   this.property1 = property1;
   this.property2 = property2;
}

// 객체 생성
var obj1 = new Obj("string", 0);
var obj2 = new Obj("string2", 1);
```
* 인스턴스를 생성하여 객체를 생성한다.
* 리터럴 방식과는 다르게 객체를 생성할 때마다 인자값을 변경할 수 있다.
* 만들어진 obj1과 obj2에 연결연산자(.)를 이용해서 접근하고, 각각의 프로퍼티를 사용할 수 있다.

<br>

<p class="reference-txt">출처 : 
    <a href="https://webcoding.tistory.com/entry/JavaScript-자바스크립트-객체-생성-방법" target="_blankd">블로그1</a>,
    <a href="https://opentutorials.org/module/3989/26098" target="_blankd">블로그2</a>
</p>
--- 
