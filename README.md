# My Website Portfolio

Welcome to my portfolio website! Here you can find my resume, as well as a few projects that demonstrate my skills in software engineering and machine learning. In this repository, you will find the source code and documentation for the website and projects.

## Website Link

[www.denniskoshta.com](https://propane-nomad-267903.wl.r.appspot.com/)

## Contents

1. Flask Web Application
2. Project: Hand Motion Tracking
3. Project: Actor Degrees of Separation
4. Project: JavaScript Drawing Canvas
5. Project: Monkey's Paw Wish Generator
6. Project: Multi-threaded HTTP Server
7. Google Cloud (gcloud) Hosting

## 1. Flask Web Application

Flask is a lightweight Python web framework that allows for quick and easy development of web applications. In this project, I have utilized Flask to create the backend of my portfolio website, handling the routing and serving of pages.

### Features

- Modular and scalable web application structure
- RESTful API for easy integration with frontend

### Technologies Used

- Python
- Flask

### Files

- main.py
- app.yaml
- templates\index.html

## 2. Hand Motion Tracking

This project utilizes the MediaPipe NodeJS package to track and graphically visualize your hands and fingers using your webcam. It's an interesting way to explore computer vision and machine learning capabilities.

### Features

- Real-time hand tracking
- Graphical visualization of hands and fingers
- Easy to use interface

### Technologies Used

- NodeJS
- MediaPipe

### Files

- templates\MotionTracking.html
- static\assets\img\motion_tracking_example.png

## 2. Actor Degrees of Separation

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

## 3. JavaScript Drawing Canvas

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
- static\assets\img\fractal_example.png
- static\js\ArtCanvas.js
- static\css\ArtCanvas.css

## 4. Monkey's Paw Wish Generator

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

### Files

- templates\MonkeysPaw.html
- static\assets\img\monkeys_paw.png
- static\js\MonkeysPaw.js
- static\css\MonkeysPaw.css
- main.py
- monkeys_paw.py

## 5. Multi-threaded HTTP Server

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

## 6. Google Cloud (gcloud) Hosting

Google Cloud Platform (GCP) offers a variety of services for hosting and managing web applications. In this project, I have used GCP's App Engine to deploy and host my portfolio website, providing a scalable and reliable hosting solution.

### Features

- Easy deployment and management of web applications
- Automatic scaling to handle varying traffic levels
- Integration with other Google Cloud services for enhanced functionality

### Technologies Used

- Google Cloud Platform (GCP)
- App Engine
- gcloud CLI

