import commands, {getCommand} from './commands.js'

function Controls(props) {

    function doCommand(name) {
        props.setCommand(name);
    }

    return (
        <div>
            {commands.map(command =>
                <button key={command.name} onClick={() => doCommand(command.name)} >
                    {command.label}
                </button>)}
            <div> Command: {getCommand(props.command).label}</div>
        </div>
        )
}

export default Controls