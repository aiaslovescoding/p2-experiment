import './App.css';

import { useEffect, useState } from 'react';
import { Engine, Render, Bodies, World, MouseConstraint, Mouse, Constraint, Body, Events, Composites } from 'matter-js';
import createCar from './createCar.js'
import { doCommand, defaultCommand } from './commands'
import Controls from './Controls.jsx'

function App() {

  const [command, setCommand] = useState(defaultCommand.name);
  const [mouse, setMouse] = useState(null);
  const [engine, setEngine] = useState(null);
  const [mouseStart, setMouseStart] = useState(null);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
        <div id="physics" onMouseDown={_onMouseDown} onMouseUp={_onMouseUp}></div>
        <Controls setCommand={setCommand} command={command}></Controls>
        <div>
          {mouseStart && `${mouseStart.x}, ${mouseStart.y}`}
        </div>
    </div>
  );

  function _onMouseDown() {
    setMouseStart({...mouse.position});
  }

  function _onMouseUp() {
    const mouseFinish = mouse.position;
    doCommand(command, engine, mouseStart, mouseFinish);
  }

  function init() {
    Array.from(document.getElementById("physics").children).forEach(child => child.remove())
    const initMouse = Mouse.create(document.getElementById("physics"));
    setMouse(initMouse);

    const { car, frontWheel, backWheel } = createCar();

    // create an engine
    const initEngine = Engine.create();

    // create a renderer
    const render = Render.create({
      element: document.getElementById("physics"),
      engine: initEngine,
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

    const ground = Bodies.rectangle(400, 610, 30000, 60, { isStatic: true });

    const myConstraint = Constraint.create({
      label: 'Mouse Constraint',
      pointA: initMouse.position,
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 1,
      angularStiffness: 0,
      render: {
        strokeStyle: '#90EE90',
        lineWidth: 3
      }
    });

    const mouseConstraint = MouseConstraint.create(initEngine, { mouse: initMouse, constraint: myConstraint })


    World.add(initEngine.world, [
      ground, mouseConstraint, car]);

    const pyramid2 = Composites.pyramid(1300, 0, 15, 30, 0, 0, function (x, y) {
      return Bodies.rectangle(x, y, 20, 30);
    });

    World.add(initEngine.world, pyramid2);

    const runner = Engine.run(initEngine);

    Events.on(runner, "beforeTick", function () {
      Body.setAngularVelocity(backWheel, .5);
      Body.setAngularVelocity(frontWheel, .5);
    })


    Render.run(render);
    setEngine(initEngine);
  }
}

export default App;
