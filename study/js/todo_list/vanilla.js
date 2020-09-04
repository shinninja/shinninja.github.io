let cnt = 0;
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

function enterKey(){
    let inputValue = todoInput.value;
    let str = '';

    if(window.event.keyCode == 13){
        cnt++;

        str += '<li>';
        str +=   '<input type="checkbox" name="todolistCheck" id="todolistCheck' + cnt + '">';
        str +=   '<label for="todolistCheck' + cnt + '">' + inputValue + '</label>';
        str +=   '<button type="button" class="btn_del" onclick="delTodoList(this);"><span>삭제</span></button>';
        str += '</li>';

        todoList.innerHTML += str; 
        todoInput.value='';

        validationCheck();
    }
}

function delTodoList(pram){
    pram.closest('li').remove();
}

function validationCheck() {
    todoList.addEventListener("click", e => { //delegate
        let target = e.target;
        if(target.checked){
            e.target.parentElement.classList.add('completed');
            // e.target.parentElement.className = 'completed';
        } else {
            e.target.parentElement.classList.remove('completed');
        }
    });
}
