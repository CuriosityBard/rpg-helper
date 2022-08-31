import { useEffect, useState } from "react";
import { LineText } from "./inputs/LineText.js";
import { Number } from "./inputs/Number.js";
import { AddClass } from "./inputs/AddClass.js";
import { ClassList } from "./outputs/ClassList.js";

export function DnD() {
    const [character, setCharacter] = useState({
        charName: "",
        playerName: "",
        experience: 0,
        race: "", 
        class: [],
        background: "",
        alignment: "",
    });

    // generic change handlers
    function handleTextChange(event, section) {
        let newChar = {...character};
        newChar[section] = event.target.value;
        setCharacter(newChar);
    }
    function handleIntegerChange(event, section) {
        let newChar = {...character};
        newChar[section] = parseInt(event.target.value);
        setCharacter(newChar);
    }
    // specific change handlers 
    function addClassToList(className, classLevel) {
        let newChar = {...character};
        newChar.class.push({
            class: className,
            level: classLevel
        });
        setCharacter(newChar);
    }

    // update sheet immediately when character changes
    useEffect(() => {
        return;
    }, [character]); 

    return (
        <div id="dnd-sheet">
            <section id="identifiers" className="sheet-section">
                <LineText inputName="char-name" inputLabel="Character Name" inputValue={character.charName} inputOnChange={(e) => handleTextChange(e, "charName")} />
                <LineText inputName="player-name" inputLabel="Player Name" inputValue={character.playerName} inputOnChange={(e) => handleTextChange(e, "playerName")} />
                <Number inputName="experience" inputLabel="Experience Points" inputValue={character.experience} inputOnChange={(e) => handleIntegerChange(e, "experience")} />
                <LineText inputName="race" inputLabel="Race" inputValue={character.race} inputOnChange={(e) => handleTextChange(e, "race")} />
                <ClassList classes={character.class} />
                <AddClass addToList={addClassToList} />
                <LineText inputName="background" inputLabel="Background" inputValue={character.background} inputOnChange={(e) => handleTextChange(e, "background")} />
                <LineText inputName="alignment" inputLabel="Alignment" inputValue={character.alignment} inputOnChange={(e) => handleTextChange(e, "alignment")} />
            </section>
        </div>
    );
}