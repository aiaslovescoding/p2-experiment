import './App.css';

import { useEffect } from 'react';
import { World, Body, Circle, Plane, RevoluteConstraint } from 'p2';


function App() {
  let ctx, canvas, world, mouseBody, mouseConstraint;

  const scaleX = 50, scaleY = -50;

  useEffect(() => {
    init();
    animate();
  });

  return (
    <div className="App">
      <header className="App-header">
        <canvas width="1500" height="1000" id="myCanvas"></canvas>
        <p>
          Evolution
        </p>

      </header>
    </div>
  );


  function init() {

    // Init canvas
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 0.05;
    createWorld();
    addMouseDownListener();
    addMouseMoveListener();
    addMouseUpListener();
  }

  // This is a simple example of building and running a simulation
  // using Box2D. Here we create a large ground box and a small dynamic
  // box.
  // There are no graphics for this example. Box2D is meant to be used
  // with your rendering engine in your game engine.

  function createWorld() {
    // Init js
    world = new World();

    world.addBody(createCircle(0.5, [2, 2], [0, 0]));
    world.addBody(createCircle(0.5, [-1, 2], [0, 0]));

    world.addBody(createCircle(1, [0, 4], [0, 0]));
    world.addBody(createCircle(0.5, [2, 4], [0, 0]));
    world.addBody(createCircle(1, [5, 6], [0, 0]));

    const rightElbowJoint = new RevoluteConstraint(world.bodies[0], world.bodies[1], {
      localPivotA: [0, 0],
      localPivotB: [2, 0],
    });


    const rightElbowJoint2 = new RevoluteConstraint(world.bodies[1], world.bodies[2], {
      localPivotA: [0, 0],
      localPivotB: [2, 0],
    });

    const rightElbowJoint3 = new RevoluteConstraint(world.bodies[2], world.bodies[3], {
      localPivotA: [0, 0],
      localPivotB: [2, 0],
    });

    const rightElbowJoint4 = new RevoluteConstraint(world.bodies[3], world.bodies[0], {
      localPivotA: [0, 0],
      localPivotB: [2, 0],
    });

    world.addConstraint(rightElbowJoint);
    world.addConstraint(rightElbowJoint2);
    world.addConstraint(rightElbowJoint3);
    world.addConstraint(rightElbowJoint4);

    mouseBody = new Body();
    world.addBody(mouseBody);

    // Add a plane
    var planeShape = new Plane();
    var planeBody = new Body();
    planeBody.addShape(planeShape);
    world.addBody(planeBody);
    
  }

  function createCircle(radius, position, velocity) {
    const circleShape = new Circle({ radius });
    const circleBody = new Body({ mass: 1, position, velocity });
    circleBody.addShape(circleShape);
    return circleBody;
  }

  function addMouseDownListener() {
    canvas.addEventListener('mousedown', function (event) {

      // Convert the canvas coordinate to physics coordinates
      var position = getPhysicsCoord(event);

      // Check if the cursor is inside the box
      var hitBodies = world.hitTest(position, world.bodies);

      if (hitBodies.length) {

        // Move the mouse body to the cursor position
        mouseBody.position[0] = position[0];
        mouseBody.position[1] = position[1];

        // Create a RevoluteConstraint.
        // This constraint lets the bodies rotate around a common point
        mouseConstraint = new RevoluteConstraint(mouseBody, hitBodies[0], {
          worldPivot: position,
          collideConnected: false
        });
        world.addConstraint(mouseConstraint);
      }
    });
  }

  function addMouseMoveListener() {
    // Sync the mouse body to be at the cursor position
    canvas.addEventListener('mousemove', function (event) {
      var position = getPhysicsCoord(event);
      mouseBody.position[0] = position[0];
      mouseBody.position[1] = position[1];
    });
  }

  function addMouseUpListener() {
    // Remove the mouse constraint on mouse up
    canvas.addEventListener('mouseup', function (event) {
      world.removeConstraint(mouseConstraint);
      mouseConstraint = null;
    });
  }


  // Convert a canvas coordiante to physics coordinate
  function getPhysicsCoord(mouseEvent) {
    var rect = canvas.getBoundingClientRect();
    var x = mouseEvent.clientX - rect.left;
    var y = mouseEvent.clientY - rect.top;

    x = (x - canvas.width / 2) / scaleX;
    y = (y - canvas.height / 2) / scaleY;

    return [x, y];
  }

  function renderPlane(position) {
    ctx.strokeStyle = "#00FF00";
    ctx.beginPath();
    ctx.moveTo(-canvas.width, position[1]);
    ctx.lineTo(canvas.width, position[1]);
    ctx.stroke();
  }

  function renderCircle(position, radius) {
    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(position[0], position[1], radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  function renderBody(body) {
    body.shapes.forEach(shape => {
      if (shape.type === 1) {
        renderCircle(body.position, shape.radius);
      }

      if (body.type === 2) {
        renderPlane(body.position);
      }
    })
  }

  function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Transform the canvas
    // Note that we need to flip the y axis since Canvas pixel coordinates
    // goes from top to bottom, while physics does the opposite.
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);  // Translate to the center
    ctx.scale(scaleX, scaleY);       // Zoom in and flip y axis

    world.bodies.forEach(renderBody);

    // Restore transform
    ctx.restore();
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Move physics bodies forward in time
    world.step(1 / 60);

    // Render scene
    render();
  }
}

export default App;
