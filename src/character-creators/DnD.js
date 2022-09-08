import { useEffect, useState } from "react";
import { LineText } from "./inputs/LineText.js";
import { Number } from "./inputs/Number.js";
import { AddClass } from "./inputs/AddClass.js";
import { ClassList } from "./outputs/ClassList.js";
import { Ability } from "./misc-modules/Ability.js";

export function DnD(props) {
    const [character, setCharacter] = useState({
        charName: "",
        playerName: "",
        experience: 0,
        race: "", 
        class: [],
        background: "",
        alignment: "",
        abilities: {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0
        }
    });

    // ability scores and modifiers
    const abilityScores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const abilityModifiers = [-5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10];

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
    function handleAbilityChange(event, ability) {
        let newChar = {...character};
        newChar.abilities[ability] = parseInt(event.target.value);
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
    function removeClass(className, classLevel) {
        let newChar = {...character};
        let idx = newChar.class.findIndex((item) => item.class === className && item.level === classLevel);

        if (newChar.class.length === 1) {
            newChar.class = [];
        } else if (newChar.class.length === 2) {
            if (idx === 0) {
                newChar.class = [newChar.class[1]];
            } else if (idx === 1) {
                newChar.class = [newChar.class[0]];
            }
        } else {
            newChar.class = [...newChar.class.slice(0, idx), ...newChar.class.slice(idx + 1)];
        }
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
                <ClassList classes={character.class} removeClass={removeClass} />
                <AddClass addToList={addClassToList} />
                <LineText inputName="background" inputLabel="Background" inputValue={character.background} inputOnChange={(e) => handleTextChange(e, "background")} />
                <LineText inputName="alignment" inputLabel="Alignment" inputValue={character.alignment} inputOnChange={(e) => handleTextChange(e, "alignment")} />
            </section>
            <section id="abilities" className="sheet-section">
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "str")} abilityVals={abilityScores} abilityMods={abilityModifiers} score={character.abilities.str} ability="Strength" abbr="str" getModifier={() => props.getModifier(character.abilities.str, abilityScores, abilityModifiers)} min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "dex")} abilityVals={abilityScores} abilityMods={abilityModifiers} score={character.abilities.dex} ability="Dexterity" abbr="dex" getModifier={() => props.getModifier(character.abilities.dex, abilityScores, abilityModifiers)} min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "con")} abilityVals={abilityScores} abilityMods={abilityModifiers} score={character.abilities.con} ability="Constitution" abbr="con" getModifier={() => props.getModifier(character.abilities.con, abilityScores, abilityModifiers)} min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "int")} abilityVals={abilityScores} abilityMods={abilityModifiers} score={character.abilities.int} ability="Intelligence" abbr="int" getModifier={() => props.getModifier(character.abilities.int, abilityScores, abilityModifiers)} min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "wis")} abilityVals={abilityScores} abilityMods={abilityModifiers} score={character.abilities.wis} ability="Wisdom" abbr="wis" getModifier={() => props.getModifier(character.abilities.wis, abilityScores, abilityModifiers)} min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "cha")} abilityVals={abilityScores} abilityMods={abilityModifiers} score={character.abilities.cha} ability="Charisma" abbr="cha" getModifier={() => props.getModifier(character.abilities.cha, abilityScores, abilityModifiers)} min={1} max={30} />
            </section>
            <section id="saving-throws" className="sheet-section">
                
            </section>
        </div>
    );
}