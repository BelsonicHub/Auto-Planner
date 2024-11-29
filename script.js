document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const dueDateInput = document.getElementById('due-date-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const sortSelect = document.getElementById('sort-select');
    let editingIndex = -1; // Variable para almacenar el índice de la tarea que se está editando

    // Cargar tareas desde localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const sortBy = sortSelect.value;

        // Ordenar tareas según el criterio seleccionado
        tasks.sort((a, b) => {
            if (sortBy === 'priority') {
                return a.priority - b.priority;
            } else if (sortBy === 'dueDate') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
        });

        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const dueDate = new Date(task.dueDate);
            const currentDate = new Date();
            const isVencida = dueDate < currentDate; // Verificar si la tarea está vencida

            li.className = isVencida ? 'vencida' : ''; // Marcar tarea vencida si aplica

            li.innerHTML = `
                <span>${task.text} 
                    (Prioridad: ${task.priority === 1 ? 'Alta' : task.priority === 2 ? 'Media' : 'Baja'}, 
                    Fecha de Vencimiento: ${task.dueDate})
                </span>
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
            const currentDate = new Date();
            const selectedDate = new Date(dueDate);

            // Validar que la fecha de vencimiento no sea en el pasado
            if (selectedDate < currentDate) {
                alert("La fecha de vencimiento no puede ser anterior a la fecha actual.");
                return;
            }

            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            if (editingIndex === -1) {
                tasks.push({ text: taskText, priority: priority, dueDate: dueDate });
            } else {
                tasks[editingIndex] = { text: taskText, priority: priority, dueDate: dueDate };
                editingIndex = -1; // Restablecer el índice de edición
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
        taskInput.value = tasks[index].text;
        prioritySelect.value = tasks[index].priority;
        dueDateInput.value = tasks[index].dueDate;
        editingIndex = index;
        addTaskBtn.textContent = 'Guardar Tarea';
    }

    // Cambiar el criterio de ordenamiento
    sortSelect.addEventListener('change', loadTasks);

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
