import { Number } from "../inputs/Number.js";
import { AutoModifier } from "../outputs/AutoModifier.js";

export function Ability(props) {
    return (
        <div id={props.ability.toLowerCase()} className="ability">
            <h4>{props.ability}</h4>
            <Number inputName={props.ability + "-score"} inputLabel="" inputValue={props.score} inputOnChange={props.handleAbilityChange} /> 
            <AutoModifier vals={props.abilityVals} mods={props.abilityMods} score={props.score} />
        </div>
    );
}