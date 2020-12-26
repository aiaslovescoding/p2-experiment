import { Bodies, Constraint, Composite, Body} from 'matter-js';

function createCar() {
    const car = Composite.create({ label: 'Car' });
    const group = Body.nextGroup(true);

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

    return {car, backWheel, frontWheel};
}

export default createCar;