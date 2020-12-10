
(function (window) {
    'use strict';

    /**
     * TODO 앱 생성자
     *
     * @constructor
     * @param {el} selector
     * @param {options} App options
     */
    function App(el, options) {
        this.index = 0;
        this.elWrap = qs(el);
        this.elList = qs(options.list, this.elWrap);
        this.model = {
            list: []
        };

        var scope = this;
        var elCreate = qs(options.create, this.elWrap);

        function getRow(obj){
        var template = `<li data-id="${obj.id}" class="${obj.completed ? 'completed' : ''}">
                            <div class="view">
                                <input class="toggle" type="checkbox" ${obj.completed}>
                                <label>${obj.title}</label>
                                <button class="destroy"></button>
                            </div>
                        </li>`;
            return template;
        }

        $on(elCreate, 'keyup', function(event){
            if(event.keyCode === 13){
                var obj = {
                    id: ++scope.index,
                    title: this.value,
                    completed: false
                }
                scope.addItem(obj, getRow(obj));
                this.value = '';
            }
        });

        $delegate(this.elList, '.toggle', 'change', function(event){
            let parent = this.closest('li');
            for(var i = 0; i<scope.model.list.length; i++){
                let item = scope.model.list[i];
                if(item.id == parent.dataset.id){
                    item.completed = this.checked;
                    if(this.checked){
                        parent.classList.add("completed");
                    }else{
                        parent.classList.remove("completed");
                    }
                    break;
                }
            }
        });

        $delegate(this.elList, '.destroy', 'click', function(event){
            let parent = this.closest('li');
            let removeId = -1;
            for(var i = 0; i<scope.model.list.length; i++){
                let item = scope.model.list[i];
                if(item.id == parent.dataset.id){
                    removeId = i;
                    break;
                }
            }
            parent.remove();
            scope.model.list.splice(i, 1);
        });
    }

    App.prototype.addItem = function(obj, tmpl){
        this.model.list.push(obj);
        this.elList.innerHTML += tmpl;
    };

    // Export to window
    window.App = App;
})(window);

let todoapp = new App('.todoapp', {create: '.new-todo', list: '.todo-list', complete: '.toggle', delete: '.destroy'});


