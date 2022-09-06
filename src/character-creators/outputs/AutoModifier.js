export function AutoModifier(props) {
    // props has parallel arrays, mods and vals, representing the modifier for each score value
    let modifier = props.mods[props.vals.indexOf(props.score)];

    return (
        <p className="modifier">{modifier}</p>
    );
}