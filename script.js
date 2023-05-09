// select Element
const form = document.getElementById("todoform")
const todoInput =document.getElementById("newtodo")
const todosListEl =document.getElementById("todos-list")

let todos = [];
let EditTodoId = -1;

//FORM SUBMIT
form.addEventListener('submit', function(event) {
    event.preventDefault();
    saveTodo();
    renderTodo();

});

//save TO DO
function saveTodo() {
    const todoValue = todoInput.value;
    //check if the todo is empty 
    const isEmpty = todoValue === '';
    //check for duplicate todo
    // if array is empty than this function will not run    //
    const isDuplicate =todos.some( (t) =>
                                    t.value.toUpperCase() === todoValue.toUpperCase()
                                 );
    
    if(isEmpty){
        alert("Todo's input is empty");
     } else if(isDuplicate){  
        alert("Todo input is already");
     }
     else
      {
        if(EditTodoId >=0){
       todos = todos.map((todo,index)=>({
                
                ...todo,
                value:index === EditTodoId ? todoValue: todo.value
            }));
            EditTodoId =-1;
        } 
        else{
                const todo = {
                value: todoValue,
                checked:true,
                color:'#' + Math.floor(Math.random()*16777215).toString(16)
                };
                todos.push(todo);
            }
                //to clear the prev input value on input space
            todoInput.value = '';
            console.log(todos);
     } 
}

//render todo
function renderTodo(){
    //CLEAR ELEMENT BEFORE A RE-RENDER
    todosListEl.innerHTML = '';

    // RENDER TODOS
    todos.forEach((temparg, index) => {
        todosListEl.innerHTML += `
         <div class="todo" id=${index}>
          <i class="bi ${temparg.checked ? 'bi-check-circle-fill' : 'bi-circle' }" 
            style = "color : ${temparg.color}"
            data-action="check"
          ></i> 
          <p class="">${temparg.value}</p>
          <i class="bi bi-pencil-square" data-action="edit" ></i>
          <i class="bi bi-trash" data-action="delete"></i>
        </div>
        `; 
        
        
    });
}

//ADD EVENT LISTENER FOR ALL THE TODOS
todosListEl.addEventListener('click', (event)=>{
    const target = event.target;
    const parentElement = target.parentNode;
    const action = target.dataset.action;
    
    //to know exactly which todo I have clicked now
    if(parentElement.className !=='todo') return ;
    const todo=parentElement;
    const todoId = Number(todo.id);
    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);
    
    //show todo id of clicked todo item
    console.log(todoId,action);

});

//check button toggle on click
function checkTodo(todoId){
    todos =todos.map((todo, index)=>({
        ...todo,
        checked : index === todoId ? !todo.checked : todo.checked
    }));
    renderTodo();
}

//function for edit button 
function editTodo(todoId){
   todoInput.value = todos[todoId].value;
   EditTodoId = todoId;
}

