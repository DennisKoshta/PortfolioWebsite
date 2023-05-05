// Google Sign-In callback function
function onSignIn(googleUser) {
    // Get user profile information
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());

    // TODO: Save user information to the database or localStorage
}

// Add Task Form submission handling
document.getElementById("add-task-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const task = {
        title: formData.get("title"),
        description: formData.get("description"),
        due_date: new Date(formData.get("due_date")),
    };
    // Save task to the database (using Firestore, localStorage, or cookies)
});

function getNextTask() {
// Fetch tasks from the database (using Firestore, localStorage, or cookies)
// Find the next task based on the due_date
// Update the "next-task" element with the next task's details
}

function handleSignInClick() {
    google.accounts.id.prompt();
}

function handleCredentialResponse(response) {
    console.log(response.credential);
    // Send the response to your server for authentication
    const data = new FormData();
    data.append("credential", response.credential);

    fetch("/oauth2callback", {
        method: "POST",
        body: data
    })
    .then(response => {
        if (response.ok) {
            // Authentication successful
            response.json().then(data => {
                // Update the UI to show the user is logged in
                const loggedInUser = document.createElement("div");
                loggedInUser.innerHTML = `Logged in as: ${data.name} (${data.email})`;
                document.body.prepend(loggedInUser);
    
                // Hide the Google Sign-In button
                const signInButton = document.querySelector(".g-signin2");
                signInButton.style.display = "none";
            });
        } else {
            // Authentication failed
            // Show an error message to the user
            const errorMessage = document.createElement("div");
            errorMessage.innerHTML = "Authentication failed. Please try again.";
            errorMessage.style.color = "red";
            document.body.prepend(errorMessage);
        }
    });
}

// Get the current base URL
const baseURL = window.location.origin;

// Create the absolute login_uri
const loginURI = baseURL + '/oauth2callback';

// Set the data-login_uri attribute
document.getElementById("g_id_onload").setAttribute("data-login_uri", loginURI);