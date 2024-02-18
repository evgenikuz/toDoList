let taskInput = document.querySelector('.input-form');
let form = document.querySelector('form');
const tasksList = document.querySelector('.tasks');
const deleteBlock = document.querySelector('.delete-block');
let localStorage = window.localStorage;
let taskCounter = 0;
let taskArr = []; // массив с которым работаем, копия того что в local storage
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

function addTask(text, isChecked = false) { //создание заданий
    taskCounter++;
    const task = document.createElement('div');
    task.className = "task";
    
    taskArr.push({taskText: text, id: taskCounter, isChecked: isChecked});
    localStorage.setItem('task', JSON.stringify(taskArr));

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
if(localStorage.task) { // если существует local storage
    // открываем список и кнопки удаления
    tasksList.classList.remove('d-none');
    deleteBlock.classList.remove('d-none');
    // отображаем список из хранилища local storage
    let localStorageArray = JSON.parse(localStorage.task.split(','));
    for(let el of localStorageArray) {
        addTask(el.taskText, el.isChecked);
        if (el.isChecked) { // добавляем отмеченность в случае, если задание было отмечено до обновления
            document.querySelector('.task__text').classList.add('checked');
            document.querySelector('.task__checkbox').checked = true;
        }
    }
}

list.addEventListener('click', function(event) { // слушаем событие клика на весь лист, и дальше определяем где он и включаем функцию
    if (event.target.classList.contains('task__checkbox' || 'custom-checkbox' || 'task__text')) { // если нажали на задание
        toCheckId = event.target.closest('.task').querySelector('.task__checkbox').getAttribute('id');
        event.target.closest('.task').querySelector('.task__text').classList.toggle('checked')
        event.target.closest('.task').querySelector('.task__checkbox').checked ? checkTask(toCheckId, localStorage) : uncheckTask(toCheckId, localStorage); // отмечаем выполненным и не выполненным
    } else if (event.target.classList.contains('task__delete-btn')){ // если нажали на крестик
        let id = event.target.closest('.task').querySelector('.task__checkbox').getAttribute('id');
        deleteTask(id, localStorage);
        event.target.closest('.task').remove(); // удаляем задание
        isLast(localStorage); // проверка на последний элемент в массиве
    } else if (event.target.classList.contains('delete-block__delete-checked')){ // если нажали на удалить завершенные
        let checkboxes = document.querySelectorAll('.task__checkbox');
        for (el of checkboxes) {
            if (el.checked) {
             el.closest('.task').remove()
            }
        }
        deleteChecked(localStorage);
        isLast(localStorage); // проверка на последний элемент в массиве
    } else if (event.target.classList.contains('delete-block__delete-all')){ // если нажали на удалить все
        let tasks = document.querySelector('.tasks')
        deleteAll(tasks)
    }
})

function checkTask(id, localStorage) { // добавляем выполнение
    for (obj of taskArr) {
        if (obj.id === +id) {
            obj.isChecked = true;
            localStorage.setItem('task', JSON.stringify(taskArr))
        }
    }
}
function uncheckTask(id, localStorage) { // снимаем выполнение
    for (obj of taskArr) {
        if (obj.id === +id) {
            obj.isChecked = false;
            localStorage.setItem('task', JSON.stringify(taskArr))
        }
    }
}
function deleteTask(id, localStorage) { // удаляем задание по крестику
    for (obj of taskArr) {
        if (obj.id === +id) {
            taskArr.splice(taskArr.indexOf(obj), 1)
            localStorage.setItem('task', JSON.stringify(taskArr))
        }
    }
}
function isLast(localStorage) { // проверяем, не последний ли это элемент в списке и скрываем кнопки и поле с заданиями
    if (taskArr.length === 0) {
        tasksList.classList.add('d-none');
        deleteBlock.classList.add('d-none');
        localStorage.clear();
        taskCounter = 0
    }
}
function deleteChecked(localStorage) { // фильтруем массив по признаку не "isChecked = true"
    taskArr = taskArr.filter(el => !el.isChecked)
    localStorage.setItem('task', JSON.stringify(taskArr))
}
function deleteAll(tasks) { // удаляем со страницы все записи
    tasks.innerHTML = '';
    taskCounter = 0;
    localStorage.clear();
    taskArr = [];
    tasksList.classList.add('d-none');
    deleteBlock.classList.add('d-none');
}
