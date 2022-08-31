import { useState, useEffect } from "react";
import { LineText } from "./LineText.js";
import { Number } from "./Number.js";

export function AddClass(props) {
    const [classToAdd, setClassToAdd] = useState({
        name: "",
        level: 0
    });

    function handleClassChange(event, aspect) {
        let newClass = {...classToAdd};
        newClass[aspect] = event.target.value;
        setClassToAdd(newClass);
    }
    
    // add new class to total classes 
    function AddNewClass() {
        props.addToList(classToAdd.name, classToAdd.level);
    }

    // immediately update class info
    useEffect(() => {return;}, [classToAdd]);

    return (
        <div id="class-input">
            <LineText inputName="class-name" inputLabel="Class Name" inputValue={classToAdd.name} inputOnChange={(e) => handleClassChange(e, "name")} />
            <Number inputName="class-level" inputLabel="Class Level" inputValue={classToAdd.level} inputOnChange={(e) => handleClassChange(e, "level")} />
            <button id="class-submit" onClick={AddNewClass}>Add Class</button>
        </div>
    );
}