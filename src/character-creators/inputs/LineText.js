export function LineText(props) {
    return (
        <div className="linetext">
            <label htmlFor={props.inputName}>{props.inputLabel}: </label><input type="text" id={props.inputName} value={props.inputValue} onChange={props.inputOnChange} />
        </div>
    );
}