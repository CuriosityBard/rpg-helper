import { Number } from "../inputs/Number.js";
import { Modifier } from "../outputs/Modifier.js";

export function AbilityPlusBonus(props) {
    let total = props.modifier + props.bonus;
    return (
        <div id={props.idname} className={props.category}>
            <h4>{props.name}</h4>
            <Number inputName={props.idname + "-score"} inputLabel="Bonus" inputValue={props.bonus} inputOnChange={props.handleChange} min={props.min} max={props.max} /> 
            <Modifier modifier={total} />
        </div>
    );
}