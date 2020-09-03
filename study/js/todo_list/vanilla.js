var cnt = 0;

function enterKey(){
    var todoInput = document.getElementById('todoInput');
    var todoList = document.getElementById('todoList');
    var inputValue = todoInput.value;
    var str = '';

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
    var checkNode = document.getElementsByName('todolistCheck');

    for(i=0; i<checkNode.length; i++){
        
        checkNode[i].addEventListener('click', event => {
            if(checkNode[i].checked){
                console.log('checked');
            }  
        });
    }
}