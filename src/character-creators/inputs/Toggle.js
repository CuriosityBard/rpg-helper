export function Toggle(props) {
    return (
        <div className="toggle">
            <input type="checkbox" id={props.name} onChange={props.handleChange} checked={props.checked} />
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    );
}