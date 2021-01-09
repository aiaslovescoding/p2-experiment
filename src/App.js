import './App.css';

import { useState, useEffect } from 'react';
import { Engine } from 'matter-js';
import { defaultCommand } from './commands'
import Controls from './Controls.jsx'
import Physics from './Physics.jsx';

import {bindCommandProcessor} from './commandProcessor.js';

function App() {

  const [command, setCommand] = useState(defaultCommand.name);
  const [engine] = useState(Engine.create());

  useEffect(() => {return bindCommandProcessor()}, []);



  return (
    <div className="App">
        <Physics engine={engine} command={command}/>
        <Controls setCommand={setCommand} command={command}></Controls>
    </div>
  );
}

export default App;
