document.addEventListener('DOMContentLoaded', function() {

    let TODO_ITEMS = [];

    let todoList = document.querySelector('ol');
    let noTodoListTitle = document.querySelector('h3');
    let total_of_done_items = document.getElementById('done-items');
    let TOTAL_OF_DONE_ITEMS = 0;
    let inputElement = document.querySelector('input[type="text"]');

    let removeTodoForm = document.querySelector('form#delete-todo');
   
    /*/////////////// reconstruct the todo list ///////////////// */
        reconstructLiElements();
    /*/////////////////////////////////////////////////////////// */ 

    removeTodoForm.style.display = todoList.children.length == 0 ? 'none' : 'display';


    noTodoListTitle.innerText = `The todo items are: ${TOTAL_OF_DONE_ITEMS}`;

    // remove todo
    removeTodoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let indxToDelete = document.querySelector('#index-delete');

        try {   
            let liToDelete = todoList.children[indxToDelete.value - 1];

            if (liToDelete.style['text-decoration'] == "line-through") {
                TOTAL_OF_DONE_ITEMS--;
                total_of_done_items.innerText = `Finished Items : ${TOTAL_OF_DONE_ITEMS}`;
            }
                    
            /*//////// remove the todo to the localStorage ////////*/
                TODO_ITEMS.splice(liToDelete.getAttribute('id'), 1);
                localStorage.setItem('todo', JSON.stringify(TODO_ITEMS));
            /*//////////////////////////////////////////////// */ 

            todoList.removeChild(liToDelete);

            // reset the id of elements
            for (let i = 0; i < todoList.children.length; i++) {
                todoList.children[i].setAttribute('id', i);
            }
                    
            if (todoList.children.length == 0) {
               removeTodoForm.style.display = "none";
            }
        } catch(e) {
            alert('choose a valid todo index');
        }
       
        noTodoListTitle.innerText = `The todo items are: ${todoList.children.length}`;
    });

    // add todo
    document.querySelector('form#add-todo').addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        if (inputElement.value != "") {
            let liElement = document.createElement('li');
            liElement.setAttribute('id', todoList.children.length);
            liElement.innerText = inputElement.value;
            todoList.appendChild(liElement);

            /*//////// update the todo to the localStorage ////////*/
                TODO_ITEMS.push({
                    ele : 'li',
                    innerText : inputElement.value,
                    style : ''
                });

                localStorage.setItem('todo', JSON.stringify(TODO_ITEMS));
            /*//////////////////////////////////////////////// */   

            inputElement.value = "";

            if (todoList.children.length > 0) {
                removeTodoForm.style.display = 'block';
                document.querySelector('.note').innerText = `For example to delete 
                    \"${todoList.children[0].innerText}\", type in 1. (Make sure the input bellow is selected before hitting enter)`
            }

            // add the event to the li element  
            liElement.addEventListener('click', function(e) {
                if (liElement.style['text-decoration'] == "line-through") {
                    liElement.style['text-decoration'] = "";
                    TOTAL_OF_DONE_ITEMS--;

                    /*//////// update the todo to the localStorage ////////*/
                        TODO_ITEMS[liElement.getAttribute('id')].style = '';
                        localStorage.setItem('todo', JSON.stringify(TODO_ITEMS));
                    /*//////////////////////////////////////////////// */   

                } else {
                    liElement.style['text-decoration'] = "line-through";
                    TOTAL_OF_DONE_ITEMS++;

                    /*//////// update the todo to the localStorage ////////*/
                        TODO_ITEMS[liElement.getAttribute('id')].style = 'line-through';
                        localStorage.setItem('todo', JSON.stringify(TODO_ITEMS));
                    /*//////////////////////////////////////////////// */ 
                }

                total_of_done_items.innerText = `Finished Items : ${TOTAL_OF_DONE_ITEMS}`;
            });
        }   

        noTodoListTitle.innerText = `The todo items are: ${todoList.children.length}`;

    });

    /*//////////// HELPER FUNCTIONS ////////////// */
    function reconstructLiElements() {
        let liElements = JSON.parse(localStorage.getItem('todo'));
        let finisheItems = 0;
        
        if (liElements) {
            TOTAL_OF_DONE_ITEMS = liElements.length;
            TODO_ITEMS = liElements;
            
            for (let i = 0; i < liElements.length; i++) {
                debugger
                let li = document.createElement('li');
                li.setAttribute('id', i);
                li.innerText = liElements[i].innerText;
                li.style['text-decoration'] = liElements[i].style;

                /*/////// add a click event /////// */
                li.addEventListener('click', function(e){

                    debugger

                    if (li.style['text-decoration'] == "line-through") {
                        li.style['text-decoration'] = "";
                        TOTAL_OF_DONE_ITEMS--;

                        /*//////// update the todo to the localStorage ////////*/
                            TODO_ITEMS[li.getAttribute('id')].style = '';
                            localStorage.setItem('todo', JSON.stringify(TODO_ITEMS));
                        /*//////////////////////////////////////////////// */   
                    } else {
                        li.style['text-decoration'] = "line-through";
                        
                        TOTAL_OF_DONE_ITEMS++;

                        /*//////// update the todo to the localStorage ////////*/
                            TODO_ITEMS[li.getAttribute('id')].style = 'line-through';
                            localStorage.setItem('todo', JSON.stringify(TODO_ITEMS));
                        /*//////////////////////////////////////////////// */     
                    }
                });

                todoList.appendChild(li);

                if (liElements[i].style == "line-through") finisheItems++;
            }
        
            total_of_done_items.innerText = `Finished Items : ${finisheItems}`;
        }
    }


});


