document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const dueDateInput = document.getElementById('due-date-input');
    const noteInput = document.getElementById('note-input'); // Nuevo campo de notas
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const sortSelect = document.getElementById('sort-select');
    let editingIndex = -1;

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
            const isVencida = dueDate < currentDate;

            // Asignar clase según el estado de la tarea
            if (task.completed) {
                li.classList.add('completed');
            } else if (isVencida) {
                li.classList.add('vencida');
            }

            li.innerHTML = `
                <span>${task.text} 
                    (Prioridad: ${task.priority === 1 ? 'Alta' : task.priority === 2 ? 'Media' : 'Baja'}, 
                    Fecha de Vencimiento: ${task.dueDate})
                </span>
                <button class="complete-btn" onclick="completeTask(${index})">${task.completed ? 'Desmarcar' : 'Completar'}</button>
                <button onclick="deleteTask(${index})">Eliminar</button>
                <button onclick="editTask(${index})">Editar</button>
                <div class="note ${task.note ? 'visible' : ''}">
                    <p>${task.note || 'Sin notas'}</p>
                    <button onclick="deleteNote(${index})">Eliminar Nota</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Agregar tarea
    function addTask() {
        const taskText = taskInput.value.trim();
        const priority = parseInt(prioritySelect.value);
        const dueDate = dueDateInput.value;
        const noteText = noteInput.value.trim(); // Obtener texto de la nota

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
                tasks.push({ text: taskText, priority: priority, dueDate: dueDate, completed: false, note: noteText });
            } else {
                tasks[editingIndex] = { text: taskText, priority: priority, dueDate: dueDate, completed: false, note: noteText };
                editingIndex = -1; // Restablecer el índice de edición
            }

            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = ''; // Limpiar el input
            dueDateInput.value = ''; // Limpiar el campo de fecha
            noteInput.value = ''; // Limpiar el campo de notas
            loadTasks(); // Recargar la lista de tareas
        } else {
            alert("Por favor, complete todos los campos.");
        }
    }

    // Marcar tarea como completada
    window.completeTask = (index) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };

    // Eliminar tarea
    window.deleteTask = (index) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };

    // Editar tarea
    window.editTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks[index];

        taskInput.value = task.text;
        prioritySelect.value = task.priority;
        dueDateInput.value = task.dueDate;
        noteInput.value = task.note || ''; // Cargar la nota

        editingIndex = index; // Establecer el índice de edición
    };

    // Eliminar nota
    window.deleteNote = (index) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].note = ''; // Eliminar la nota
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };

    // Ordenar tareas
    sortSelect.addEventListener('change', () => {
        loadTasks();
    });

    // Agregar tarea al hacer clic en el botón
    addTaskBtn.addEventListener('click', addTask);

    loadTasks();
});

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const dueDateInput = document.getElementById('due-date-input');
    const noteInput = document.getElementById('note-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const sortSelect = document.getElementById('sort-select');
    let editingIndex = -1;

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

        taskList.innerHTML = ''; // Limpiar la lista de tareas antes de cargar

        tasks.forEach((task, index) => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            
            const dueDate = new Date(task.dueDate);
            const currentDate = new Date();
            const isVencida = dueDate < currentDate;

            // Asignar clases de estado
            if (task.completed) {
                taskCard.classList.add('completed');
            } else if (isVencida) {
                taskCard.classList.add('vencida');
            }

            taskCard.innerHTML = `
                <div class="task-text">${task.text}</div>
                <div class="task-meta">
                    Prioridad: ${task.priority === 1 ? 'Alta' : task.priority === 2 ? 'Media' : 'Baja'} 
                    <br>Vence: ${task.dueDate}
                </div>
                <div class="note ${task.note ? 'visible' : ''}">
                    <p>${task.note || 'Sin notas'}</p>
                    <button onclick="deleteNote(${index})">Eliminar Nota</button>
                </div>
                <button onclick="completeTask(${index})">${task.completed ? 'Desmarcar' : 'Completar'}</button>
                <button onclick="deleteTask(${index})">Eliminar</button>
                <button onclick="editTask(${index})">Editar</button>
            `;
            
            taskList.appendChild(taskCard);
        });
    }

    // Funciones para agregar, completar, eliminar tareas y manejar notas (como se mostró antes)

    // Cargar las tareas al inicio
    loadTasks();
});

// Cuando se agrega una nueva tarea
taskCard.classList.add('added');
setTimeout(() => {
    taskCard.classList.remove('added');
}, 300);

// Cuando se elimina una tarea
taskCard.classList.add('removed');
setTimeout(() => {
    taskCard.remove();
}, 300);

const darkModeBtn = document.getElementById('dark-mode-btn');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.getElementById('filter-date').addEventListener('change', (e) => {
    const selectedDate = e.target.value;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => task.dueDate === selectedDate);
    displayTasks(filteredTasks);
});

// Revisamos si el navegador permite notificaciones
if (Notification.permission === "granted") {
    // Enviamos una notificación para una tarea vencida
    new Notification("¡Recordatorio de tarea!", {
        body: "No olvides completar tu tarea.",
    });
} else {
    Notification.requestPermission();
}

function updateCountdown(dueDate) {
    const now = new Date();
    const countdown = new Date(dueDate) - now;

    if (countdown > 0) {
        const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        return `${days} días restantes`;
    } else {
        return "Tarea vencida";
    }
}

function rateTask(rating) {
    task.rating = rating;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleRecurrence(task) {
    const recurrence = document.getElementById('recurrence').value;
    if (recurrence === 'daily') {
        task.dueDate = new Date().setDate(new Date().getDate() + 1);
    } else if (recurrence === 'weekly') {
        task.dueDate = new Date().setDate(new Date().getDate() + 7);
    } else if (recurrence === 'monthly') {
        task.dueDate = new Date().setMonth(new Date().getMonth() + 1);
    }
}

task.noteVisibility = document.getElementById('note-visibility').value;

task.relatedTask = document.getElementById('related-task').value;
