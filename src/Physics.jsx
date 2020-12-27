import { useEffect, useState } from 'react';
import { Engine, Render, Bodies, World, MouseConstraint, Mouse, Constraint } from 'matter-js';
import { doCommand } from './commands'

function Physics(props) {
    const [mouseStart, setMouseStart] = useState(null);
    const [mouse, setMouse] = useState(null);

    useEffect(init, [props.engine]);

    return <div id="physics" onMouseDown={_onMouseDown} onMouseUp={_onMouseUp}></div>

    function _onMouseDown() {
        setMouseStart({ ...mouse.position });
    }

    function _onMouseUp() {
        const mouseFinish = mouse.position;
        doCommand(props.command, props.engine, mouseStart, mouseFinish);
    }

    function init() {
        const mainElement = document.getElementById("physics");

        Array.from(mainElement.children).forEach(child => child.remove())
        const initMouse = Mouse.create(mainElement);
        setMouse(initMouse);

        const render = Render.create({
            element: mainElement,
            engine: props.engine,
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

        const mouseConstraint = MouseConstraint.create(props.engine, { mouse: initMouse, constraint: myConstraint })

        World.add(props.engine.world, [
            ground,
            mouseConstraint
        ]);

        Engine.run(props.engine);
        Render.run(render);
    }
}

export default Physics