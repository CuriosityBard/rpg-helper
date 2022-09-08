export function AutoModifier(props) {
    // props has parallel arrays, mods and vals, representing the modifier for each score value
    let modifier = props.getModifier(props.score, props.vals, props.mods);

    if (modifier > 0) {
        return (
            <p className="modifier">+{modifier}</p>
        );
    }
    return (
        <p className="modifier">{modifier}</p>
    );
}