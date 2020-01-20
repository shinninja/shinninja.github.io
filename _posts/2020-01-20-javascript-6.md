---
layout: post
title: "[JS] 객체지향 프로그래밍"
description: ""
date: 2020-01-20
tags: [javascript, 객체, 객체지향프로그래밍]
comments: true
share: true
---

## 객체지향 프로그래밍 (Object Oriented Programming)
* 서로 연관되어있는 값과 연관되어있는 데이터와 연관되어있는 어떤 처리를 하나의 그릇안에 모아서 그룹해놓은 프로그래밍 스타일

<br>

```javascript
var grades = {
    'list' : {'shinninja': 10, 'k8805': 6, 'sorialgi': 80} // 'grades'라는 객체 안에 'list'라는 객체를 또 생성했다.
    'show' : function(){ // 함수를 담을 수도 있다.
        console.log('Hello world');
    }
};

console.log(grades['list']); // 결과값 : {'shinninja': 10, 'k8805': 6, 'sorialgi': 80}
console.log(grades['list']['shinninja']); // 결과값 : 10
console.log(grades['show']());
grades['show']();
```

<br>

### this

```javascript
var grades = {
    'list' : {'shinninja': 10, 'k8805': 6, 'sorialgi': 80}, // 'grades'라는 객체 안에 'list'라는 객체를 또 생성했다.
    'show' : function(){ // 함수를 담을 수도 있다.
        console.log('Hello world');
    }
};

console.log(grades['list']); // 결과값 : {'shinninja': 10, 'k8805': 6, 'sorialgi': 80}
console.log(grades['list']['shinninja']); // 결과값 : 10
console.log(grades['show']());
grades['show']();
```

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

<!-- ### 객체지향의 5원칙(SOLID) -->






<p class="reference-txt">참고 : 
    <a href="https://www.youtube.com/watch?v=Mi33-EcMn48&feature=emb_logo" target="_blankd">생활코딩</a>,
    <a href="https://jeong-pro.tistory.com/95" target="_blankd">블로그</a>
</p>

--- 