export function Number(props) {
    return (
        <div className="number">
            <label htmlFor={props.inputName}>{props.inputLabel}: </label><input type="number" id={props.inputName} value={props.inputValue} onChange={props.inputOnChange} />
        </div>
    );
}