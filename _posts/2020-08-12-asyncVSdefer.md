---
layout: post
title: "[JS] async VS defer"
description: ""
date: 2020-08-12
tags: [Javascript, async, defer]
comments: true
share: true
---

[ html에서 자바스크립트 파일을 불러오는 방법 ]

## 1. head 태그 안에 스크립트를 포함할 경우

<mark>parsing HTML</mark> > <mark>blocked(fetching js, executing js)</mark> > <mark>parsing HTML</mark> > <mark>page is ready</mark>

1) 브라우저는 html코드를 한 줄 한 줄씩 분석하다가 css와 병합해서 dom요소로 변환한다.
2) 한 줄 씩 읽어 나가다가 스크립트 태그를 만나면 이 자바스크립트 파일을 다운받아야 하네? 라고 인식하고, html 파싱하는것을 잠시 멈추고 필요한 자바스크립트 파일을 서버에서 다운받아서 이것을 실행한 다음에 다시 파싱하게 된다.
<br>

* 단점 : 만약 다운받아야 할 js파일이 엄청 크고, 인터넷이 엄청 느리다면 사용자가 웹사이트를 보는데까지 많은 시간이 걸린다.<br>
그래서 이 방법은 별로 좋은 방법이 아니다.

<br>

## 2. body 안 제일 끝부분에 스크립트 추가할 경우
<mark>parsing HTML</mark> > <mark>page is ready</mark> > <mark>fetching js</mark> > <mark>executing js</mark>

브라우저가 html을 다운받아서 쭉 parsing 해서 페이지가 준비가 된 다음에 스크립트 태그를 만나서 스크립트 파일을 서버에서 받아오고(fetching) 실행(executing)하게 된다.

이렇게 하게 되면, 페이지가 사용자들에게 js받기전에도 이미 준비가 되서 사용자가 페이지 컨텐츠를 볼 수 있다.

* 장점 : 사용자가 기본적인 html에 컨텐츠를 빨리 본다.
* 단점 : 만약 웹사이트가 자바스크립트에 의존적이다면 
예를 들어 사용자가 의미있는 컨텐츠를 보기위해서는 자바스크립트를 이용해서 서버에있는 데이터를 받아온다던지 dom요소를 예쁘게 꾸며줘야 한다던지 그런식으로동작하는 웹사이트라면 사용자가 정상적인 페이지를 보기전까지는 스크립트를 받아오는 시간도 기다려야하고, 실행하는 시간도 기다려야 한다는 단점이 있다.

<br>

## 3. head + async
<mark>parsing HTML / fetching js</mark> > <mark>parsing HTML</mark> > <mark>executing js</mark> > <mark>parsing HTM</mark> > <mark>page is ready</mark>

head 태그안에 스크립트 태그를 이용하되, asyn 속성값을 사용한다
asyn은 boolean타입의 속성값이기 때문에 선언만해줘도 true로 설정이 된다.
브라우저가 html을 다운로드 받아서 parsing하다가 asyn를 만나면 병렬로 'js파일을 다운로드 받자' 라고 명령만 해놓고,
다시 파싱하다가 js파일이 다운로드가 완료되면 parsing하는것을 멈추고 다운로드 된 js파일을 실행(executing)하게 된다.
그 다음 나머지 html을 parsing하게 된다.

* 장점 : body 끝에 사용하는 것보다 받아오는게(fetching) parsing하는 동안 병렬적으로 이루어지기 때문에 다운로드 받는 시간을 절약할 수 있다.
<br>
* 단점 : 
    - 자바스크립트가 html이 다 parsing되기도 전에 실행되기때문에 만약 다운받은 js파일에 dom요소를 조작하는 경우가 있으면 조작하려고 하는 시점이 html 우리가 원하는 요소가 아직 정의되어 있지 않을 수도 있다. 그 부분이 좀 위험할 수 있다.

    - html을 parsing하는 동안에 언제든지 자바스크립트를 실행하기위해서 멈출 수 있기 때문에 사용자가 페이지를 보는데 시간이 걸릴 수 있다.

<br>

## 4. head + defer
<mark>parsing HTML / fetching js</mark> > <mark>page is ready</mark> > <mark>executing js</mark>

head 태그안에 스크립트 태그를 이용하되, defer 속성값을 사용한다
브라우저가 html을 다운로드 받아서 parsing하다가 defer를 만나면 'js파일을 다운로드 받자' 라고 명령만 해놓고, 나머지 html을 끝까지 parsing하게 된다. 그리고 마지막에 다운로드 되어진 js파일을 실행하게 된다.

<br>

## 5. async과 defer 차이점
async 옵션으로 다수의 자바스크립트 파일을 다운로드 받게 되면, 먼저 다운로드가 완료된 파일부터 실행하게 된다. 즉, 정의된 스크립트 순서에 상관없이 다운로드가 완료된 순서대로 실행되기 때문에 만약 스크립트 작성 순서에 의존적인 페이지라면 문제가 있다.

defer의 경우 html 파싱하는 동안 필요한 자바스크립트 파일을 다운로드 받은 다음에, 정의된 순서대로 실행하기 때문에 원하는대로 스크립트가 실행이 된다.


<br>

<p class="reference-txt">출처 : 
    <a href="https://www.youtube.com/watch?v=tJieVCgGzhs&feature=share" target="_blankd">youtube</a>
</p>

--- 
