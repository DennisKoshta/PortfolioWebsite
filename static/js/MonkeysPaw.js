// Disable so that you can't submit nothing
$("#submit_button").prop("disabled", true);

processInputRequest("", 0);

$('#user-input-form').on('submit', function (event) {
    // Disable submit button during loading
    $("#submit_button").prop("disabled", true);
    event.preventDefault();

    // Get input
    let userInput = $('#user_input').val();

    // Clear response box
    $("#response").html("");

    // Change from image to loading.gif
    $("#your_image").attr("src", "/static/assets/img/loading.gif");

    // Show the "loading" text
    $("#loading_text").show();

    processInputRequest(userInput, 1);
});

$(document).ready(function() {
    const minInputLength = 2;
    
    // Enable or disable the submit button based on the input length
    $('#user-input-form').on('input', function(event) {
        if ($('#user_input').val().length >= minInputLength) {
            $("#submit_button").prop("disabled", false);
        } else {
            $("#submit_button").prop("disabled", true);
        }
    });
});

$(document).ready(function() {
    // Dynamically size wish text box 
    $("#user_input").on("input", function() {
        const minInputWidth = 400; // Set a minimum input width (in pixels)
        const widthMultiplier = 10 // Adjust this value to control the rate at which the input grows/shrinks
        const inputLength = $(this).val().length;
        $(this).width(Math.max(minInputWidth, inputLength * widthMultiplier));
    });
});

function updateModelDisplay(calls) {
    model = (calls < 3) ? "gpt-4" : "gpt-3.5-turbo";

    console.log(model);
    console.log(calls);

    // Update the displayed model
    $("#current_model").text(`Current Model: ${model}`);

    // Alert user of reaching limit
    if (calls === 3) {
        alert("You have reached the limit of GPT-4 API calls. Subsequent requests will use GPT-3.5-turbo.");
    }
}

function processInputRequest(userInput, use_api) {
    $.ajax({
        type: "POST",
        url: "/process_input",
        data: {user_input: userInput, use_api: use_api},
        success: function (data) {
            // Show response
            if (use_api === true) {
                $("#response").html(data.response);
            }

            // Change from loading.gif to image
            $("#your_image").attr("src", "/static/assets/img/monkeys_paw.jpg");

            // Re-enable submit button 
            $("#submit_button").prop("disabled", false);

            // Hide the "loading" text
            $("#loading_text").hide();

            // Update model display
            updateModelDisplay(data.calls);
        },
        error: function () {
            // Show response error
            if (use_api === true) {
                $("#response").html("An error occurred.");
            }

            // Change from loading.gif to image
            $("#your_image").attr("src", "/static/assets/img/monkeys_paw.jpg");

            // Re-enable submit button 
            $("#submit_button").prop("disabled", false);

            // Hide the "loading" text
            $("#loading_text").hide();

            // Update model display
            updateModelDisplay(data.calls);
        },
    });
}