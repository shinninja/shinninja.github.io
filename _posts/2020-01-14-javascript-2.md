---
layout: post
title: "JavaScript [2] - arguments란?(1/2)"
description: ""
date: 2020-01-14
tags: [javascript]
comments: true
share: true
---

## arguments란?

* arguments(인자) : 변수에 들어가는 값
* parameter(매개변수) : 변수

```javascript
<script>
	function test(arg) { //arg == parameter(매개변수)
    }
    test(1); //1 == arguments(인자)
</script>
```

```javascript
<script>
function sum(){
    var i, _sum = 0;
    for(i = 0; i < arguments.length; i++){
        document.write(i+' : '+arguments[i]+'<br />'); // document.write == 화면에 무언가를 출력하는 함수
        _sum += arguments[i]; // += == a=a+1 즉 a의 값에 1을 더하고, 그 결과를 다시 a에 넣는다는 뜻
    }   
    return _sum;
}
document.write('result : ' + sum(1,2,3,4));
</script>
```

[ 실행결과 ]
<script>
function sum(){
    var i, _sum = 0;
    for(i = 0; i < arguments.length; i++){
        document.write(i+' : '+arguments[i]+'<br />'); 
        _sum += arguments[i]; 
    }   
    return _sum;
}
document.write('result : ' + sum(1,2,3,4));
</script>

* 위 코드에서 arguments는 약속되어있는 유사 배열이 담긴다. <br>
  arguments안에는 사용자가 전달하는 인자값들이 들어있다. <br>
  그래서 arguments객체를 이용해서 사용자가 전달하는 인자에 접근할 수 있는 기능을 제공한다. <br>
  arguments는 배열과 유사한 사용법을 가지고 있기 때문에 <mark>arguments.length</mark> 라고 하면 <mark>sum(1,2,3,4)에서 sum함수에 전달된 인자들(1,2,3,4)의 갯수를 알 수있다.</mark> 그러므로 arguments.length 의 값은 4가 나온다.


--- 
