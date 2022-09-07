export function AutoModifier(props) {
    // props has parallel arrays, mods and vals, representing the modifier for each score value
    let modifier = props.mods[props.vals.indexOf(props.score)];

    if (modifier > 0) {
        return (
            <p className="modifier">+{modifier}</p>
        );
    }
    return (
        <p className="modifier">{modifier}</p>
    );
}