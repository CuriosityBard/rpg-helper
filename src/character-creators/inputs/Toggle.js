export function Toggle(props) {
    return (
        <div className="toggle">
            <input type="checkbox" id={props.name} onChange={props.handleChange} />
            <label for={props.name}>Proficiency</label>
        </div>
    );
}