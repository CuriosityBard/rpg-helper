export function Modifier(props) {
    if (props.modifier > 0) {
        return (
            <p className="modifier">+{props.modifier}</p>
        );
    }
    return (
        <p className="modifier">{props.modifier}</p>
    );
}