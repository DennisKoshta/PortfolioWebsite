from flask import Flask, render_template, request, Response, jsonify, g, session, redirect
from py_scripts import monkeys_paw
import requests
import pathlib
import os
from google.cloud import firestore

environment = os.environ.get("ENVIRONMENT")

# Set captcha API key
valid_env = True
if environment == "local":
    captcha_api_key = os.environ.get('CAPTCHA_API_KEY')
elif environment == "production":
    captcha_api_key = monkeys_paw.get_secret("captcha_api_key")
else:
    valid_env = False

app = Flask(__name__)

# user_api_calls = defaultdict(int)
db = firestore.Client()

@app.route("/")
def index():
    return render_template('index.html', captcha_api_key=captcha_api_key)   

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

    # Store IP-address/timestamp pair for every GPT request in the Firestore database
    from datetime import datetime # Add this import at the beginning of the file
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ip_timestamp_data = {'ip_address': user_ip, 'timestamp': timestamp}
    db.collection('gpt_requests').add(ip_timestamp_data)  # Change 'gpt_requests' to the desired collection name

    return jsonify(response=response, calls=api_calls)

@app.route('/NextTask')
def NextTask():
    return render_template('NextTask.html')

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