$(document).ready(function() {
    // Send response
    $('#user-input-form').on('submit', function(event) {
        $("#submit_button").prop("disabled", true);
        event.preventDefault();
        let userInput = $('#user_input').val();

        $("#response").html("")
        $("#your_image").attr("src", "/static/assets/img/loading.gif");

        $.ajax({
            type: "POST",
            url: "/process_input",
            data: {user_input : userInput},
            success: function(data) {
                $("#response").html(data.response);
                $("#your_image").attr("src", "/static/assets/img/monkeys_paw.jpg");
                $("#submit_button").prop("disabled", false);
            },
            error: function() {
                $("#response").html("An error occurred.");
                $("#your_image").attr("src", "/static/assets/img/monkeys_paw.jpg");
                $("#submit_button").prop("disabled", false);
            }
        });
    });
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

$("#submit_button").prop("disabled", true);