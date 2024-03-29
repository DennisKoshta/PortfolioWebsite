# My Website Portfolio Git Repository

Welcome to my portfolio website's Git repository! This repository contains the source code and documentation for my personal portfolio website, showcasing my skills, projects, and accomplishments in software development and machine learning. The README is designed to provide descriptions of my projects, allowing visitors to explore my work and get to know me better. Feel free to browse the code, learn from it, and even use it as a starting point for your own portfolio website.

## Website Link

[www.denniskoshta.com](https://www.denniskoshta.com)

## Contents

- [Flask Web Application](#flask-web-application)
- Project: [Hand Motion Tracking](#hand-motion-tracking)
- Project: [Actor Degrees of Separation](#actor-degrees-of-separation)
- Project: [JavaScript Drawing Canvas](#javascript-drawing-canvas)
- Project: [Monkey's Paw Wish Generator](#monkey's-paw-wish-generator)
- Project: [Multi-threaded HTTP Server](#multi-threaded-http-server)
- Project: [Phoneme Recognition from sEMG Signals](#phoneme-recognition)
- [Google Cloud (gcloud) Hosting](#google-cloud-hosting)

## <a id="flask-web-application" style="color: inherit; text-decoration: none;">Flask Web Application</a>

Flask is a lightweight Python web framework that allows for quick and easy development of web applications. In this project, I have utilized Flask to create the backend of my portfolio website, handling the routing and serving of pages.

### Features

- Modular and scalable web application structure
- RESTful API for easy integration with frontend

### Technologies Used

- Python
- Flask
- HTML/CSS/JS

### Files

- main.py
- app.yaml
- templates\index.html

## <a id="hand-motion-tracking" style="color: inherit; text-decoration: none;">Hand Motion Tracking</a>

This project utilizes the MediaPipe NodeJS package to track and graphically visualize your hands and fingers using your webcam. It's an interesting way to explore computer vision and machine learning capabilities.

### Features

- Real-time hand tracking
- Graphical visualization of hands and fingers
- Easy to use interface

### Technologies Used

- JavaScript
- NodeJS
- MediaPipe

### Files

- templates\MotionTracking.html
- static\css\MotionTracking.css
- static\js\MotionTracking.js
- static\assets\img\motion_tracking_example.png

## <a id="actor-degrees-of-separation" style="color: inherit; text-decoration: none;">Actor Degrees of Separation</a>

This C++ program computes the shortest path between two actors in terms of degrees of separation using their movie appearances as connections. The program takes a formatted input text file containing actor pairs and outputs the corresponding movie/actor connections in a separate output file. The C++ code is optimized using an adjacency list data structure and BFS to find the shortest path efficiently.

### Features

- Compute the shortest path between two actors
- Efficient performance using BFS and adjacency list
- Customizable input and output files

### Technologies Used

- C++
- BFS Algorithm
- Adjacency List Data Structure

### Files

- static\assets\Sixdegrees.zip

## <a id="javascript-drawing-canvas" style="color: inherit; text-decoration: none;">JavaScript Drawing Canvas</a>

A simple canvas to draw and create whatever you desire. This project is made using JavaScript and allows users to unleash their creativity on the web.

### Features

- Draw with different colors and brush sizes
- Clear the canvas
- Draw fractal tree stamp
- Intuitive and user-friendly interface

### Technologies Used

- JavaScript
- HTML5 Canvas

### Files

- templates\ArtCanvas.html
- static\css\ArtCanvas.css
- static\js\ArtCanvas.js
- static\assets\img\fractal_example.png

## <a id="monkey's-paw-wish-generator" style="color: inherit; text-decoration: none;">Monkey's Paw Wish Generator</a>

The Monkey's Paw is an interactive web application that generates unexpected outcomes for user-submitted wishes. This project utilizes the OpenAI GPT API to generate the responses, and Flask for the backend server.

### Features

- Accepts user-submitted wishes
- Generates unexpected outcome using OpenAI GPT API
- Displays the generated outcomes in a user-friendly format
- Easy integration with the web application using Flask

### Technologies Used

- Python
- Flask
- OpenAI GPT API
- google-cloud-secret-manager

### Files

- main.py
- monkeys_paw.py
- templates\MonkeysPaw.html
- static\css\MonkeysPaw.css
- static\js\MonkeysPaw.js
- static\assets\img\monkeys_paw.png

## <a id="multi-threaded-http-server" style="color: inherit; text-decoration: none;">Multi-threaded HTTP Server</a>

This project uses C to implement a simple multi-threaded HTTP server that serves multiple clients simultaneously using a thread-safe queue. The server ensures that its responses conform to a coherent and atomic linearization of the client requests and creates an audit log to identify the linearization. It uses the Pthreads library and supports GET/PUT methods.

### Features

- Multi-threaded server capable of handling multiple clients simultaneously
- Thread-safe queue for managing client requests
- Conforms to a coherent and atomic linearization of client requests
- Creates an audit log for linearization identification
- Supports GET and PUT methods
- Optimized and memory-safe code

### Technologies Used

- C
- Pthreads Library
- HTTP Server

### Files

- static\assets\MultiThreadedHTTPServer.zip

## <a id="phoneme-recognition" style="color: inherit; text-decoration: none;">Phoneme Recognition from sEMG Signals</a>

This project's main goal is to detect phonemes from surface Electromyography (sEMG) data using a Deep Neural Network model implemented in Python. The repository provides Python notebooks for the sEMG data preprocessing and model training.

### Link

[NeuroTechSC - Machine Learning](https://github.com/NeuroTechSC/neurotechML)

### Features

- Detects phonemes from sEMG data
- Achieved near 100% test accuracy on 5 phonemes with ~155,000 parameters using LSTM/RNN architecture
- Real-time transcription potential

### Technologies Used

- Python
- TensorFlow
- Keras
- Scikit-learn
- OpenBCI

### Files

- LSTM_RNN.ipynb
- EMG_Data_Processing.ipynb
- gtp_convos/gpt_convo.md
- gtp_convos/gpt_convo_2.md
- data/

## <a id="google-cloud-hosting" style="color: inherit; text-decoration: none;">Google Cloud (gcloud) Hosting</a>

Google Cloud Platform (GCP) offers a variety of services for hosting and managing web applications. In this project, I have used GCP's App Engine to deploy and host my portfolio website, providing a scalable and reliable hosting solution that provides a custom domain and SSL security for an HTTPS connection.

### Features

- Easy deployment and management of web applications
- Automatic scaling to handle varying traffic levels
- Integration with other Google Cloud services for enhanced functionality

### Technologies Used

- Google Cloud Platform (GCP)
- App Engine
- gcloud CLI
- google-cloud-secret-manager

