const form = document.querySelector("#form")
const inputForm = document.querySelector("#inputForm")
const todoLists = document.querySelector("#task-list")
const progressBar = document.querySelector("#progressBar")
const progress = document.querySelector("#progress")

document.addEventListener("DOMContentLoaded", loadTasksFromLocalstorage)

function loadTasksFromLocalstorage(){
    const tasks = getTasksFromLocalstorage()
   tasks.forEach(task => {
    addTaskToDom(task)
    progressBarStatus(task)
   });
  
}
form.addEventListener("submit", function(e){
e.preventDefault()
addTasks()

})


function addTasks(){
    const textInput = inputForm.value.trim() 
    console.log(textInput)

    if(textInput){
        const task ={
            id: Date.now(),
            text: textInput,
            completed: false
        }
        addTaskToDom(task)
     
        saveTasksToLocalStorage(task)
        progressBarStatus()
          inputForm.value = ''
    }
}

function addTaskToDom(task){
    const li = document.createElement("li")
    // console.log(li)
    li.className = `todo-Item  ${task.completed ? "completed" : ""}`
         li.dataset.id = task.id
         li.innerHTML = `
         <input class= "checkbox" type= "checkbox" ${task.completed? "checked" : ""}> </input>
                 <span class="task" >${task.text}</span>
                 <button class="editBtn"> <i class="fa-regular fa-pen-to-square"></i></button> 
                <button class="deleteBtn"> <i class="fa-solid fa-trash"></i></button> `
      todoLists.appendChild(li)
      attachListeners(li, task)

}

function attachListeners(li, task){
    const deleteBtn = li.querySelector('.deleteBtn');
    const editBtn= li.querySelector(".editBtn")
    const checkbox= li.querySelector(".checkbox")

    deleteBtn.addEventListener("click", function(){
        handleDelete( task.id, li)
    })

    editBtn.addEventListener("click", function(){
      handleEditBtn(task.id, li)
    })

    // check box add
    checkbox.addEventListener("change", function(){
        console.log(checkbox.checked)
       handlecheckboxcomplition(task.id, li, checkbox.checked)
    })
}

// check box func
function handlecheckboxcomplition(taskId , li , iscompleted){
   
    let tasks = getTasksFromLocalstorage()
  const task   = tasks.find(task => task.id === taskId)
if(task){
    task.completed = iscompleted ;
    localStorage.setItem("tasks", JSON.stringify(tasks))
    li.classList.toggle("completed", iscompleted)
    progressBarStatus()
}

}
// delete 

function handleDelete(id , li){
    let tasks = getTasksFromLocalstorage()
    // console.log("task", task)
 tasks =  tasks.filter(task => task.id != id)
    console.log("taski", tasks)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
    progressBarStatus()
}

// edit btn

function handleEditBtn(id , li){

    let text = li.querySelector(".task")
    console.log("md", text)
   const newText = text.textContent
if(newText !== null && newText.trim() !== ""){
    inputForm.value = newText
    handleDelete(newText, li)
    
    // updateTolacStorage()
 updateTolacStorage(id, li)
   
}


}

// progress
function progressBarStatus (){
   
    const tasks = getTasksFromLocalstorage()
// console.log('text',tasks)
    const completedTask = tasks.filter(task => task.completed).length
    console.log("completed", completedTask)
    const totalTasks = tasks.length
    console.log("total", totalTasks)
    const progresss = (completedTask / totalTasks) * 100;
    console.log("progres", progress)
    progress.style.width = `${progresss}%`
document.getElementById("number").innerHTML = `${completedTask}/${totalTasks}`
if(tasks.length && completedTask === totalTasks){
    blasckCoffeti()
}
    
}



function updateTolacStorage(id , li){
   let tasks =  getTasksFromLocalstorage()
   console.log(tasks)
   tasks = tasks.filter(task => task.id !== id)
   localStorage.setItem("tasks", JSON.stringify(tasks))
   li.remove()
   progressBarStatus()
}

// tosaveLocalStorage

function saveTasksToLocalStorage(task){
    const oldTasks = getTasksFromLocalstorage();
           oldTasks.push(task)
localStorage.setItem("tasks", JSON.stringify(oldTasks))
}

// get tasks from localstorage

function getTasksFromLocalstorage(){
    const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return oldTasks
}

function blasckCoffeti (){
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}