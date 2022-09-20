import { Number } from "../inputs/Number.js";
import { Toggle } from "../inputs/Toggle.js";
import { Modifier } from "../outputs/Modifier.js";

export function CanHaveProficiency(props) {
    let total = props.modifier + props.bonus + (props.proficiency ? props.proficiencyBonus : 0);

    return (
        <div id={props.idname} className={props.category}>
            <h4>{props.name}</h4>
            <Number inputName={props.idname + "-score"} inputLabel="Bonus" inputValue={props.bonus} inputOnChange={props.handleChange} min={props.min} max={props.max} />
            <Toggle name={props.idname + '-proficiency'} handleChange={props.handleProficiencyChange} label="Proficiency" />
            <Modifier modifier={total} />
        </div>
    );
}