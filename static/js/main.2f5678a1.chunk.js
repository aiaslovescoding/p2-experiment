(this["webpackJsonpaias-evolution"]=this["webpackJsonpaias-evolution"]||[]).push([[0],{16:function(e,n,t){},17:function(e,n,t){},19:function(e,n,t){"use strict";t.r(n);var o=t(1),a=t(2),i=t.n(a),r=t(8),c=t.n(r),s=(t(16),t(3)),d=(t(17),t(0)),l=t(6),u=t(10);var m=function(e,n,t){var o=n/2,a=e.x+o,i=e.x-o,r=d.Composite.create({label:"Car"}),c=d.Body.nextGroup(!0),s=d.Bodies.rectangle(e.x,e.y,n,20,{collisionFilter:{group:c}}),l=d.Bodies.circle(a,e.y,t,{collisionFilter:{group:c},friction:.8}),u=d.Bodies.circle(i,e.y,t,{collisionFilter:{group:c},friction:.8}),m=d.Constraint.create({bodyB:s,pointB:{x:o,y:0},bodyA:l,stiffness:1,length:0}),b=d.Constraint.create({bodyB:s,pointB:{x:-o,y:0},bodyA:u,stiffness:1,length:0});return d.Composite.add(r,s),d.Composite.add(r,l),d.Composite.add(r,u),d.Composite.addConstraint(r,m),d.Composite.addConstraint(r,b),{car:r,backWheel:u,frontWheel:l}};function b(e,n){return Math.abs(e.x-n.x)}function f(e,n){return Math.abs(e.y-n.y)}var h=[{label:"Make Rectangle",name:"makeRectangle",doCommand:function(e,n,t){var o=(n.x+t.x)/2,a=(n.y+t.y)/2,i=b(n,t),r=f(n,t),c=d.Bodies.rectangle(o,a,i,r,{isStatic:!1});d.World.add(e.world,c)}},{label:"Make Circle",name:"makeCircle",doCommand:function(e,n,t){var o=function(e,n){return Math.pow(Math.pow(e.y-n.y,2)+Math.pow(e.x-n.x,2),.5)}(n,t),a=d.Bodies.circle(n.x,n.y,o);d.World.add(e.world,a)}},{label:"Make Pyramid",name:"makePyramid",doCommand:function(e,n,t){var o=Math.round(b(n,t)/30),a=d.Composites.pyramid(n.x,n.y,o,30,0,0,(function(e,n){return d.Bodies.rectangle(e,n,30,30)}));d.World.add(e.world,a)}},{label:"Make Car",name:"makeCar",doCommand:function(e,n,t){var o=n,a=2*b(n,t),i=f(n,t),r=m(o,a,i),c=r.car,s=r.backWheel,l=r.frontWheel;d.Events.on(e,"beforeUpdate",(function(){d.Body.setAngularVelocity(s,.5),d.Body.setAngularVelocity(l,.5)})),d.World.add(e.world,c)}},{label:"Do Nothing",name:"doNothing",doCommand:function(e,n,t){}}],p=Object.assign.apply(Object,[{}].concat(Object(u.a)(h.map((function(e){return Object(l.a)({},e.name,e)}))))),g=p.doNothing;function y(e){return p[e]}var C=h;var j=function(e){return Object(o.jsxs)("div",{children:[C.map((function(n){return Object(o.jsx)("button",{onClick:function(){return t=n.name,void e.setCommand(t);var t},children:n.label},n.name)})),Object(o.jsxs)("div",{children:[" Command: ",y(e.command).label]})]})},v=t(9);var x=function(e){var n=Object(a.useState)(null),t=Object(s.a)(n,2),i=t[0],r=t[1],c=Object(a.useState)(null),l=Object(s.a)(c,2),u=l[0],m=l[1];return Object(a.useEffect)((function(){var n=document.getElementById("physics");Array.from(n.children).forEach((function(e){return e.remove()}));var t=d.Mouse.create(n);m(t);var o=d.Render.create({element:n,engine:e.engine,options:{showAngleIndicator:!0,showCollisions:!0,width:2200,showDebug:!0,showPositions:!0,showIds:!0,showShadows:!0,showVertexNumbers:!1,showVelocity:!0,showSeparations:!0}}),a=d.Bodies.rectangle(400,610,3e4,60,{isStatic:!0}),i=d.Constraint.create({label:"Mouse Constraint",pointA:t.position,pointB:{x:0,y:0},length:.01,stiffness:1,angularStiffness:0,render:{strokeStyle:"#90EE90",lineWidth:3}}),r=d.MouseConstraint.create(e.engine,{mouse:t,constraint:i});d.World.add(e.engine.world,[a,r]),d.Engine.run(e.engine),d.Render.run(o)}),[e.engine]),Object(o.jsx)("div",{id:"physics",onMouseDown:function(){r(Object(v.a)({},u.position))},onMouseUp:function(){var n=u.position;!function(e,n,t,o){var a=y(e);a&&a.doCommand(n,t,o)}(e.command,e.engine,i,n)}})};var O=function(){var e=Object(a.useState)(g.name),n=Object(s.a)(e,2),t=n[0],i=n[1],r=Object(a.useState)(d.Engine.create()),c=Object(s.a)(r,1)[0];return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)(x,{engine:c,command:t}),Object(o.jsx)(j,{setCommand:i,command:t})]})},w=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,20)).then((function(n){var t=n.getCLS,o=n.getFID,a=n.getFCP,i=n.getLCP,r=n.getTTFB;t(e),o(e),a(e),i(e),r(e)}))};c.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(O,{})}),document.getElementById("root")),w()}},[[19,1,2]]]);
//# sourceMappingURL=main.2f5678a1.chunk.js.map