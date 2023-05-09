// Initialize flatpickr for the due date input field
flatpickr("#due-date", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minuteIncrement: 15, // Set minute increment to 15 minutes
});

function formatDate(date) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

document.getElementById("add-task-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const task = {
        title: formData.get("title"),
        description: formData.get("description") || "", // Make the description field optional
        due_date: new Date(document.getElementById("due-date").value),
    };

    // Check for duplicate tasks with the same title
    if (isTaskDuplicate(task)) {
        alert("This task already exists. Please choose a different title or description.");
    } else {
        saveTask(task);
        getNextTask();
        displayAllTasks();
    }
});

function isTaskDuplicate(newTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks.some(task => task.title === newTask.title && task.description === newTask.description);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getNextTask() {
    // Fetch tasks from the database (using localStorage for now)
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find the next task based on the due_date
    let nextTask = tasks.reduce((next, task) => {
        if (!next || new Date(task.due_date) < new Date(next.due_date)) {
            return task;
        }
        return next;
    }, null);

    // Update the "next-task" element with the next task's details
    let nextTaskDiv = document.getElementById("next-task");
    if (nextTask) {
        let timeRemaining = Math.round((new Date(nextTask.due_date) - new Date()) / 60000);
        let descriptionText = nextTask.description ? `<br>Description: ${nextTask.description}` : "";
        let dueDateText = nextTask.due_date ? `<br>Due Date: ${formatDate(nextTask.due_date)}` : ""; // Use formatDate()
        nextTaskDiv.innerHTML = `Next Task: ${nextTask.title}${descriptionText}${dueDateText}<br>
                                 Time Remaining: ${timeRemaining} minutes`;
    } else {
        nextTaskDiv.innerHTML = "No tasks available.";
    }
}

// Add event listener for the "Clear All Tasks" button
document.getElementById("clear-all-tasks").addEventListener("click", function () {
    clearAllTasks();
    getNextTask();
    displayAllTasks();
});

function clearAllTasks() {
    localStorage.removeItem("tasks");
}

// Add a new function to display all tasks
function displayAllTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Sort tasks by due_date
    tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

    let allTasksDiv = document.getElementById("all-tasks");
    allTasksDiv.innerHTML = "";

    tasks.forEach((task) => {
        let taskDiv = document.createElement("div");
        let descriptionText = task.description ? `<br><strong>Description:</strong> ${task.description}` : "";
        let dueDateText = task.due_date ? `<br><strong>Due Date:</strong> ${formatDate(task.due_date)}` : ""; // Use formatDate()
        taskDiv.innerHTML = `<strong>Title:</strong> ${task.title}${descriptionText}${dueDateText}<br>
                             <button class="btn btn-sm btn-danger delete-task" data-title="${task.title}">Delete</button><br><br>`;
        allTasksDiv.appendChild(taskDiv);
    });

    // Add event listeners for the delete buttons
    document.querySelectorAll(".delete-task").forEach((button) => {
        button.addEventListener("click", function () {
            deleteTask(this.dataset.title);
            getNextTask();
            displayAllTasks();
        });
    });
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.title !== title);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Call displayAllTasks on page load to display all tasks immediately
displayAllTasks();

// Call getNextTask on page load to display the next task immediately
getNextTask();