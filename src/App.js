import './App.css';

import { useState } from 'react';
import { Engine } from 'matter-js';
import { defaultCommand } from './commands'
import Controls from './Controls.jsx'
import Physics from './Physics.jsx';

function App() {

  const [command, setCommand] = useState(defaultCommand.name);
  const [engine] = useState(Engine.create());

  return (
    <div className="App">
        <Physics engine={engine} command={command}/>
        <Controls setCommand={setCommand} command={command}></Controls>
    </div>
  );
}

export default App;
