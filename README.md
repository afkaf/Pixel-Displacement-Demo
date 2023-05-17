---
---

# Pixel-Displacement-Demo

This project is an interactive demonstration of a 3D parallax effect using pixel displacement based on depth maps. It's built with [Three.js](https://threejs.org/) and [GSAP](https://greensock.com/gsap/), two powerful libraries for creating rich, interactive web experiences. This demo showcases the code I wrote for creating immersive website backgrounds using this effect.

## Features

- **3D Parallax Effect**: Creates a sense of depth and 3D movement as you move your mouse.
- **Interactive Image Selection**: Allows you to select different images and observe the depth-based displacement effect.
- **Depth Maps**: Uses depth maps to determine the displacement of each pixel, creating a realistic and immersive 3D effect.

## How to Run

This project needs to be hosted on a web server due to the use of fetch API and same-origin policy restrictions in browsers. Here are the steps to run it:

1. Clone this repository to your local machine.
2. Host the project on a local web server. If you have Python installed, you can do this by running `python -m http.server` (for Python 3) or `python -m SimpleHTTPServer` (for Python 2) in the project directory.
3. Open your web browser and navigate to `http://localhost:8000` (or the port you chose).
4. Move your mouse to interact with the image and observe the 3D parallax effect.
5. Use the dropdown menu in the top left corner to select a different image.

## Use as a Website Background

This demo is designed to showcase the code for creating website backgrounds using this effect. If you're interested in using this effect as a background for your own website, check out my other repository where I provide code that is set up for this purpose.

## Future Enhancements

I may improve this project over time. Future enhancements may include more image options, additional controls for adjusting the depth effect, and performance optimizations for smoother animations.

---
