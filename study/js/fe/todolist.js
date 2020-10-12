'use strict';

/************************************************************ 
*  STEP3. 재활용 가능하게 만들기
************************************************************/
var TodoList = (function (){
    
});

new TodoList({
    container: $('.accordion_list')
});

// function Person(name) {
//     this.name = name;
// }
  
// // 프로토타입 객체에 메소드 정의
// Person.prototype.setName = function (name) {
//     this.name = name;
// };

// var Parent = (function () {
//     // Constructor
//     function Parent(name) {
//       this.name = name;
//     }
  
//     // method
//     Parent.prototype.sayHi = function () {
//       console.log('Hi! ' + this.name);
//     };
  
//     // return constructor
//     return Parent;
// }());

/************************************************************ 
*  STEP2. 객체화 시키기
************************************************************/
// var TodoList = function(props){
//     const todoInput = document.getElementById('todoInput');
//     let cnt = 0;
//     let todoList = document.querySelector('#todoList');
//     let completeFlag = false;
//     this.model = {
//         list: []
//     };

//     var scope = this;

//     function evtKeyup(event){
//         if(event.keyCode == 13){
//             var obj = {
//                 value: todoInput.value,
//                 index: cnt++,
//                 complete: completeFlag
//             }
//             pushModelList(obj);
//             createList(obj);
//         }
//     }

//     function createList(obj){
//         const template = `<li data-index=${obj.index}>
//                             <input type="checkbox" name="todolistCheck" id="todolistCheck${obj.index}" onchange="runApp.action.checkValidation(this);">
//                             <label for="todolistCheck${obj.index}">${obj.value}</label>
//                             <button type="button" class="btn_del" onclick="runApp.action.delTodoList(this);"><span>삭제</span></button>
//                         </li>`;

//         todoList.innerHTML += template; 
//         todoInput.value = '';

//     }

//     function pushModelList(obj){
//         scope.model.list.push(obj);
//     }

//     function delTodoList(pram){
//         pram.closest('li').remove();
//     }

//     function checkValidation(pram) {
//         let target = pram;
//         let elItem = target.parentElement;

//         for(var i=0; i<scope.model.list.length; i++){
//             let modelItem = scope.model.list[i];
//             if(modelItem.index == elItem.dataset.index){
//                 // console.log(target.checked);
//                 modelItem.complete = target.checked;

//                 if(target.checked){
//                     elItem.classList.add('completed');
//                 } else {
//                     elItem.classList.remove('completed');
//                 }
//             }

//         }

//     }

//     this.action = {
//         evtKeyup: evtKeyup,
//         delTodoList: delTodoList,
//         checkValidation: checkValidation
//     }
// }
// let runApp = new TodoList('#todoList');





/************************************************************ 
*  STEP1. 우선 대는대로 기능 만들기
************************************************************/

// let cnt = 0;
// const todoInput = document.getElementById('todoInput');
// const todoList = document.getElementById('todoList');

// function enterKey(){
//     let inputValue = todoInput.value;
//     let str = '';

//     if(window.event.keyCode == 13){
//         cnt++;

//         str += '<li>';
//         str +=   '<input type="checkbox" name="todolistCheck" id="todolistCheck' + cnt + '">';
//         str +=   '<label for="todolistCheck' + cnt + '">' + inputValue + '</label>';
//         str +=   '<button type="button" class="btn_del" onclick="delTodoList(this);"><span>삭제</span></button>';
//         str += '</li>';

//         todoList.innerHTML += str; 
//         todoInput.value='';

//         validationCheck();
//     }
// }

// function delTodoList(pram){
//     pram.closest('li').remove();
// }

// function validationCheck() {
//     todoList.addEventListener("click", e => { //delegate
//         let target = e.target;
//         if(target.checked){
//             e.target.parentElement.classList.add('completed');
//             // e.target.parentElement.className = 'completed';
//         } else {
//             e.target.parentElement.classList.remove('completed');
//         }
//     });
// }
