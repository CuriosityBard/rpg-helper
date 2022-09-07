export function ClassList(props) {
    if (props.classes.length === 0) {
        return (<></>);
    }
    return props.classes.map((classData) => {
        return (
            <p key={classData.class}>
                <strong>{classData.class}</strong> {classData.level}
                <button className="remove remove-class" onClick={() => props.removeClass(classData.class, classData.level)}>X</button>
            </p>
        );
    });
}