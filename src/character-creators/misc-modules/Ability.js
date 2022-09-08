import { Number } from "../inputs/Number.js";
import { Modifier } from "../outputs/Modifier.js";

export function Ability(props) {
    return (
        <div id={props.ability.toLowerCase()} className="ability">
            <h4>{props.ability}</h4>
            <Number inputName={props.ability + "-score"} inputLabel="" inputValue={props.score} inputOnChange={props.handleAbilityChange} min={props.min} max={props.max} /> 
            <Modifier modifier={props.modifier} />
        </div>
    );
}