from flask import Flask, request, render_template, flash, Response, make_response

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

if __name__ == "__main__":
	# start the flask app
    app.run(debug=True)