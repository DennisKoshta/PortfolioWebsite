from flask import Flask, render_template, request, Response, jsonify, g
from py_scripts import monkeys_paw
import requests
import os
# from collections import defaultdict
from google.cloud import firestore

environment = os.environ.get("ENVIRONMENT")

app = Flask(__name__)

# user_api_calls = defaultdict(int)
db = firestore.Client()

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
    use_api = int(request.form['use_api'])

    # Get user IP
    if 'X-Forwarded-For' in request.headers:
        user_ip = request.headers['X-Forwarded-For']
    else:
        user_ip = request.remote_addr

    # Increment the GPT-4 API calls made by the user
    user_doc_ref = db.collection('users').document(user_ip)
    user_doc = user_doc_ref.get()

    if user_doc.exists and ('api_calls' in user_doc.to_dict()):
        api_calls = user_doc.to_dict()['api_calls'] + 1
    else:
        api_calls = 1

    # Check for dev account
    if user_ip=="127.0.0.1" and environment=="local":
        api_calls = 0
        print(f"user_ip: {user_ip}") 
        print(f"user_api_calls: {api_calls}")

    # Just api_call return
    if not use_api:
        api_calls = max(api_calls-1, 0)
        user_doc_ref.set({'api_calls': api_calls})
        return jsonify(response="None", calls=api_calls)

    user_doc_ref.set({'api_calls': api_calls})

    # Check if the user has reached the limit for GPT-4 API calls
    if api_calls < 3:
        model = "gpt-4"
    else:
        model = "gpt-3.5-turbo"

    response = monkeys_paw.gpt_response(f"I wish {user_input}", model)
    return jsonify(response=response, calls=api_calls)

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