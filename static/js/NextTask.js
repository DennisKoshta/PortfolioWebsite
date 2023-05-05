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