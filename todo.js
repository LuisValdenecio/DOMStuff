document.addEventListener('DOMContentLoaded', function() {

    const TODO_ITEMS = [];

    let todoList = document.querySelector('ol');
    let noTodoListTitle = document.querySelector('h3');
    let total_of_done_items = document.getElementById('done-items');
    let TOTAL_OF_DONE_ITEMS = 0;
    let inputElement = document.querySelector('input[type="text"]');

    let removeTodoForm = document.querySelector('form#delete-todo');
    removeTodoForm.style.display = 'none';

    noTodoListTitle.innerHTML = `The todo items are: ${TOTAL_OF_DONE_ITEMS}`;

    // remove todo
    removeTodoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let indxToDelete = document.querySelector('#index-delete');

        try {
            let liToDelete = todoList.children[indxToDelete.value - 1];
                
            //liToDelete.click();
        
            todoList.removeChild(liToDelete);
                        
            if (todoList.children.length == 0) {
                removeTodoForm.style.display = "none";
            }
        } catch(e) {
            alert('choose a valid todo index');
        }
       
        noTodoListTitle.innerText = `The todo items are: ${todoList.children.length}`;
    });

    // add todo
    document.querySelector('form#add-todo').addEventListener('submit', function(e){
        e.preventDefault(); 
        
        if (inputElement.value != "") {
            let liElement = document.createElement('li');
            liElement.innerHTML = inputElement.value;
            todoList.appendChild(liElement);

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
                } else {
                    liElement.style['text-decoration'] = "line-through";
                    TOTAL_OF_DONE_ITEMS++;
                }

                total_of_done_items.innerText = `Finished Items : ${TOTAL_OF_DONE_ITEMS}`;
            });
        }   

        noTodoListTitle.innerText = `The todo items are: ${todoList.children.length}`;

    });

});
