from flask import Flask, render_template, request, Response, jsonify
from py_scripts import monkeys_paw
import requests
import os

environment = os.environ.get("ENVIRONMENT")

app = Flask(__name__)

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
    response = monkeys_paw.gpt_response(f"I wish {user_input}")
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