import {mouseDown, mouseUp, switchCommand} from './events.js';


export const bindCommandProcessor = () => {

    //const mouseDownSub = mouseDown.subscribe(data => console.log("mouse down", data ));
    //const mouseUpSub = mouseUp.subscribe(data => console.log("mouse up",  data ));
    const switchCommandSub = switchCommand.subscribe(data => console.log("switch command",  data ));

    return () => {
        console.log("unsub"); 
      //  mouseDownSub.unsubscribe();
      //  mouseUpSub.unsubscribe();
        switchCommandSub.unsubscribe();

    }
};