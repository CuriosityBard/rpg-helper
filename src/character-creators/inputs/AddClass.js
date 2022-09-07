import { useState, useEffect } from "react";
import { ClassList } from "../outputs/ClassList.js";
import { LineText } from "./LineText.js";
import { Number } from "./Number.js";

export function AddClass(props) {
    const [classToAdd, setClassToAdd] = useState({
        name: "",
        level: 0
    });

    function handleClassChange(event, aspect) {
        let newClass = {...classToAdd};
        if (aspect === "level") {
            newClass[aspect] = parseInt(event.target.value);
        } else {
            newClass[aspect] = event.target.value;
        }
        setClassToAdd(newClass);
    }
    
    // add new class to total classes 
    function AddNewClass() {
        if (!(classToAdd.name === "" || classToAdd.level === 0)) {
            props.addToList(classToAdd.name, classToAdd.level);
            setClassToAdd({name: "", level: 0});
            document.getElementById("class-input").firstChild.lastChild.focus();
        }
    }

    // immediately update class info
    useEffect(() => {return;}, [classToAdd]);

    // event listener so user can hit enter to add a class
    let input = document.getElementById("class-input");
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                document.getElementById("class-submit").click();
            }
        });
    }
    

    return (
        <div id="class-input">
            <LineText inputName="class-name" inputLabel="Class Name" inputValue={classToAdd.name} inputOnChange={(e) => handleClassChange(e, "name")} />
            <Number inputName="class-level" inputLabel="Class Level" inputValue={classToAdd.level} inputOnChange={(e) => handleClassChange(e, "level")} />
            <button id="class-submit" onClick={AddNewClass}>Add Class</button>
        </div>
    );
}