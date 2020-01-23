---
layout: post
title: "[JS] 객체지향 프로그래밍"
description: ""
date: 2020-01-20
tags: [javascript, 객체, 객체지향프로그래밍, OOP]
comments: true
share: true
---

## 객체지향 프로그래밍 (Object-Oriented Programming)
객체지향 프로그래밍은 함수들의 집합 혹은 단순한 컴퓨터의 명령어들의 목록이라는 전통적인 절차지향 프로그래밍과는 다른, <mark>여러 개의 독립된 단위, 즉 관계성있는 객체들의 집합</mark>이라는 관점으로 접근하는 소프트웨어 디자인으로 볼 수 있다.<br>
각 객체는 메시지를 받을 수도 있고, 데이터를 처리할 수도 있으며, 또다른 객체에게 메시지를 전달할 수도 있다. 각 객체는 별도의 역할이나 책임을 갖는 작은 독립적인 기계 또는 부품으로 볼 수 있다.<br>

<p class="sub-txt">(서로 연관되어있는 값과 연관되어있는 데이터와 연관되어있는 어떤 처리를 하나의 그릇안에 모아서 그룹해놓은 프로그래밍 스타일)</p>

<br>

[예제]

```javascript
var grades = {
    'list' : {'shinninja': 10, 'k8805': 6, 'sorialgi': 80}, // 'grades'라는 객체 안에 'list'라는 객체를 또 생성했다.
    'show' : function(){ // 함수를 담을 수도 있다.
        console.log('Hello world');
    }
};

console.log(grades['list']); // 객체를 가져오는 방법 (결과값 : {'shinninja': 10, 'k8805': 6, 'sorialgi': 80})
console.log(grades['list']['shinninja']); // key값을 가져오는 방법 (결과값 : 10)
console.log(grades['show']()); // 함수 호출 하는 방법 1
grades['show'](); // 함수 호출 하는 방법 2
grades.show(); // 함수 호출 하는 방법 3
```

<br>

### this

```javascript
var grades = {
    'list' : {'shinninja': 10, 'k8805': 6, 'sorialgi': 80}, 
    'show' : function(){
        console.log(this);
        console.log(this.list); // 결과값 : {shinninja: 10, k8805: 6, sorialgi: 80}
    }
};

grades['show']();

결과값 : object {shinninja: 10, k8805: 6, sorialgi: 80}
```

<mark>this</mark>는 javascript에서 약속 되어 있는 정해져 있는 **변수**다.
위 코드에서의 <mark>this는 **함수(show)가 속해있는 객체(grades)를 가리키는 변수다.</mark>


```javascript
var grades = {
    'list' : {'shinninja': 10, 'k8805': 6, 'sorialgi': 80}, 
    'show' : function(){
        for(var name in this.list){
            console.log(name, this.list[name]);
        }
    }
};

grades.show(); 

결과값    
shinninja 10
k8805 6
sorialgi 80
```

grades라는 객체는 서로 연관되어 있는 list라고 하는 데이터와 show라고 하는 함수를 그룹핑한 그릇이라고 할 수 있다. <br>
이런것들을 객체지향 프로그래밍이라고 한다.

<br>

### 객체지향 프로그래밍의 장, 단점
#### 장점
* 코드 재사용이 용이 : 남이 만든 클래스를 가져와서 이용할 수 있고, 상속을 통해 확장해서 사용할 수 있다.
* 유지보수가 쉬움 : 절차 지향 프로그래밍에서는 코드를 수정해야할 때 일일이 찾아 수정해야하는 반면 객체지향 프로그래밍에서는 수정해야 할 부분이 클래스 내부에 멤버 변수, 혹은 메서드로 있기 때문에 해당 부분만 수정하면 된다.
* 대형 프로젝트에 적합 : 클래스단위로 모듈화시켜서 개발할 수 있으므로 대형 프로젝트처럼 여러명, 여러회사에서 개발이 필요할 시 업무 분담하기 쉽다.

#### 단점
* 처리속도가 상대적으로 느리다.
* 객체가 많으면 용량이 커질 수 있다.
* 설계시 많은 시간과 노력이 필요하다.

<br>

### 객체지향 프로그래밍 키워드 5가지
* 클래스 + 인스턴스(객체)
    * 클래스 : 어떤 문제를 해결하기 위한 데이터를 만들기 위해 추상화를 거쳐 <mark>집단에 속하는 **속성**(attribute)과 **행위**(behavior)를 **변수**와 **메서드**로 정의한 것</mark>
    * 인스턴스(객체) : <mark>클래스에서 정의한 것을 토대로 실제 메모리상에 할당된 것</mark>으로 실제 프로그램에서 사용되는 데이터
* 추상화 : 불필요한 정보는 숨기고 중요한 정보만을 표현함으로써 <mark>공통의 속성이나 기능을 묶어 이름을 붙이는 것</mark>이다.
* 캡슐화 
    * **목적 : 코드를 재수정 없이 재활용하는 것.**
    * 프로그램 코드에서 변수와 함수를 재활용하기에는 분산되어 있기 때문에 재활용이 어려웠으나 캡슐화를 통해 **관련된 기능과 특성을 한 곳에 모으고 분류하기 때문에 재활용이 원활**해졌다.
* 상속
    * 절차 지향 프로그래밍에서도 '라이브러리'를 통해서 남이 짜 놓은 소스 코드를 가져와 사용할 수 있었다.<br>
      하지만 내 의도에 맞게 수정하게되면 다른 라이브러리가 되어 버전에 따라 동작하지 않을 수 있고, 불필요한 코드의 수정작업을 해야 한다는 것이다. 이런 문제를 해결하기 위해 **[상속]**이라는 것을 도입하였다.
    * **상속**은 <mark>부모클래스의 속성과 기능을 토대로 이어받아 사용할 수 있게하고, 기능의 일부분을 변경해야 할 경우 상속받은 자식클래스에서 해당 기능만 다시 수정(정의)하여 사용할 수 있게 하는 것</mark>이다.
    * 다중속성은 불가하다. (클래스의 상속 관계에서 혼란을 줄 수 있기 때문에 상속은 반드시 하나만 가능하고 필요에 따라 인터페이스를 사용할 수 있게 했다.)
* 다형성
    * <mark>하나의 변수명, 함수명 등이 상황에 따라 다른 의미로 해석될 수 있는 것</mark>이다.<br>
      즉 오버라이딩(Overriding), 오버로딩(Overioading)이 가능하다는 얘기다.
    * 오버라이딩 : 부모클래스의 메서드와 같은 이름, 매개변수를 재정의 하는 것.
    * 오버로딩 : 같은 이름의 함수를 여러개 정의하고, 매개변수의 타입과 개수를 다르게 하여 매개변수에 따라 다르게 호출할 수 있게 하는 것.


<!-- ### 객체지향의 5원칙(SOLID) -->






<p class="reference-txt">참고 : 
    <a href="https://www.youtube.com/watch?v=Mi33-EcMn48&feature=emb_logo" target="_blankd">생활코딩</a>, 
    <a href="https://jeong-pro.tistory.com/95" target="_blankd">블로그1</a>,
    <a href="https://poiemaweb.com/js-object-oriented-programming" target="_blankd">블로그2</a>, 
    <a href="https://m.blog.naver.com/PostView.nhn?blogId=ndb796&logNo=221174086835&proxyReferer=https%3A%2F%2Fwww.google.com%2F" target="_blankd">블로그3</a>, 
    <a href="https://preamtree.tistory.com/120" target="_blankd">블로그4</a>, 
    <a href="https://ko.wikipedia.org/wiki/객체_지향_프로그래밍" target="_blankd">위키백과</a>
</p>

--- 