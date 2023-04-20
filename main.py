from flask import Flask, render_template, request, Response, jsonify
from py_scripts import monkeys_paw
import requests

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
    print(f"user input: I wish {user_input}")
    response = monkeys_paw.gpt_response(f"I wish {user_input}")
    print(f"response: {response}")
    return jsonify(response=response)

if __name__ == "__main__":
	# start the flask app
    app.run(debug=True)