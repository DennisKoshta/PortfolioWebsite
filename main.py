from flask import Flask, render_template, request, Response, jsonify, g
from py_scripts import monkeys_paw
import requests
import os
from collections import defaultdict

environment = os.environ.get("ENVIRONMENT")

app = Flask(__name__)

user_api_calls = defaultdict(int)

@app.route("/")
def index():
    return render_template('index.html')   

@app.route('/MotionTracking')
def MotionTracking():
    return render_template('MotionTracking.html')

@app.route('/ArtCanvas')
def ArtCanvas():
    return render_template('ArtCanvas.html')

@app.route('/MonkeysPaw')
def MonkeysPaw():
    return render_template('MonkeysPaw.html')

@app.route('/process_input', methods=['POST'])
def process_input():
    user_input = request.form['user_input']
    user_ip = request.remote_addr  # Get the user's IP address

    # print(f"user_ip: {user_ip}")
    # print(f"user_api_calls: {user_api_calls}")

    # Increment the GPT-4 API calls made by the user
    user_api_calls[user_ip] += 1

    # Check if the user has reached the limit for GPT-4 API calls
    if user_api_calls[user_ip] > 3:
        model = "gpt-3.5-turbo"
    else:
        model = "gpt-4"

    response = monkeys_paw.gpt_response(f"I wish {user_input}", model)
    return jsonify(response=response)

# DEVELOPER CONSOLE DEBUG MESSAGE LOGGING (paste JS to desired html file and uncomment python)

# @app.route('/get_messages')
# def get_messages():
#     messages = [f"environment: {environment}"]
#     return jsonify(messages)

# <script>
#     async function fetchMessages() {
#         const response = await fetch('/get_messages');
#         const messages = await response.json();
#         messages.forEach((message) => {
#             console.log(message);
#         });
#     }

#     fetchMessages();
# </script>

if __name__ == "__main__":
	# start the flask app
    if environment == "local":
        app.run(debug=True)
    else:
        app.run(debug=False)