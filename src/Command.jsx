import commands, {getCommand} from './commands.js'
import {switchCommand} from './events.js'


function Command(props) {

    return (
            <button key={props.command.name} onClick={() => switchCommand.next(props.command)} >
                {props.command.label}
            </button>
        )
}

export default Command