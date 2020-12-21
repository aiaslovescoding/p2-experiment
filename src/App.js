import './App.css';

import { useEffect } from 'react';
import { Engine, Render, Bodies, World, MouseConstraint, Mouse, Constraint, Composites, Body, Composite, Runner, Events } from 'matter-js';


function App() {

  useEffect(() => {
    init();
  });

  return (
    <div className="App">
      <header className="App-header">
        <div id="physics"></div>
        <p>
          Evolution
        </p>

      </header>
    </div>
  );


  function init() {

    var group = Body.nextGroup(true);

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
      element: document.getElementById("physics"),
      engine: engine,
      options: {
        showAngleIndicator: true,
        showCollisions: true
      }
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(200, 200, 400, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    var car = Composite.create({ label: 'Car' });

    const carBody = Bodies.rectangle(200, 60, 200, 50, {
      collisionFilter: {
        group: group
      }
    })

    const frontWheel = Bodies.circle(100, 60, 50, {
      collisionFilter: {
        group: group
      },
      friction: 0.8,

    });
    const backWheel = Bodies.circle(300, 60, 50, {
      collisionFilter: {
        group: group
      },
      friction: 0.8
    });



    var frontAxle = Constraint.create({
      bodyB: carBody,
      pointB: { x: 100, y: 0 },
      bodyA: frontWheel,
      stiffness: 1,
      length: 0
    });

    var backAxle = Constraint.create({
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


    const mouse = Mouse.create(document.getElementById("physics"))

    var myConstraint = Constraint.create({
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
      boxA,
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



    // run the engine
    const runner = Engine.run(engine);

    Events.on(runner, "beforeTick", function () {
      Body.setAngularVelocity(backWheel, 0.1);
      Body.setAngularVelocity(frontWheel, 0.1);
    })

    //  Runner.stop(runner);
    // run the renderer
    Render.run(render);
  }
}

export default App;
