// Whole-script strict mode syntax
// JavaScript is very flexible 자바스크립트는 매우 유연하다.
// flexible === dangerous
// added ECMAScript S

// 1. Use strict
// added in ES 5
// use this for valina Javascript.
'use strict';

// ex) 
//a = 6; //'use strict' 가 선언 되어 있다면 에러가 발생한다. 
// 그러므로 var = a; 를 선언 해 줘야 에러가 나지 않는다.


// 2. Variable
// 변수라고도 얘기하고, 이 변수는 변경될 수 있는 값을 의미한다.
// let (added in ES6) : 변수를 만들때 let이라는 키워드를 이용한다.
let name = 'shinninja';
console.log(name);
name = 'hello';
console.log(name);
// 어플리케이션을 실행하게 되면 어플리케이션마다 쓸 수 있는 메모리가 할당된다. 
// 이 메모리는 텅 비어 있는 박스들이다. 어플리케이션 마다 쓸 수 있는 박스들의 갯수가 제한적으로 할당된다.
// let 이라는 키워드를 통해 'name'이라는 변수를 정의하게 되면, 한 가지의 박스를 가리키게 되는 포인터가 생기게 된다.
// 그래서 'name'이라는 변수가 가리키고 있는 메모리 어딘가에 'shinninja'라는 값을 저장할 수 있다. 
// 그리고 추후에 'name'에 변수가 가리키고 있는 곳에 다른 값을 넣어서 저장할 수 있다.

// Block scope
{
    let name = 'shinninja';
    console.log(name);
    name = 'hello';
    console.log(name); 
}