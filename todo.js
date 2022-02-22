document.addEventListener('DOMContentLoaded', function() {

    const 
        DATA_BASE = localStorage;

    let todoList = document.querySelector('ol');
    let noTodoListTitle = document.querySelector('h3');
    let total_of_done_items = document.getElementById('done-items');
    let TOTAL_OF_DONE_ITEMS = 0;
    let inputElement = document.querySelector('input[type="text"]');
    
    document.querySelector('form').addEventListener('submit', function(e){
        e.preventDefault(); 
        noTodoListTitle.innerHTML = 'The todo items are: '

        let liElement = document.createElement('li');
        
        liElement.innerHTML = inputElement.value;

        // add the event to the li element  
        liElement.addEventListener('click', function() {
            if (liElement.style['text-decoration'] == "line-through") {
                liElement.style['text-decoration'] = ""
                TOTAL_OF_DONE_ITEMS--;
            } else {
                liElement.style['text-decoration'] = "line-through";
                TOTAL_OF_DONE_ITEMS++;
            }
            total_of_done_items.innerHTML = `Total done items : ${TOTAL_OF_DONE_ITEMS} / ${todoList.children.length}`;
        });

        todoList.appendChild(liElement); 
        inputElement.value = '';
    });

});