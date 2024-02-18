let taskInput = document.querySelector('.input-form');
let form = document.querySelector('form');
const tasksList = document.querySelector('.tasks');
const deleteBlock = document.querySelector('.delete-block');
let localStorage = window.localStorage;
let taskCounter = 0;
let arr = [];
let list = document.querySelector('.list')

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (taskInput.value) {
        taskInput.classList.remove('error')
        let firstUpperLetter = (str) => str.split('')[0].toUpperCase()+str.slice(1);
        if (taskCounter === 0) {
            tasksList.classList.remove('d-none');
            deleteBlock.classList.remove('d-none');
            addTask(firstUpperLetter(taskInput.value.trim()));
        } else {
            addTask(firstUpperLetter(taskInput.value.trim()));
        }
    } else {
        taskInput.classList.add('error')
    }
})

function addTask(text, isChecked = false) {
    taskCounter++;
    const task = document.createElement('div');
    task.className = "task";
    
    arr.push({taskText: text, id: taskCounter, isChecked: isChecked});
    localStorage.setItem('task', JSON.stringify(arr));

    task.innerHTML = `
    <label>
        <input type="checkbox" class="task__checkbox visually-hidden" id="${taskCounter}">
        <span class="custom-checkbox"></span>
        <p class="task__text">${text}</p>        
    </label>
    <button class="task__delete-btn">❌</button>`
    
    tasksList.append(task)
    taskInput.value = "";
}
// если существует local storage
if(localStorage.task) {
    // открываем список и кнопки удаления
    tasksList.classList.remove('d-none');
    deleteBlock.classList.remove('d-none');
    //превращаем local storage в массив
    let localStorageArray = JSON.parse(localStorage.task.split(','));
    // отображаем список из хранилища local storage
    for(let el of localStorageArray) {
        addTask(el.taskText, el.isChecked);
        if (el.isChecked) {
            document.querySelector('.task__text').classList.add('checked');
            document.querySelector('.task__checkbox').checked = true;
        }
    }
    const task = document.querySelectorAll('.task') // task (массив)
    const taskCheckbox = document.querySelectorAll('.task__checkbox');

    // Check(task, taskCheckbox, localStorageArray)
    // deleteTask(task, taskCheckbox, localStorageArray)
    // deleteAll(task)
}
list.addEventListener('click', function(event) {
    if (event.target.classList.contains('task__checkbox' || 'custom-checkbox' || 'task__text')) {
        toCheckId = event.target.closest('.task').querySelector('.task__checkbox').getAttribute('id');
        event.target.closest('.task').querySelector('.task__text').classList.toggle('checked')
        if (event.target.closest('.task').querySelector('.task__checkbox').checked) {
            checkTask(toCheckId, localStorage);
        } else {
            uncheckTask(toCheckId, localStorage);
        }
    } else if (event.target.classList.contains('task__delete-btn')){
        let id = event.target.closest('.task').querySelector('.task__checkbox').getAttribute('id');
        deleteTask(id, localStorage);
        event.target.closest('.task').remove();
        isLast(localStorage);
    } else if (event.target.classList.contains('delete-block__delete-checked')){
        let checkboxes = document.querySelectorAll('.task__checkbox');
        for (el of checkboxes) {
            if (el.checked) {
             el.closest('.task').remove()
            }
        }
        deleteChecked(localStorage);
        isLast(localStorage);
    } else if (event.target.classList.contains('delete-block__delete-all')){
        let tasks = document.querySelector('.tasks')
        deleteAll(tasks)
    }
})

function checkTask(id, localStorage) {
    let localStorageArray = JSON.parse(localStorage.task.split(','));
    for (obj of localStorageArray) {
        if (obj.id === +id) {
            obj.isChecked = true;
            localStorage.setItem('task', JSON.stringify(localStorageArray))
        }
    }
}
function uncheckTask(id, localStorage) {
    let localStorageArray = JSON.parse(localStorage.task.split(','));
    for (obj of localStorageArray) {
        if (obj.id === +id) {
            obj.isChecked = false;
            localStorage.setItem('task', JSON.stringify(localStorageArray))
        }
    }
}
function deleteTask(id, localStorage) {
    let localStorageArray = JSON.parse(localStorage.task.split(','));
    for (obj of localStorageArray) {
        if (obj.id === +id) {
            localStorageArray.splice(localStorageArray.indexOf(obj), 1)
            localStorage.setItem('task', JSON.stringify(localStorageArray))
        }
    }
}
function isLast(localStorage) {
    let localStorageArray = JSON.parse(localStorage.task.split(','));
    if (localStorageArray.length === 0) {
        tasksList.classList.add('d-none');
        deleteBlock.classList.add('d-none');
        localStorage.clear();
        taskCounter = 0
    }
}
function deleteChecked(localStorage) {
    let localStorageArray = JSON.parse(localStorage.task.split(','));
    let filteredLocalStorageArray = localStorageArray.filter(el => !el.isChecked)
    console.log(filteredLocalStorageArray);
    localStorage.setItem('task', JSON.stringify(filteredLocalStorageArray))
}
function deleteAll(tasks) {
    // удаляем со страницы все записи
    tasks.innerHTML = '';
    taskCounter = 0;
    localStorage.clear();
    arr = [];
    tasksList.classList.add('d-none');
    deleteBlock.classList.add('d-none');
}
