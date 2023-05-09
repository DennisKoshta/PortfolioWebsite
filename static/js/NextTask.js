// Save task to the database (using localStorage for now)
document.getElementById("add-task-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const task = {
        title: formData.get("title"),
        description: formData.get("description"),
        due_date: new Date(formData.get("due_date")),
    };
    saveTask(task);
    getNextTask();
    displayAllTasks();
});

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
        nextTaskDiv.innerHTML = `Next Task: ${nextTask.title}<br>
                                 Description: ${nextTask.description}<br>
                                 Due Date: ${nextTask.due_date}<br>
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
        taskDiv.innerHTML = `<strong>Title:</strong> ${task.title}<br>
                             <strong>Description:</strong> ${task.description}<br>
                             <strong>Due Date:</strong> ${task.due_date}<br><br>`;
        allTasksDiv.appendChild(taskDiv);
    });
}

// Call displayAllTasks on page load to display all tasks immediately
displayAllTasks();

// Call getNextTask on page load to display the next task immediately
getNextTask();