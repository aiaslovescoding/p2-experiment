(this["webpackJsonpaias-evolution"]=this["webpackJsonpaias-evolution"]||[]).push([[0],{12:function(e,o,t){},13:function(e,o,t){},15:function(e,o,t){"use strict";t.r(o);var n=t(1),i=t(2),s=t.n(i),r=t(5),c=t.n(r),a=(t(12),t(3)),d=t(6),l=(t(13),t(0));var u=function(){var e,o,t,s;return Object(i.useEffect)((function(){!function(){var o;Array.from(document.getElementById("physics").children).forEach((function(e){return e.remove()})),e=l.Mouse.create(document.getElementById("physics"));var n=l.Body.nextGroup(!0);t=l.Engine.create();var i=l.Render.create({element:document.getElementById("physics"),engine:t,options:(o={showAngleIndicator:!0,showCollisions:!0,width:2200,showDebug:!0,showPositions:!0,showIds:!0,showShadows:!0,showVertexNumbers:!1,showVelocity:!0},Object(a.a)(o,"showCollisions",!0),Object(a.a)(o,"showSeparations",!0),Object(a.a)(o,"showShadows",!0),o)}),s=l.Bodies.rectangle(400,610,3e4,60,{isStatic:!0}),r=l.Composite.create({label:"Car"}),c=l.Bodies.rectangle(200,60,200,20,{collisionFilter:{group:n}}),d=l.Bodies.circle(100,60,70,{collisionFilter:{group:n},friction:.8}),u=l.Bodies.circle(300,60,70,{collisionFilter:{group:n},friction:.8}),h=l.Constraint.create({bodyB:c,pointB:{x:100,y:0},bodyA:d,stiffness:1,length:0}),p=l.Constraint.create({bodyB:c,pointB:{x:-100,y:0},bodyA:u,stiffness:1,length:0});l.Composite.add(r,c),l.Composite.add(r,d),l.Composite.add(r,u),l.Composite.addConstraint(r,h),l.Composite.addConstraint(r,p);var f=l.Constraint.create({label:"Mouse Constraint",pointA:e.position,pointB:{x:0,y:0},length:.01,stiffness:1,angularStiffness:0,render:{strokeStyle:"#90EE90",lineWidth:3}}),g=l.MouseConstraint.create(t,{mouse:e,constraint:f});l.World.add(t.world,[s]),l.World.add(t.world,[g]),l.World.add(t.world,r);var b=l.Composites.pyramid(1300,0,15,30,0,0,(function(e,o){return l.Bodies.rectangle(e,o,20,30)}));l.World.add(t.world,b);var y=l.Engine.run(t);l.Events.on(y,"beforeTick",(function(){l.Body.setAngularVelocity(u,.5),l.Body.setAngularVelocity(d,.5)})),l.Render.run(i)}()})),Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)("header",{className:"App-header",children:[Object(n.jsx)("div",{id:"physics",onMouseDown:function(){s=Object(d.a)({},e.position)},onMouseUp:function(){var n=e.position;if(console.log(s,n),"makeRectangle"===o){var i=(s.x+n.x)/2,r=(s.y+n.y)/2,c=Math.abs(s.x-n.x),a=Math.abs(s.y-n.y),d=l.Bodies.rectangle(i,r,c,a,{isStatic:!0});l.World.add(t.world,d)}if("makeCircle"===o){var u=2^(s.y-n.y^s.x-n.x+2);d=l.Bodies.circle(e.position.x,e.position.y,u);l.World.add(t.world,d)}}}),Object(n.jsx)("button",{onClick:function(){o="makeRectangle"},children:"Make Rectangles"}),Object(n.jsx)("button",{onClick:function(){o="makeCircle"},children:"Make Circles"}),Object(n.jsx)("button",{onClick:function(){o="doNothing"},children:"Do Nothing"}),Object(n.jsx)("p",{children:"Evolution"})]})})},h=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,16)).then((function(o){var t=o.getCLS,n=o.getFID,i=o.getFCP,s=o.getLCP,r=o.getTTFB;t(e),n(e),i(e),s(e),r(e)}))};c.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(u,{})}),document.getElementById("root")),h()}},[[15,1,2]]]);
//# sourceMappingURL=main.a715c6f9.chunk.js.map