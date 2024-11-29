document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    let editingIndex = -1; // Variable para almacenar el índice de la tarea que se está editando

    // Cargar tareas desde localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button onclick="deleteTask(${index})">Eliminar</button>
                <button onclick="editTask(${index})">Editar</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Agregar tarea
    function addTask() {
        const task = taskInput.value.trim();
        if (task !== '') {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            
            if (editingIndex === -1) {
                // Si no estamos editando, agregamos la tarea
                tasks.push(task);
            } else {
                // Si estamos editando, actualizamos la tarea en el índice correspondiente
                tasks[editingIndex] = task;
                editingIndex = -1; // Restablecemos el índice de edición
            }

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

    // Editar tarea
    window.editTask = function(index) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskInput.value = tasks[index]; // Colocar el valor de la tarea en el input
        editingIndex = index; // Guardamos el índice de la tarea que se está editando
        addTaskBtn.textContent = 'Guardar Tarea'; // Cambiar el texto del botón a "Guardar Tarea"
    }

    // Evento para agregar tarea o guardar si estamos editando
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Cargar tareas al iniciar la página
    loadTasks();
});
