import { useState } from "react";
import { DnD } from "../character-creators/DnD.js";
import { Exception } from "./Exception.js";

export function CharacterCreator() {
    const [system, setSystem] = useState("dnd");   // which RPG system are we using?

    function handleSystemChange(event) {
        setSystem(event.target.value);
    }

    function getModifier(score, vals, mods) {
        // vals and mods should be parallel arrays
        return mods[vals.indexOf(score)];
    }
    
    // select which character creator to use: 
    let whichCreator;
    switch(system) {
        case "dnd":
            whichCreator = <DnD getModifier={getModifier} />;
            break;
        default:
            whichCreator = <Exception />;
    }

    return (
        <div id="character-creator">
            <label htmlFor="which-system">RPG System: </label>
            <select id="which-system" onChange={handleSystemChange}>
                <option value="dnd">Dungeons & Dragons, 5th Edition</option>
            </select>
            {whichCreator}
        </div>
    );
}