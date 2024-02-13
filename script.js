let submit = document.querySelector('.submit-btn');
let taskInput = document.querySelector('.input-form');
let form = document.querySelector('form');
const tasksList = document.querySelector('.tasks');
const deleteBlock = document.querySelector('.delete-block');
let deleteAll = document.querySelector('.delete-block__delete-all');
let deleteChecked = document.querySelector('.delete-block__delete-checked');
let localStorage = window.localStorage;
let taskCounter = 0;
let arr = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (taskInput.value) {
        taskInput.classList.remove('error')
        if (taskCounter === 0) {
            tasksList.classList.remove('d-none');
            deleteBlock.classList.remove('d-none');
            addTask(taskInput.value);
        } else {
            addTask(taskInput.value);
        }
    } else {
        taskInput.classList.add('error')
    }
})

function addTask(text) {
    taskCounter++;
    const task = document.createElement('div');
    task.className = "task";
    
    let firstUpperLetter = (str) => str.split('')[0].toUpperCase()+str.slice(1);
    arr.push({taskText: firstUpperLetter(text.trim()), id: taskCounter, isChecked: false});
    localStorage.setItem('task', JSON.stringify(arr));

    const label = document.createElement('label');
    label.innerHTML = `
    <input type="checkbox" class="task__checkbox visually-hidden" id="${taskCounter}">
    <span class="custom-checkbox"></span>
    <p for="${taskCounter}" class="task__text">${text}</p>        
    `;

    const deleteButton = document.createElement('button');
    deleteButton.className = "task__delete-btn";
    deleteButton.textContent = "❌";

    tasksList.append(task)
    task.append(label, deleteButton);
    taskInput.value = "";

    // const taskCheckbox = document.createElement('input');
    // taskCheckbox.className = "task__checkbox";
    // taskCheckbox.classList.add("visually-hidden");
    // taskCheckbox.setAttribute("type", "checkbox");
    // taskCheckbox.setAttribute("id", taskCounter);

    // const customCheckbox = document.createElement('span');
    // customCheckbox.className = "custom-checkbox";

    // const labelForCheckbox = document.createElement('label');
    // labelForCheckbox.className = "task__text";
    // labelForCheckbox.setAttribute("for", taskCounter);
    // labelForCheckbox.textContent = text;
    // labelForCheckbox.innerHTML = `<span class="custom-checkbox"></span>`

    const labelForCheckbox = document.querySelectorAll('.task__text');
    const taskCheckbox = document.querySelectorAll('.task__checkbox');

    for (let i = 0; i < labelForCheckbox.length; i++) {
        labelForCheckbox[i].addEventListener('click', function() {
            if(taskCheckbox[i].checked) {
                labelForCheckbox[i].classList.toggle('checked')
            } else {
                labelForCheckbox[i].classList.toggle('checked')
            }
        })
    }

    deleteButton.addEventListener('click', function() {
        task.remove();
        // localStorage.removeItem(task)
        taskCounter--;
        if (taskCounter === 0) {
            tasksList.classList.add('d-none');
            deleteBlock.classList.add('d-none');
        }
    })

    deleteAll.addEventListener('click', function() {
        task.remove();
        taskCounter = 0;
        localStorage.clear();
        tasksList.classList.add('d-none');
        deleteBlock.classList.add('d-none');
    })

    deleteChecked.addEventListener('click', function() {
        localStorage.getItem('task');
        if(taskCheckbox.checked) {
            let toDeleteId = taskCheckbox.getAttribute('id');
            let localStorageArray = JSON.parse(localStorage.task.split(','));
            for(let el of localStorageArray) {
// надо как-то найти айди и по нему удалить объект
            }
            localStorage.setItem('task', JSON.stringify(FilteredLocalStorageArray))
            task.remove()
            // taskCounter--;
        }
        // if (!task) {
        //     tasksList.classList.add('d-none');
        //     deleteBlock.classList.add('d-none');
        // }
        // console.log(taskCounter)
        // if (taskCounter == 0) {
        //     tasksList.classList.add('d-none');
        //     deleteBlock.classList.add('d-none');
        // }
    })
}
if(localStorage.task) {
    let localStorageArray = JSON.parse(localStorage.task.split(','));
    if (taskCounter === 0) {
        tasksList.classList.remove('d-none');
        deleteBlock.classList.remove('d-none');
    }
    for(let el of localStorageArray) {
        addTask(el.taskText);
    }
}

