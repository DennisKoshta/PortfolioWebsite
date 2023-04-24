from flask import Flask, render_template, request, Response, jsonify, g
from py_scripts import monkeys_paw
# from flask_limiter import Limiter
import requests
import os

environment = os.environ.get("ENVIRONMENT")

app = Flask(__name__)

# limiter = Limiter(key_func=lambda: request.remote_addr if request else None, app=app, default_limits=["1000 per hour"])  # Initialize rate limiter using IP addresses

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

# @app.before_request
# def set_rate_limit_info():
#     limit_info = limiter.get_limits(request.endpoint, request.method, limiter.key_func())
#     if limit_info:
#         g.rate_limit_info = limit_info[0]

# @app.route('/get_remaining_requests', methods=['GET'])
# @limiter.limit("1 per second")  # Limit how often the remaining requests can be checked
# def get_remaining_requests():
#     daily_limit = 5  # The same limit as specified in the process_input() function
#     remaining_requests = daily_limit - limiter.get_request_count(request.endpoint, request.method, limiter.key_func())
#     return jsonify(remaining_requests=remaining_requests)

@app.route('/process_input', methods=['POST'])
# @limiter.limit("5 per day")  # Limit the number of requests to 5 per day per IP address
def process_input():
    user_input = request.form['user_input']
    response = monkeys_paw.gpt_response(f"I wish {user_input}")
    return jsonify(response=response)

# @app.route('/process_input', methods=['POST'])
# def process_input():
#     user_input = request.form['user_input']
#     response = monkeys_paw.gpt_response(f"I wish {user_input}")
#     return jsonify(response=response)

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