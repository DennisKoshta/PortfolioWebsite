$(document).ready(function() {
    // Send response
    $('#user-input-form').on('submit', function(event) {
        event.preventDefault();
        let userInput = $('#user_input').val();

        $.ajax({
            type: "POST",
            url: "/process_input",
            data: {user_input : userInput},
            success: function(data) {
                $("#response").html(data.response);
            },
            error: function() {
                $("#response").html("An error occurred.");
            }
        });
    });
});

$(document).ready(function() {
    const minInputLength = 5;
    
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