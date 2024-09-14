---
title: everything as input 1
subtitle: workshop 1 for the everything as input class
shortdesc: 
thumbnail: 
cssclasses: 
tags:
  - how-to
updated: 2024-09-14
---

In this workshop, we will explore p5.js as a tool to prototype with basic digital inputs. In future workshops, we will build upon the foundation to use machine learning models.
- Setting up p5.js
- Cursors
- Buttons
- Text Fields

# Setting up p5.js

1. Follow the instructions on the [Setting Up Your Environment](https://p5js.org/tutorials/setting-up-your-environment/) guide. Specifically follow the instructions to setup the p5.js web editor. 
2. If you would like your p5.js sketches to take up the full screen, use the following code:
```javascript
function setup() {
    // windowWidth and windowHeight are variables available in p5. We will set our canvas size to take up the entire available space. 
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220);
}

// When you resize the window, p5 will call this function. We will use this as an opportunity to resize the canvas to the new window width and height.  
function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}
```


# Cursor
<iframe style="aspect-ratio: 4 / 3" src="https://editor.p5js.org/andoncemore/full/4ejOnixEO"></iframe>

To prototype cursor interactions in p5, we can hide the mouse default mouse cursor and draw a cursor on the canvas at the mouse position. 

Let's start by drawing a circle at the location of your cursor. The current mouse position on the canvas is given by `mouseX` and `mouseY`. In the draw function:

```javascript
function draw() {
    //if we draw a background every frame, we basically are clearing the canvas.
    background(220);
    
    //the circle function takes an x position, y position, radius
    circle(mouseX, mouseY, 10)
}
```

1. Try removing the `background(220)` line from your draw function. What happens?

To prototype new types of cursors, we most likely would want to hide the default system cursor. We can do this with the p5 function `noCursor()`. We can set this in the setup function of our code. 

```javascript
function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
}
```


### Prototyping different cursors
Now that we have the basic cursor setup, try modifying things to play with different forms of input. The[ Interactivity page](https://p5js.jp/learn/interactivity.html) on the p5 reference has a bunch of demos that you can copy+paste into your code and modify. 

1. **Change Color:** You can change the color of your cursor by setting the stroke prior to drawing the circle. See p5.js reference on [stroke](https://p5js.org/reference/p5/stroke/) for more examples.

```javascript
function draw() {
    background(220);
    stroke('rgb(100,50,20)');
    circle(mouseX, mouseY, 10)
}
```

2. **Change Size:** We can change the radius of the circle. For example, based on the mouse position, we can make the circle bigger or smaller.

```javascript
function draw() {
    background(220);
    stroke(rgb(100,50,20));
    circle(mouseX, mouseY, 10*mouseX/500);
}
```

3. **Change Frame Rate:** p5 re-draws the canvas at a certain frame rate. We can change the frame rate to make the cursor feel more "choppy." See the [p5 documentation](https://p5js.org/reference/p5/frameRate/) for more details.  In the setup function:

```javascript
function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
    frameRate(12);
}
```

4. **Add Randomness:** p5js has a function called random which you can use to generate random numbers between two numbers. We can use this to create something like a mouse jitter. 

```javascript
function draw(){
  background(220);
  circle(mouseX+random(-50, 50), mouseY+random(-50, 50), 10);
}
```

6. **Use Previous Mouse Position:** p5.js tracks the position of the mouse position from the previous frame. We can use this to draw a line between the previous position and current position to highlight movement.  (instead of drawing a circle).

```javascript
function draw(){
  background(220);
  line(mouseX, mouseY, pmouseX, pmouseY);
}
```

7. **Fade Cursor:** Each loop of the draw function, we clear everything from the canvas using the `background()` function. Instead of clearing everything, we can use a transparent background to slowly erase the background. If we remove the `background(220)` line entirely, we can create a permanent trace of the cursor. 

```javascript
function draw(){
  background('rgba(220, 220, 220, 0.2)');
  circle(mouseX, mouseY, 20);
}

```

8. **Other Shapes:** We don't have to represent the cursor with just a circle. p5 provides functions to draw other [shapes](https://p5js.org/examples/shapes-and-color-shape-primitives/), replace your [cursor with an image](https://p5js.org/examples/imported-media-copy-image-data/), [draw text](https://p5js.org/examples/imported-media-words/) and more. Explore the p5.js reference to see what all you can do. 

### Other Examples
Here are some other examples to get inspiration from and to borrow code from:

- [Assorted examples from p5 documentation](https://p5js.jp/learn/interactivity.html)
- [Cursor Spinning in a Circle](https://editor.p5js.org/qc822/sketches/2ulNQOe5Y)
- [Changing Cursor Icon](https://editor.p5js.org/wisemonkey/sketches/ByIdMHABm)
- [Triangle Cursor](https://editor.p5js.org/jonathanheckerman/sketches/CEwf5ZQE5)
- [Mouse Following](https://medium.com/@maxswann/p5-js-mouse-following-tutorial-using-vectors-188481008b99)
- [Computer Mouse Conference & Research](https://inbetweenhumansandcomputers.net/)
- [Mouse Cursor are.na board](https://www.are.na/maxim-leyzerovich/mouse-cursor)

# Button

### Prototyping different buttons

### Other Examples and References

# Text Input

### Prototyping text input

### Other Examples and References