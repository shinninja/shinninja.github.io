var p = new Promise(function(resolve, reject){
    setTimeout(function(){
        var num = Math.round(Math.random()*20);
        var isValid = num % 2;
        if(isValid) { resolve(num); }
        else { reject(num); }
    }, 2000);
});

p.then(function(num){
    console.log('홀수 : ' + num);
}).catch(function(num){
    console.log('짝수 : ' + num);
});

console.log('20까지의 난수중 홀수/짝수?');
console.log('결과는 2초후에 나옵니다.!!');

//Promise 선언
var _promise = function(param){
    return new Promise(function(resolve, reject){
        //비동기를 표현하기 위해 setTimeout 함수를 사용
        window.setTimeout(function(){
            //param is true,
            if (param) { resolve('해결 완료'); }

            //param is false
            else { reject(Error('실패!!')); }

        }, 3000);
    });
};

//Promise 실행
_promise(true)
.then(function(text){
    //성공시
    console.log(text);
}, function(error){
    //실패시
    console.log(error);
});