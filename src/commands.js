import { Bodies, World, Composites, Events, Body } from 'matter-js';
import createCar from './createCar.js';

function mouseXDistance(mouseStart, mouseFinish) {
    return Math.abs(mouseStart.x - mouseFinish.x);
}

function mouseYDistance(mouseStart, mouseFinish) {
    return Math.abs(mouseStart.y - mouseFinish.y);
}

function mouseDistance(mouseStart, mouseFinish) {
    return ((mouseStart.y - mouseFinish.y) ** 2 + (mouseStart.x - mouseFinish.x) ** 2) ** 0.5;
}

const commands = [
    {
        label: 'Make Rectangle',
        name: 'makeRectangle',
        doCommand: function (engine, mouseStart, mouseFinish) {
            const mouseXMiddle = (mouseStart.x + mouseFinish.x) / 2;
            const mouseYMiddle = (mouseStart.y + mouseFinish.y) / 2;
            const width = mouseXDistance(mouseStart, mouseFinish)
            const height = mouseYDistance(mouseStart, mouseFinish)
            const rectangle = Bodies.rectangle(mouseXMiddle, mouseYMiddle, width, height, { isStatic: false });
            World.add(engine.world, rectangle);
        }
    },
    {
        label: 'Make Circle',
        name: 'makeCircle',
        doCommand: function (engine, mouseStart, mouseFinish) {
            const radius = mouseDistance(mouseStart, mouseFinish);
            const circle = Bodies.circle(mouseStart.x, mouseStart.y, radius);
            World.add(engine.world, circle);
        }
    },
    {
        label: 'Make Pyramid',
        name: 'makePyramid',
        doCommand: function (engine, mouseStart, mouseFinish) {
            const shapeSize = 30
            const pyraWidth = Math.round(mouseXDistance(mouseStart, mouseFinish) / shapeSize)
            const pyramid4 = Composites.pyramid(mouseStart.x, mouseStart.y, pyraWidth, 30, 0, 0, function (x, y) {
                return Bodies.rectangle(x, y, shapeSize, shapeSize);
            });
            World.add(engine.world, pyramid4);
        }
    },
    {
        label: 'Make Car',
        name: 'makeCar',
        doCommand: function (engine, mouseStart, mouseFinish) {
            const carCenter = mouseStart;
            const wheelBase = mouseXDistance(mouseStart, mouseFinish) * 2
            const wheelRadius = mouseYDistance(mouseStart, mouseFinish);
            const { car, backWheel, frontWheel } = createCar(carCenter, wheelBase, wheelRadius)

            Events.on(engine, "beforeUpdate", function () {
                Body.setAngularVelocity(backWheel, .5);
                Body.setAngularVelocity(frontWheel, .5);
              })

            World.add(engine.world, car);
        }
    },
    {
        label: 'Do Nothing',
        name: 'doNothing',
        doCommand: function (engine, mouseStart, mouseFinish) {

        }
    },
]

const indexedCommands = Object.assign({}, ...commands.map(command => ({ [command.name]: command })));
const defaultCommand = indexedCommands['doNothing'];

function getCommand(commandName) {
    return indexedCommands[commandName];
}

function doCommand(commandName, engine, mouseStart, mouseFinish) {
    const commandToExecute = getCommand(commandName);
    if (commandToExecute) {
        commandToExecute.doCommand(engine, mouseStart, mouseFinish)
    }
}



export default commands;
export { doCommand, defaultCommand, getCommand };