'use strict';
/************************************************************
* OOP 작성방법
1. 클래스 기반
2. 프로토타입 기반 
* 객체생성 방법 : 객체 리터럴, Object() 생성자 함수, 생성자 함수
************************************************************/

/************************************************************ 
*  STEP3. 재활용 가능하게 만들기 
참고: https://poiemaweb.com/js-object-oriented-programming
    : https://codesandbox.io/s/mashup-todolist-fwv17?fontsize=14
************************************************************/
function TodoList(el, props){
    this.todoInput = document.getElementById(el);
    this.todoList = document.getElementById(props);
    this.todoCnt = document.querySelector('.todoCnt');
    this.index = 0;
    this.itemSize = 0;
    this.model = {
        list: []
    }
    this.init();
}

TodoList.prototype.init = function(){
    this.getDate();
    this.initEvt();
}

TodoList.prototype.initEvt = function(){
    var obj = {}

    // console.log(this , scope);

    this.todoInput.addEventListener('keyup', e => {
        if(e.keyCode == 13){
            obj = {
                value: todoInput.value,
                index: this.index++,
                complete: false
            }

            todoInput.value = '';

            this.itemSize = this.todoList.childElementCount + 1; // li갯수 구하기
            // console.log(this.itemSize);

            this.addItem(obj);
            this.checkValidation(obj);
            this.delTodoList(obj);
            this.setTodoCnt(this.itemSize);
        }
        
    });
}

TodoList.prototype.addItem = function(obj){
    const template = `<li data-index=${obj.index} class="todoItem">
                        <input type="checkbox" name="todolistCheck" id="todolistCheck${obj.index}">
                        <label for="todolistCheck${obj.index}">${obj.value}</label>
                        <button type="button" class="btn_del"><span>삭제</span></button>
                    </li>`;

    this.model.list.push(obj);
    this.todoList.innerHTML += template;
}

TodoList.prototype.checkValidation = function(obj){

    this.todoList.addEventListener('click', e => {
        let todoItem = e.target.closest('.todoItem');
        let completeLength = 0;
        
        if(todoItem.dataset.index == obj.index){

            // class control
            if(e.target.checked){
                todoItem.classList.add('completed');
            } else {
                todoItem.classList.remove('completed');
            }

            // console.log(completeLength);
            completeLength = this.itemSize - this.todoList.querySelectorAll('.completed').length;
            this.setTodoCnt(completeLength);
        }
        
    });
}

TodoList.prototype.delTodoList = function(obj){
    let scope = this;
    let delBtn = this.todoList.getElementsByClassName('btn_del');
    let delLength = 0;
    
    // console.log(this.itemSize, obj.index);

    for(var i=0; i<=this.itemSize-1; i++){
        delBtn[i].addEventListener('click', e => {
            let todoItem = e.target.closest('.todoItem');
            
            todoItem.remove();
            scope.model.list.splice(todoItem.dataset.index, 1);
            
            delLength = this.itemSize--;
            this.setTodoCnt(delLength);
        });
    }
}

TodoList.prototype.setTodoCnt = function(cnt){
    this.todoCnt.innerText = cnt;
}

TodoList.prototype.getDate = function(){
    const date = document.querySelector('.date');

    let appWeek = new Array('월', '화', '수', '목', '금', '토', '일');
    let appToday = new Date();
    let appYear = appToday.getFullYear();
    let appMonth = appToday.getMonth() + 1; // 0 부터 시작 (0 == 1월)
    let appDate = appToday.getDate();
    let appDay = appWeek[appToday.getDay()];
    let getToday = `${appYear}년 ${appMonth}월 ${appDate}일 ${appDay}요일`;

    date.innerText = getToday;
}  

let appTodo = new TodoList('todoInput' , 'todoList');


/************************************************************ 
*  STEP2. 클래스화 시키기
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
