import { Number } from "../inputs/Number.js";

export function BaseTen(props) {
    let total = 10 + props.abilityModifier + props.bonus;
    return (
        <div id={props.name} className="base-ten-value">
            <Number inputName={props.name + "-bonus"} inputLabel={props.label + " Bonus"} inputValue={props.bonus} inputOnChange={props.handleBonusChange} />
            <p><strong>{props.label}: </strong>{total}</p>
        </div>
    );
}