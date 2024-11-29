document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const dueDateInput = document.getElementById('due-date-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    let editingIndex = -1; // Variable para almacenar el índice de la tarea que se está editando

    // Cargar tareas desde localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';

        // Ordenar tareas primero por prioridad y luego por fecha de vencimiento
        tasks.sort((a, b) => {
            if (a.priority === b.priority) {
                // Si las prioridades son iguales, ordenar por fecha
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return a.priority - b.priority;
        });

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text} (Prioridad: ${task.priority === 1 ? 'Alta' : task.priority === 2 ? 'Media' : 'Baja'}, Fecha de Vencimiento: ${task.dueDate})</span>
                <button onclick="deleteTask(${index})">Eliminar</button>
                <button onclick="editTask(${index})">Editar</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Agregar tarea
    function addTask() {
        const taskText = taskInput.value.trim();
        const priority = parseInt(prioritySelect.value);
        const dueDate = dueDateInput.value;

        if (taskText !== '' && dueDate !== '') {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            if (editingIndex === -1) {
                // Si no estamos editando, agregamos la tarea
                tasks.push({ text: taskText, priority: priority, dueDate: dueDate });
            } else {
                // Si estamos editando, actualizamos la tarea en el índice correspondiente
                tasks[editingIndex] = { text: taskText, priority: priority, dueDate: dueDate };
                editingIndex = -1; // Restablecemos el índice de edición
            }

            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = ''; // Limpiar el input
            dueDateInput.value = ''; // Limpiar el campo de fecha
            loadTasks(); // Recargar la lista de tareas
        } else {
            alert("Por favor, complete todos los campos.");
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
        taskInput.value = tasks[index].text; // Colocar el valor de la tarea en el input
        prioritySelect.value = tasks[index].priority; // Colocar la prioridad de la tarea en el select
        dueDateInput.value = tasks[index].dueDate; // Colocar la fecha de vencimiento en el input
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
