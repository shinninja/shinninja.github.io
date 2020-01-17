---
layout: post
title: "[JS] 객체와 반복문의 조우"
description: ""
date: 2020-01-17
tags: [javascript, 객체]
comments: true
share: true
---


* 배열 : 
   * 저장된 데이터들이 순서를 가지고 있다.
   * 먼저 들어간 것과 나중에 들어간 것이 기록 되어있다.
   * 배열의 저장되어 있는 데이터들을 가져오게 되면 집어 넣었던 순서대로 꺼낼 수 있다.

* 객체 : 
   * 저장된 데이터들이 순서가 없다.
   * key와 value가 쌍으로 저장 되어있다.
   * 저장된 순서는 존재하지 않기 때문에 저장된 데이터들이 순서에 따라서 가져올때 나오지 않을것이다 라는 생각을 갖고 객체를 사용해야 한다.

<br>


### for in 문

```javascript
var grades = {'shinninja': 10, 'k8805': 6, 'sorialgi': 80};
```

위 코드에서 변수 'grades'의 담겨있는 객체의 값을 가지오려면 for in문을 사용해야 한다.
* for in 문 : in을 중심으로 뒤쪽에는 객체가 있고, 앞쪽에는 그 객체의 키값이 들어간다.<br>
              객체 뿐만 아니라 배열에서도 for in문을 사용할 수 있다.
* 'grades' 변수에 담겨있는 값들을 한 개씩 가져와서 'key'에 'key'값을 담는다.

<br>

```javascript
var grades = {'shinninja': 10, 'k8805': 6, 'sorialgi': 80};
for(key in grades){
    console.log(key);
}

//결과
shinninja
k8805
sorialgi
```

이렇게 **console.log(key);**로 가져오면 value값을 가져오는게 아니고 key값을 가져오게 된다.

<br>

```javascript
var grades = {'shinninja': 10, 'k8805': 6, 'sorialgi': 80};
for(key in grades){
    console.log(grades[key]);
}

//결과
10
6
80
```

**console.log(grades[key])**로 가져오면 객체에 저장된 value값을 가져올 수 있다.

<br>

```javascript
var grades = {'shinninja': 10, 'k8805': 6, 'sorialgi': 80};
for(var name in grades) {
    document.write("key : "+name+" value : "+grades[name]+"<br />");
}
```


### 리스트 형식으로 객체의 값 출력해보기.


<ul>
<script>
var grades = {'shinninja': 10, 'k8805': 6, 'sorialgi': 80};
for(var name in grades) {
    document.write("<li>key : "+name+" value : "+grades[name]+"</li>");
}
</script>
</ul>

<p class="reference-txt">참고 : 생활코딩</p>

--- 