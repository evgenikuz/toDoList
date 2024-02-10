let submit = document.querySelector('.submit-btn');
let taskInput = document.querySelector('.input-form');
const tasksList = document.querySelector('.tasks');
const deleteBlock = document.querySelector('.delete-block');
let deleteAll = document.querySelector('.delete-block__delete-all');
let deleteChecked = document.querySelector('.delete-block__delete-checked');
let taskCounter = 0;

taskInput.onkeypress = function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (taskInput.value) {
            taskInput.classList.remove('error')
            if (taskCounter === 0) {
                tasksList.classList.remove('d-none');
                deleteBlock.classList.remove('d-none');
                addTask();
            } else {
                addTask();
            }
        } else {
            taskInput.classList.add('error')
        }
    }
}
submit.addEventListener('click', function(e) {
    e.preventDefault();
    if (taskInput.value) {
        taskInput.classList.remove('error')
        if (taskCounter === 0) {
            tasksList.classList.remove('d-none');
            deleteBlock.classList.remove('d-none');
            addTask();
        } else {
            addTask();
        }
    } else {
        taskInput.classList.add('error')
    }
})

function addTask() {
    taskCounter++;
    const task = document.createElement('div');
    task.className = "task";

    const taskCheckbox = document.createElement('input');
    taskCheckbox.className = "task__checkbox";
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.setAttribute("id", taskCounter);

    const labelForCheckbox = document.createElement('label');
    labelForCheckbox.className = "task__text";
    labelForCheckbox.setAttribute("for", taskCounter);
    labelForCheckbox.textContent = taskInput.value;

    const deleteButton = document.createElement('button');
    deleteButton.className = "task__delete-btn";
    deleteButton.textContent = "❌";

    tasksList.append(task)
    task.append(taskCheckbox, labelForCheckbox, deleteButton)
    taskInput.value = "";

    labelForCheckbox.addEventListener('click', function() {
        if(taskCheckbox.checked) {
            labelForCheckbox.classList.add('checked')
        } else {
            labelForCheckbox.classList.remove('checked')
        }
    })
    taskCheckbox.addEventListener('change', function() {
        if(this.checked) {
            labelForCheckbox.classList.add('checked')
        } else {
            labelForCheckbox.classList.remove('checked')
        }
    })


    deleteButton.addEventListener('click', function() {
        task.remove();
        taskCounter--;
        if (taskCounter === 0) {
            tasksList.classList.add('d-none');
            deleteBlock.classList.add('d-none');
        }
    })

    deleteAll.addEventListener('click', function() {
        task.remove();
        taskCounter = 0;
        tasksList.classList.add('d-none');
        deleteBlock.classList.add('d-none');
    })
    deleteChecked.addEventListener('click', function() {
        if(taskCheckbox.checked) {
            task.remove()
        }
    })
}

