export function Number(props) {
    if (props.inputLabel === "") {
        return (
            <div className="number">
                <input type="number" id={props.inputName} value={props.inputValue} onChange={props.inputOnChange} />
            </div>
        );
    }
    return (
        <div className="number">
            <label htmlFor={props.inputName}>{props.inputLabel}: </label><input type="number" id={props.inputName} value={props.inputValue} onChange={props.inputOnChange} />
        </div>
    );
}