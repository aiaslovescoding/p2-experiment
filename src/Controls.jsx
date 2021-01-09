import commands from './commands.js'
import {switchCommand} from './events.js'
import Command from "./Command.jsx"


import { useState, useEffect } from 'react';


function Controls() {

    const [commandLabel, setCommandLabel] = useState();

    useEffect(() => switchCommand.subscribe(data => {setCommandLabel(data.label)}), []);

    return (
        <div>
            {commands.map(command =>
                <Command command={command} >
                </Command>)}
            <div> Command: {commandLabel}</div>
        </div>
        )
}

export default Controls