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

function formatTimeRemaining(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let days = Math.floor(seconds / 86400);
    seconds %= 86400;
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);

    let formattedTime = "";
    if (days) formattedTime += `${days} days `;
    if (hours) formattedTime += `${hours} hours `;
    if (minutes) formattedTime += `${minutes} minutes`;

    return formattedTime || "0 minutes";
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
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Separate tasks with and without due dates
    let tasksWithDates = tasks.filter(task => new Date(task.due_date) > new Date());
    let tasksWithoutDates = tasks.filter(task => !task.due_date);

    // Find the next task based on the due_date among tasksWithDates
    let nextTaskWithDate = tasksWithDates.reduce((next, task) => {
        if (!next || new Date(task.due_date) < new Date(next.due_date)) {
            return task;
        }
        return next;
    }, null);

    // Give priority to tasks without due dates
    let nextTask = tasksWithoutDates.length > 0 ? tasksWithoutDates[0] : nextTaskWithDate;

    let nextTaskDiv = document.getElementById("next-task");
    if (nextTask) {
        let descriptionText = nextTask.description ? `<br>Description: ${nextTask.description}` : "";
        let dueDateText = nextTask.due_date ? `<br>Due Date: ${formatDate(nextTask.due_date)}` : "";
        let timeRemaining = nextTask.due_date ? `<br>Time Remaining: ${formatTimeRemaining(new Date(nextTask.due_date) - new Date())}` : "";
        nextTaskDiv.innerHTML = `Next Task: ${nextTask.title}${descriptionText}${dueDateText}${timeRemaining}`; // Use formatTimeRemaining() conditionally
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

        // Check if the task is past-due and has a due date
        let isPastDue = task.due_date && new Date(task.due_date) < new Date();
        let pastDueClass = isPastDue ? "past-due" : "";

        // Modify the dueDateText to display "No date set" if there's no date
        let dueDateText = task.due_date
            ? `<br><strong>Due Date:</strong> ${formatDate(task.due_date)}`
            : "<br><strong>Due Date:</strong> No date set";

        let descriptionText = task.description ? `<br><strong>Description:</strong> ${task.description}` : "";

          // Pass both the title and description to the deleteTask() function
        taskDiv.innerHTML = `<div class="${pastDueClass}"><strong>Title:</strong> ${task.title}${descriptionText}${dueDateText}<br>
                             <button class="btn btn-sm btn-danger delete-task" data-title="${task.title}" data-description="${task.description}">Delete</button></div><br>`;
        allTasksDiv.appendChild(taskDiv);
    });

    // Add event listeners for the delete buttons
    document.querySelectorAll(".delete-task").forEach((button) => {
        button.addEventListener("click", function () {
            deleteTask(this.dataset.title, this.dataset.description);
            getNextTask();
            displayAllTasks();
        });
    });
}

function deleteTask(title, description) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.title !== title || task.description !== description);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add event listener for the "Toggle All Tasks" switch
document.getElementById("toggle-all-tasks").addEventListener("change", function () {
    const allTasksContent = document.getElementById("all-tasks-content");
    allTasksContent.classList.toggle("hidden");
});

// Call this line to initialize the visibility state of all tasks
document.getElementById("all-tasks-content").classList.add("hidden");

// Call displayAllTasks on page load to display all tasks immediately
displayAllTasks();

// Call getNextTask on page load to display the next task immediately
getNextTask();