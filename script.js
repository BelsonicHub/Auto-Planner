document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Cargar tareas desde localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button onclick="deleteTask(${index})">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Agregar tarea
    function addTask() {
        const task = taskInput.value.trim();
        if (task !== '') {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = ''; // Limpiar el input
            loadTasks(); // Recargar la lista de tareas
        }
    }

    // Eliminar tarea
    window.deleteTask = function(index) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks(); // Recargar la lista de tareas
    }

    // Evento para agregar tarea
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Cargar tareas al iniciar la página
    loadTasks();
});
