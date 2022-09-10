from flask import Flask, request, render_template, flash, Response, make_response
import numpy as np

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')   

@app.route('/MotionTracking')
def MotionTracking():
    return render_template('MotionTracking.html')

@app.route('/CartPole')
def CartPole():
    return render_template('CartPole.html')

@app.route('/ArtCanvas')
def ArtCanvas():
    return render_template('ArtCanvas.html')

# @app.route('/test')
# def test():
#     return render_template('test.html')

# @app.route('/test2')
# def test2():
#     return render_template('test2.html')

if __name__ == "__main__":
	# start the flask app
    app.run(debug=True)