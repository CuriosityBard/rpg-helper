import { Toggle } from "../inputs/Toggle.js";

export function DeathSaves(props) {
    return props.saves.map((val, idx) => {
        return (
            <Toggle key={props.type + 'save' + idx} name={props.type + '-save-' + idx} handleChange={() => {props.handleChange(idx)}} label="" checked={val} />
        );
    });
}