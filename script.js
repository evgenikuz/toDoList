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
        addTask(el.taskText);
    }
    // еще раз находим task text и task checkbox (на выходе массивы)
    const labelForCheckbox = document.querySelectorAll('.task__text');
    const taskCheckbox = document.querySelectorAll('.task__checkbox');
    const task = document.querySelectorAll('.task') // task (массив)
    const label = document.querySelectorAll('label')
    // добавляем event listener к каждому пункту списка и стиль checked
    for (let i = 0; i < task.length; i++) {
        label[i].addEventListener('click', function(event) {
            if (event.target.className.contains('custom-checkbox') || event.target.className.contains('task__text')) {
                labelForCheckbox[i].classList.toggle('checked')
                let toCheckId = taskCheckbox[i].getAttribute('id');
                console.log(toCheckId);
                for (obj of localStorageArray) {
                    if (obj.id === +toCheckId) {
                        // т.к. проверка происходит до нажатия, то логика обратная (если checked до нажатия, то !checked после)
                        if(taskCheckbox[i].checked) {
                        // меняем в local storage isChecked у элемента
                            obj.isChecked = false;
                        } else {
                        // меняем в local storage isChecked у элемента
                        obj.isChecked = true;
                        }
                        // записываем в local storage новые данные
                        localStorage.setItem('task', JSON.stringify(localStorageArray));
                    }
                }
            }
        })
    }
// еще раз находим все кнопки-крестики (массив)
    const deleteButton = document.querySelectorAll('.task__delete-btn');
    for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', function() {
        // получаем id удаляемой записи
        let idOfDeletedTask = taskCheckbox[i].getAttribute('id');
        for (obj of localStorageArray) {
            if (obj.id === +idOfDeletedTask) {
                // вырезаем то что удалили
                localStorageArray.splice(localStorageArray.indexOf(obj), 1);
                // задаем новое значение local storage
                localStorage.setItem('task', JSON.stringify(localStorageArray))
            }
        }
        task[i].remove();
        taskCounter--;
        if (taskCounter === 0) {
            tasksList.classList.add('d-none');
            deleteBlock.classList.add('d-none');
            // чистим local storage от пустого массива
            localStorage.clear();
        }
    })
}
    // еще раз объявляем кнопку "Удалить все"
    const deleteAll = document.querySelector('.delete-block__delete-all');
    deleteAll.addEventListener('click', function() {
        // удаляем со страницы все записи
        for (el of task) {
            el.remove();
        }
        taskCounter = 0;
        localStorage.clear();
        tasksList.classList.add('d-none');
        deleteBlock.classList.add('d-none');
    })

    deleteChecked.addEventListener('click', function() {
        for (let i = 0; i < task.length; i++)
        if(taskCheckbox[i].checked) {
            let toDeleteId = taskCheckbox[i].getAttribute('id');
            for(let obj of localStorageArray) {
                if (obj.id === +toDeleteId) {
                    // вырезаем то что удалили
                    localStorageArray.splice(localStorageArray.indexOf(obj), 1);
                    taskCounter--;
                }
                // задаем новое значение local storage
                localStorage.setItem('task', JSON.stringify(localStorageArray))
                task[i].remove()
            }
        }
        if (taskCounter === 0) {
            tasksList.classList.add('d-none');
            deleteBlock.classList.add('d-none');
            // чистим local storage от пустого массива
            localStorage.clear();
        }
    })
}