let todosList = document.getElementById("todo-items");
let submit = document.getElementById("enter");
let del = document.getElementById("del-btn");
let todoValue = document.getElementById("todoText");

//FILTERS THROUGH EXISTING LIST
function filter(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".todo").forEach(function(todo){
        const item = todo.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            todo.style.display = 'flex';
        }else{
            todo.style.display = 'none';
        }
    });
}
document.getElementById("filterTodo").addEventListener("keyup", filter);


//GETS WHAT IS IN LOCAL STORAGE AND DISPLAYS IT
function getLocalStorage(){
    let list;
    if(localStorage.getItem("todos") === null){
        list = [];
    }else{
        list = JSON.parse(localStorage.getItem('todos'));
    }
        list.forEach(function(item){
        let li = document.createElement("li");
        li.setAttribute("class", "todo");
        let liText = document.createTextNode(item);
        li.appendChild(liText);
    
        let delBtn = document.createElement("button");
        li.appendChild(delBtn);
        delBtn.setAttribute("id", "del-btn");
        delBtn.appendChild(document.createTextNode("X"));
        
        todosList.appendChild(li);
        li.appendChild(delBtn); 
    });
}

document.addEventListener('DOMContentLoaded', getLocalStorage);




//CREATES IDEA TO DISPLAY IN TODO
function displayItem(){
    if(todoValue.value === ""){
        document.querySelector('.fillInWarning').style.display = 'block'
        setTimeout(function(){
            document.querySelector('.fillInWarning').style.display = 'none'
        },3000);
    }
        else{
            let li = document.createElement("li");
            li.setAttribute("class", "todo");
            let liText = document.createTextNode(todoValue.value);
            li.appendChild(liText);

            let delBtn = document.createElement("button");
            li.appendChild(delBtn);
        delBtn.setAttribute("id", "del-btn");
        delBtn.appendChild(document.createTextNode("X"));


            todosList.appendChild(li);
            li.appendChild(delBtn); 
            setLocalStorage(todoValue.value);
        }

        todoValue.value = '';
}


//REMOVESS ITEM BY CLICKING RED 'X'
function remove(e){
    if(e.target.id === "del-btn"){
        let li = e.target.parentElement;
        todosList.removeChild(li);
        removeLocalStorage(li);
    };
}

//CLEAR BUTTON THAT CLEARS THE ENTIRE LIST
const clear = document.querySelector('.clearBtn');
clear.addEventListener('click', function(){
    todosList.innerHTML = '';
    clearLocalStorage(); 
})


//SETTING LOCALSTORAGE
function setLocalStorage(item){
    let list;
    if(localStorage.getItem("todos") === null){
        list = [];
    }else{
        list = JSON.parse(localStorage.getItem('todos'));
    }

    list.push(item);

    localStorage.setItem("todos", JSON.stringify(list));
}

//REMOVING LOCALSTORAGE
function removeLocalStorage(item) {
    let list;
    if(localStorage.getItem('todos') === null){
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem('todos'));
    }
  

    //  THE "X" IS THERE NEXT TO TASK CUZ TEXT CONTENT INCLUDES 'X' IN APPEND LI IN DISPLAY();
    
    list.forEach(function(task, index){
      if(item.textContent === task + "X"){
        list.splice(index, 1);
      }
    });
  
    localStorage.setItem('todos', JSON.stringify(list));
  }

  function clearLocalStorage() {
    localStorage.clear();
  }


todosList.addEventListener("click", remove);
submit.addEventListener("click",function() {displayItem();});