import './App.css';

import { useEffect } from 'react';
import { Engine, Render, Bodies, World, MouseConstraint, Mouse, Constraint, Body, Composite, Events, Composites } from 'matter-js';


function App() {
  let mouse;
  let command;
  let engine;
  let mouseStart;

  useEffect(() => {
    init();
  });

  return (
    <div className="App">
      <header className="App-header">
        <div id="physics" onMouseDown={_onMouseDown} onMouseUp={_onMouseUp}></div>
        <button onClick={makeRectangles}>
          Make Rectangles
        </button>
        <button onClick={makeCircles}>
          Make Circles
        </button>
        <button onClick={doNothing}>
          Do Nothing
        </button>
        <p>
          Evolution
        </p>

      </header>
    </div>
  );

  function _onMouseDown() {
    mouseStart = {...mouse.position};
  }

  function _onMouseUp() {
    const mouseFinish = mouse.position;
    console.log(mouseStart,mouseFinish);
    
    if (command === "makeRectangle") {
      const mouseXMiddle = (mouseStart.x + mouseFinish.x) / 2;
      const mouseYMiddle = (mouseStart.y + mouseFinish.y) / 2;
      const width = Math.abs(mouseStart.x - mouseFinish.x)
      const height = Math.abs(mouseStart.y - mouseFinish.y)
      const rectangle = Bodies.rectangle(mouseXMiddle,mouseYMiddle , width, height, { isStatic: true });
      World.add(engine.world, rectangle);
    }
    if (command === "makeCircle") {
      const radius = ((mouseStart.y - mouseFinish.y) ^ 2 + (mouseStart.x - mouseFinish.x) ^ 2) ^ 0.5
      const circle = Bodies.circle(mouse.position.x, mouse.position.y, radius);
      World.add(engine.world, circle);
    }

  }

  function makeRectangles() {
    command = "makeRectangle";
  }

  function makeCircles() {
    command = "makeCircle";
  }
  function doNothing() {
    command = "doNothing";
  }

  function init() {
    Array.from(document.getElementById("physics").children).forEach(child => child.remove())
    mouse = Mouse.create(document.getElementById("physics"));
    const group = Body.nextGroup(true);

    // create an engine
    engine = Engine.create();

    // create a renderer
    const render = Render.create({
      element: document.getElementById("physics"),
      engine: engine,
      options: {
        showAngleIndicator: true,
        showCollisions: true,
        width: 2200,
        showDebug: true,
        showPositions: true,
        showIds: true,
        showShadows: true,
        showVertexNumbers: false,
        showVelocity: true,
        showSeparations: true,
      }
    });

    // create two boxes and a ground
    const ground = Bodies.rectangle(400, 610, 30000, 60, { isStatic: true });

    const car = Composite.create({ label: 'Car' });

    const carBody = Bodies.rectangle(200, 60, 200, 20, {
      collisionFilter: {
        group: group
      }
    })

    const frontWheel = Bodies.circle(100, 60, 70, {
      collisionFilter: {
        group: group
      },
      friction: 0.8,

    });
    const backWheel = Bodies.circle(300, 60, 70, {
      collisionFilter: {
        group: group
      },
      friction: 0.8
    });



    const frontAxle = Constraint.create({
      bodyB: carBody,
      pointB: { x: 100, y: 0 },
      bodyA: frontWheel,
      stiffness: 1,
      length: 0
    });

    const backAxle = Constraint.create({
      bodyB: carBody,
      pointB: { x: -100, y: 0 },
      bodyA: backWheel,
      stiffness: 1,
      length: 0
    });





    Composite.add(car, carBody)
    Composite.add(car, frontWheel)
    Composite.add(car, backWheel)

    Composite.addConstraint(car, frontAxle);
    Composite.addConstraint(car, backAxle);


    const myConstraint = Constraint.create({
      label: 'Mouse Constraint',
      pointA: mouse.position,
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 1,
      angularStiffness: 0,
      render: {
        strokeStyle: '#90EE90',
        lineWidth: 3
      }
    });

    const mouseConstraint = MouseConstraint.create(engine, { mouse, constraint: myConstraint })

    // add all of the bodies to the world
    World.add(engine.world, [
      //     boxA,
      //boxB, 
      ground]);

    World.add(engine.world, [
      mouseConstraint,
      //  frontAxle, 
      //  backAxle
    ]);

    //   World.add(engine.world, Composites.car(150, 100, 150 , 30 , 30 ));

    //   const constraint = Constraint.create({ bodyA: boxA, bodyB: boxB })
    //   World.add(engine.world, constraint);
    World.add(engine.world, car);

    const pyramid2 = Composites.pyramid(1300, 0, 15, 30, 0, 0, function (x, y) {
      return Bodies.rectangle(x, y, 20, 30);
    });

    //var pyramid3 = Composites.pyramid(800, 0, 12, 12, 0, 0, function (x, y) {
    //return Bodies.circle(x, y, 8);
    //});

    World.add(engine.world, pyramid2);
    //World.add(engine.world, pyramid3);

    // run the engine
    const runner = Engine.run(engine);

    Events.on(runner, "beforeTick", function () {
      Body.setAngularVelocity(backWheel, .5);
      Body.setAngularVelocity(frontWheel, .5);
    })

    //  Runner.stop(runner);
    // run the renderer
    Render.run(render);
  }
}

export default App;
