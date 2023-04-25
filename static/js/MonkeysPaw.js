// Disable so that you can't submit nothing
$("#submit_button").prop("disabled", true);

updateCurrentModel();

$('#user-input-form').on('submit', function (event) {
  updateCurrentModel();
  $("#submit_button").prop("disabled", true);
  event.preventDefault();
  let userInput = $('#user_input').val();

  $("#response").html("");
  $("#your_image").attr("src", "/static/assets/img/loading.gif");
  // Show the "loading" text
  $("#loading_text").show();

  $.ajax({
    type: "POST",
    url: "/process_input",
    data: { user_input: userInput },
    success: function (data) {
      $("#response").html(data.response);
      $("#your_image").attr("src", "/static/assets/img/monkeys_paw.jpg");
      $("#submit_button").prop("disabled", false);
      // Hide the "loading" text
      $("#loading_text").hide();
    },
    error: function () {
      $("#response").html("An error occurred.");
      $("#your_image").attr("src", "/static/assets/img/monkeys_paw.jpg");
      $("#submit_button").prop("disabled", false);
      // Hide the "loading" text
      $("#loading_text").hide();
    },
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

function updateCurrentModel() {
    $.ajax({
        type: "GET",
        url: "/get_current_model",
        success: function (data) {
            // Set the GPT-4 API call count based on the returned model
            gpt4_api_call_count = data.model === "gpt-4" ? gpt4_api_call_count : 3;

            // Update the displayed model
            $("#current_model").text(`Current Model: ${data.model}`);

            // Alert user of reaching limit
            if (gpt4_api_call_count === 3) {
                alert("You have reached the limit of GPT-4 API calls. Subsequent requests will use GPT-3.5-turbo.");
            }
        },
        error: function () {
            $("#current_model").text("Error getting current model");
        },
    });
}