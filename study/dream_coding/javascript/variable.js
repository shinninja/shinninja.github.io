// Whole-script strict mode syntax
// JavaScript is very flexible 자바스크립트는 매우 유연하다.
// flexible === dangerous
// added ECMAScript S

//======================================================================================================================

// 1. Use strict
// added in ES 5
// use this for valina Javascript.
'use strict';

// ex) 
//a = 6; //'use strict' 가 선언 되어 있다면 에러가 발생한다. 
// 그러므로 var = a; 를 선언 해 줘야 에러가 나지 않는다.

//======================================================================================================================

// 2. Variable
// 변수라고도 얘기하고, 이 변수는 변경될 수 있는 값을 의미한다.
// let (added in ES6) : 변수를 만들때 let이라는 키워드를 이용한다.
let name = 'shinninja';
console.log(name);
name = 'hello';
console.log(name);
// 어플리케이션을 실행하게 되면 어플리케이션마다 쓸 수 있는 메모리가 할당된다. 
// 이 메모리는 텅 비어 있는 박스들이다. 어플리케이션 마다 쓸 수 있는 박스들의 갯수가 제한적으로 할당된다.
// let 이라는 키워드를 통해 'name'이라는 변수를 선언하게 되면, 한 가지의 박스를 가리키게 되는 포인터가 생기게 된다.
// 그래서 'name'이라는 변수가 가리키고 있는 메모리 어딘가에 'shinninja'라는 값을 저장할 수 있다. 
// 그리고 추후에 'name'에 변수가 가리키고 있는 곳에 다른 값을 넣어서 저장할 수 있다.


// Block scope
{
    let name = 'shinninja';
    console.log(name);
    name = 'hello';
    console.log(name); 
}
// 괄호{} 즉 block을 이용해서 코드를 block안에 작성하게 되면, block 밖에서는 block 안에 있는 내용들을 볼 수 없게된다.
// console를 통해서 name 을 부르게 되면(console.log(name);) 아무 값도 나오지 않는다.

// Global scope (전역변수)
// - block을 쓰지 않고, 파일 안에 바로 정의해서 쓰는 변수
// - 어느곳에서나 접근이 가능하다.
// - 어플리케이션이 실행되는 순간부터 끝날때까지 항상 메모리에 탑재되어 있기 때문에 최소한으로 사용하는것이 좋다.
// - 가능하면 Class, Function, if 등 필요한 부분에서 정의해서 사용하는것이 좋다.

// var (don't ever use this!)
// 1. hoisting(끌어올려주다) : 어디에 선언했는지 상관없이 항상 젤 위로 선언을 끌어올려주는 것(move declaration from bottom to top)
// 대부분 프로그램언어에서는 변수를 선언하고 나서 값을 할당하는게 정상적인데,
// javascript var 는 선언하기 전에 값을 먼저 할당한다.
// 값을 할당하기 전에도 출력할 수 있다.
console.log(age);  // undefined (변수는 정의 되어 있지만, 값이 아직 안 들어왔다는 뜻)
age = 4;
console.log(age); // 4
var age;

// let을 이용해 똑같이 한다면 let을 선언하기도 전에 값을 넣었다는 에러가 발생한다. 하지만 이게 정상적이다.
//name = 4;
//let name; // Uncaught SyntaxError: Identifier 'name' has already been declared

// 2. has no block scope
// 아무리 깊은곳에 변수를 선언해도 어디에서 출력할 수 있다.
{
    age = 4;
    var age;
}
console.log(age); // 4

// IE에서는 let을 지원하지 않기 때문에 IE를 무시하거나, babel을 이용해서 es5,4로 컴파일해서 사용한다.

//======================================================================================================================

// 3. Constants
// 한 번 할당하면 값이 절대 바뀌지 않는다.
// favor immutable data type always for a few reasons : 
// - security (보안상의 이유)
// - thread safety (다양한 thread 들이 동시에 값을 변경하는 것을 방지)
// - reduce human mistakes (다른 사람이 변경할 때, 실수 방지)

// * Mutable data type(값이 계속 변경될 수 있는 데이터 타입) === let
// * Immutable data type(값을 변경 할 수 없는 데이터 타입) === const

const daysInweek = 7;
const maxNumber = 5;

//======================================================================================================================

// 4. Variable types
// - primitive types (더이상 나눠질 수 없는 한 가지의 아이템 타입(single item)) : number, string, boolean, null, undefinedn, symbol
// - object types (single item 들을 여러개 묶어서 한 단위로 관리할 수 있게 해준다.(box container)) 
// - function, first-class function (function도 다른 데이터 타입처럼 변수에 할당이 가능하고, 인자로도 전달이 가능, 함수에 리턴타입으로 function를 리턴할 수 있다.)

// 자바스크립트에서는 정수나, 소수점 상관없이 number type으로 할당이 된다.
const count = 17; // integet(정수)
const size = 17.1; // decimal number(소수점)
console.log(`value: ${count}, type: ${typeof count}`);
console.log(`value: ${size}, type: ${typeof size}`);
console.log('value: ' + count);

// number 에서도 조금 특별한 값이 미리 정해져있다.
// number - speicla numeric values : infinity, -infinity, NaN
const infinity = 1 / 0; // 숫자를 0으로 나누면 무한대
const negativeInfinity = -1 /0;
const nAn = 'not a number' / 2; // 숫자가 아닌 문자를 숫자로 나누게 되면 NaN값이 출력된다.
console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);

// bigInt (fairly new, don't use it yet)
const bigInt = 1234567890123456789012345678901234567890n; // 숫자 마지막에 n을 붙여주면 bigInt로 인식한다. // over (-2**53) ~ 2*53)
console.log(`value: ${bigInt}, type: $(typeof bigInt)`);
Number.MAX_SAFE_INTEGER;

// string
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello ' + brendan;
console.log(`value: ${greeting}, type: ${typeof greeting}`);
const helloBob = `hi ${brendan}!`; // templete literals (string)
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);

// boolean
// false 값: 0, null, undefinded, NaN, ''
// true 값: 어떤 모든 값들(any other value)
const canRead = true;
const test = 3 < 1; //false
console.log(`value: ${canRead}, type: ${typeof canRead}`);
console.log(`value: ${test}, type: ${typeof test}`);

// null
// null이라고 할당하는 이유는 비어있는 상태를 만드는 것이다.
let nothing = null;
console.log(`value: ${nothing}, type: ${typeof nothing}`);

// undefined
// 선언이 되어있지만, 아무 값도 지정되어 있지 않은 상태
let x;
console.log(`value: ${x}, type: ${typeof x}`);

// symbol, create unique identifiers for objects
// 맵이나 다른 자료구조에서 고유한 식별자가 필요하거나 동시다발적인 코드에서 우선순위를 주고 싶을때 사용한다.
// 간혹 식별자를 string을 사용하는 경우도 있는데, string은 다른 모듈이나 다른 파일에서 동일한 string을 썼을때, 동일한 식별자로 간주한다.
// 하지만, symbol은 아래와 같이 동일한 값을 썼지만, 다른 경우이다.
// symbol은 동일한 string을 썼어도 다른 symbol로 만들어지기 때문에 고유한 식별자를 만들때 사용된다.
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2); // 두 symbol이 동일한지 아닌지 확인하는 방법

// 동일한 symbol을 만들고 싶을때는 for를 사용한다.
const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2); 
console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`); 
// symbol을 바로 출력하게 되면, 에러가 발생한다.
// .description을 이용해서 string으로 변환해서 출력해야 한다.

// object, real-life object, data structure
// object : 우리가 일상생활에서 보는 물건과 물체들을 대표하는 박스 형태
const ellie = {name: 'ellie', age: 20};
// ellie는 const로 선언이 되어있어서 한 번 할당된 object({name: 'ellie', age: 20})는 다른 object로 변경할 수 없다.
ellie.age = 21; // 하지만 ellie object안에는 name과 age라는 변수들이 존재해서 점 점근자를 이용해 각각 포인트가 가리키고 있는 메모리에 다른 값으로 할당이 가능하다.


//======================================================================================================================

// 5. Dynamic typing: dynamically typed language
let text = 'hello';
// 처음에는 sting 타입이여서 index의 0번째인 h가 출력이 된다.
console.log(text.charAt(0)); //h
console.log(`value: ${text}, type: ${typeof text}`);
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
text = '7' + 5;
console.log(`value: ${text}, type: ${typeof text}`);
text = '8' / '2';
console.log(`value: ${text}, type: ${typeof text}`);
// 나중에 누군가가 number로 타입을 바꿨을 경우, 아래와 같이 index의 값을 호출하면 에러가 발생한다.
console.log(text.charAt(0));

// 자바스크립트는 선언할때 어떤 타입인지 선언하지 않고, 프로그래밍이 동작할때 할당된 값에 따라서 타입이 변경될 수 있다.
// 그래서 이런 문제를 해결하고자 Typescript(TS)가 나왔다.
// Typescript(TS)는 javascript 위에 type이 더 올려진 언어이다.
// Typescript를 쓰게 되면 BABel을 통해 브라우저가 이해할 수 있도록 컴파일을 해야 한다.

