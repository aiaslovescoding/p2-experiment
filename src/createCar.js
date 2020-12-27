import { Bodies, Constraint, Composite, Body} from 'matter-js';

function createCar(carCenter, wheelBase, wheelRadius) {

    const halfWheelBase = wheelBase/2
    const frontWheelX = carCenter.x + halfWheelBase
    const backWheelX = carCenter.x - halfWheelBase

    const car = Composite.create({ label: 'Car' });
    const group = Body.nextGroup(true);

    const carBody = Bodies.rectangle(carCenter.x, carCenter.y, wheelBase, 20, {
        collisionFilter: {
            group: group
        }
    })

    
    const frontWheel = Bodies.circle(frontWheelX, carCenter.y, wheelRadius, {
        collisionFilter: {
            group: group
        },
        friction: 0.8,

    });
    const backWheel = Bodies.circle(backWheelX, carCenter.y, wheelRadius, {
        collisionFilter: {
            group: group
        },
        friction: 0.8
    });

    const frontAxle = Constraint.create({
        bodyB: carBody,
        pointB: { x:  halfWheelBase, y: 0 },
        bodyA: frontWheel,
        stiffness: 1,
        length: 0
    });

    const backAxle = Constraint.create({
        bodyB: carBody,
        pointB: { x: - halfWheelBase, y: 0 },
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