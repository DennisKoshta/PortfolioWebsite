from flask import Flask, request, render_template, flash, Response, make_response

from imutils.video import VideoStream
import json

import numpy as np

# from motion_tracker import *

import threading
import argparse
import datetime
import imutils
import time
import cv2

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

@app.route('/fractal')
def fractal():
    return render_template('fractal.html')

@app.route('/test_fractal')
def test_fractal():
    return render_template('test_fractal.html')

# @app.route("/video_feed")
# def video_feed():
#     camera = cv2.VideoCapture(0)

#     return Response(process_frame(camera), mimetype = "multipart/x-mixed-replace; boundary=frame")

@app.route('/test')
def test():
    return render_template('test.html')

# @app.route('/test2')
# def test2():
#     return render_template('test2.html')

# @app.route('/test2_func', methods=['POST', 'GET'])
# def test2_func(test=False):
#     global latest_image

#     if test:
#         return latest_image
#     else:
#         output = request.get_json()
#         result = json.loads(output) #this converts the json output to a python dictionary

#         height = result['h']
#         width = result['w']

#         # print(f"Receving data: {type(result)}   Keys: {result.keys()}   Image data length: {len(result['img'])}   Height and width: {height}, {width}")

#         # Convert to numpy array
#         ndarray = np.fromiter(result['img'].values(), dtype=float)

#         # Process pixel data to form 3 layers
#         red = ndarray[::4]
#         green = ndarray[1::4]
#         blue = ndarray[2::4]
#         alpha = ndarray[3::4]

#         red = np.reshape(red, (height, width))
#         green = np.reshape(green, (height, width))
#         blue = np.reshape(blue, (height, width))

#         RGB_image = cv2.merge((blue, green, red))

#         # print(f"Image data array[0:5]: {ndarray[0:5]}, length: {len(ndarray)}, type: {type(ndarray)}")

#         # print(f"RGBA dimensions: {np.shape(red)}, {np.shape(green)}, {np.shape(blue)}, {np.shape(RGB_image)}")

#         # test = cv2.imread("test.png")

#         # print(f"Image dimensions: {np.shape(test)}, type: {type(test)}")

#         # if not cv2.imwrite('C:\\Users\\denni\\Desktop\\PortfolioWebsite\\test_image.png', RGB_image):
#         #  raise Exception("Could not write image")

#         # Process with motion_tracker
#         print('processing image')

#         # # Display
#         retval, latest_image = cv2.imencode('.png', RGB_image)

#         return "?"

# @app.route('/test2_vid', methods=['GET'])
# def test2_vid():
#     return Response(gen_frames(), mimetype = "multipart/x-mixed-replace; boundary=frame")

# def gen_frames():
#     while True:
#         return process_frame(test2_func(True))

if __name__ == "__main__":
	# start the flask app
    app.run(debug=False)