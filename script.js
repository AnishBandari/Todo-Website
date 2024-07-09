const textarea = document.querySelector('textarea')
const addBtn = document.getElementById('addBtn')
const todoContainer = document.querySelector('.todoContainer')

const jsConfetti = new JSConfetti();

let todoList = []

function initialLoad() {
    if (!localStorage.getItem('todos')) { return }
    todoList = JSON.parse(localStorage.getItem('todos')).todoList
    updateUI()
}

initialLoad()

function addTodo() {
    const todo = textarea.value
    if (!todo) { return }

    console.log('Added todo: ', todo)
    todoList.push(todo)
    textarea.value = '' // resets to empty
    updateUI()
}

function editTodo(index) {
    textarea.value = todoList[index]
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false }
        return true
    })
    updateUI()
}

function deleteTodo(index) {
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false }
        return true
    })
    updateUI()
}

function showPositiveMessage() {
    var toast = document.getElementById('toast');

    var messages = [
        "Great job! You’ve successfully completed the task! 👏",
        "Congratulations! Task completed with excellence! 👍",
        "Well done! Your hard work has paid off! 🙌",
        "Awesome work! You finished the task perfectly! 🪄",
        "Fantastic! You've nailed the task! 🔥"
    ];
    
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    toast.innerText = randomMessage;
    toast.className = 'toast show';
    
    setTimeout(function() { toast.className = toast.className.replace('show', ''); }, 4000);
}

function completeTodo(index) {
    console.log("Hello world");
    
    jsConfetti.addConfetti()
    jsConfetti.addConfetti({
        emojis: ['🎉', '🎊', '💥', '✨', '💫', '🥳', '🏆', '👏'],
    }).then(() => jsConfetti.addConfetti())
    
    showPositiveMessage();
    deleteTodo(index);
}



function updateUI() {
    let newInnerHTML = ''

    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `
        <div class="todo">
        <p>${todoElement}</p>
        <div class="checkboxContainer">

        </div>
        <div class="btnContainer">
            <button class="iconBtn" onclick="editTodo(${todoIndex})">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="iconBtn" onclick="deleteTodo(${todoIndex})">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button id="showToastBtn" role="button" class="completeBtn" onclick="completeTodo(${todoIndex})">
            <i class="fa-solid fa-check"></i>
            </button>
        </div>
    </div>
        `
    })

    todoContainer.innerHTML = newInnerHTML

    localStorage.setItem('todos', JSON.stringify({ todoList }))
}

addBtn.addEventListener('click', addTodo)