import { useEffect, useState } from "react";
import { LineText } from "./inputs/LineText.js";
import { Number } from "./inputs/Number.js";
import { AddClass } from "./inputs/AddClass.js";
import { ClassList } from "./outputs/ClassList.js";
import { Ability } from "./misc-modules/Ability.js";
import { AbilityPlusBonus } from "./misc-modules/AbilityPlusBonus.js";
import { CanHaveProficiency } from "./misc-modules/CanHaveProficiency.js";
import { BaseTen } from "./misc-modules/BaseTen.js";

export function DnD(props) {
    const [character, setCharacter] = useState({
        charName: "",
        playerName: "",
        experience: 0,
        race: "", 
        class: [],
        background: "",
        alignment: "",
        abilityScores: {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0
        },
        abilityModifiers: {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0
        },
        proficiencyBonus: 0,
        savingThrowBonus: {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0
        },
        savingThrowProficiency: {
            str: false,
            dex: false,
            con: false,
            int: false,
            wis: false,
            cha: false
        },
        armorClassBonus: 0,
        initiativeBonus: 0,
        speed: 0,
        hitPoints: 0,
        currentHitPoints: 0,
        temporaryHitPoints: 0,
        hitDice: "", 
        deathSaveSuccesses: 0, 
        deathSaveFailures: 0
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
    function handleToggleChange(value, section) {
        let newChar = {...character};
        newChar[section] = value;
        setCharacter(newChar);
    }
    // specific change handlers 
    function handleAbilityChange(event, ability) {
        let newChar = {...character};
        let newScore = parseInt(event.target.value);
        newChar.abilityScores[ability] = newScore;
        newChar.abilityModifiers[ability] = props.getModifier(newScore, abilityScores, abilityModifiers);
        setCharacter(newChar);
    }
    function handleSavingThrowChange(event, ability) {
        let newChar = {...character};
        newChar.savingThrowBonus[ability] = parseInt(event.target.value);
        setCharacter(newChar);
    }
    function handleSavingThrowProficiencyChange(elementId, whichThrow) {
        const element = document.getElementById(elementId); 
        let newChar = {...character};
        newChar.savingThrowProficiency[whichThrow] = element.checked;
        setCharacter(newChar);
    }
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
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "str")} score={character.abilityScores.str} modifier={character.abilityModifiers.str} ability="Strength" abbr="str" min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "dex")} score={character.abilityScores.dex} modifier={character.abilityModifiers.dex} ability="Dexterity" abbr="dex" min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "con")} score={character.abilityScores.con} modifier={character.abilityModifiers.con} ability="Constitution" abbr="con" min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "int")} score={character.abilityScores.int} modifier={character.abilityModifiers.int} ability="Intelligence" abbr="int" min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "wis")} score={character.abilityScores.wis} modifier={character.abilityModifiers.wis} ability="Wisdom" abbr="wis" min={1} max={30} />
                <Ability handleAbilityChange={(e) => handleAbilityChange(e, "cha")} score={character.abilityScores.cha} modifier={character.abilityModifiers.cha} ability="Charisma" abbr="cha" min={1} max={30} />
            </section>
            <section id="proficiency" className="sheet-section">
                <Number inputName="proficiency-bonus" inputLabel="Proficiency Bonus" inputValue={character.proficiencyBonus} inputOnChange={(e) => handleIntegerChange(e, 'proficiencyBonus')} />
            </section>
            <section id="saving-throws" className="sheet-section">
                <CanHaveProficiency name="Strength" idname="str-saving-throw" category="saving-throw" modifier={character.abilityModifiers.str} bonus={character.savingThrowBonus.str} proficiency={character.savingThrowProficiency.str} proficiencyBonus={character.proficiencyBonus} handleProficiencyChange={() => handleSavingThrowProficiencyChange('str-saving-throw-proficiency', 'str')} handleChange={(e) => handleSavingThrowChange(e, 'str')} />
                <CanHaveProficiency name="Dexterity" idname="dex-saving-throw" category="saving-throw" modifier={character.abilityModifiers.dex} bonus={character.savingThrowBonus.dex} proficiency={character.savingThrowProficiency.dex} proficiencyBonus={character.proficiencyBonus} handleProficiencyChange={() => handleSavingThrowProficiencyChange('dex-saving-throw-proficiency', 'dex')} handleChange={(e) => handleSavingThrowChange(e, 'dex')} />
                <CanHaveProficiency name="Constitution" idname="con-saving-throw" category="saving-throw" modifier={character.abilityModifiers.con} bonus={character.savingThrowBonus.con} proficiency={character.savingThrowProficiency.con} proficiencyBonus={character.proficiencyBonus} handleProficiencyChange={() => handleSavingThrowProficiencyChange('con-saving-throw-proficiency', 'con')} handleChange={(e) => handleSavingThrowChange(e, 'con')} />
                <CanHaveProficiency name="Intelligence" idname="int-saving-throw" category="saving-throw" modifier={character.abilityModifiers.int} bonus={character.savingThrowBonus.int} proficiency={character.savingThrowProficiency.int} proficiencyBonus={character.proficiencyBonus} handleProficiencyChange={() => handleSavingThrowProficiencyChange('int-saving-throw-proficiency', 'int')} handleChange={(e) => handleSavingThrowChange(e, 'int')} />
                <CanHaveProficiency name="Wisdom" idname="wis-saving-throw" category="saving-throw" modifier={character.abilityModifiers.wis} bonus={character.savingThrowBonus.wis} proficiency={character.savingThrowProficiency.wis} proficiencyBonus={character.proficiencyBonus} handleProficiencyChange={() => handleSavingThrowProficiencyChange('wis-saving-throw-proficiency', 'wis')} handleChange={(e) => handleSavingThrowChange(e, 'wis')} />
                <CanHaveProficiency name="Charisma" idname="cha-saving-throw" category="saving-throw" modifier={character.abilityModifiers.cha} bonus={character.savingThrowBonus.cha} proficiency={character.savingThrowProficiency.cha} proficiencyBonus={character.proficiencyBonus} handleProficiencyChange={() => handleSavingThrowProficiencyChange('cha-saving-throw-proficiency', 'cha')} handleChange={(e) => handleSavingThrowChange(e, 'cha')} />
            </section>
            <section id="basic-stats" className="sheet-section">
                {/* TODO: fix armor class to accept different levels of dex bonus */}
                <BaseTen name="armor-class" label="Armor Class" bonus={character.armorClassBonus} abilityModifier={character.abilityModifiers.dex} handleBonusChange={(e) => handleIntegerChange(e, "armorClassBonus")} />
                <AbilityPlusBonus modifier={character.abilityModifiers.dex} bonus={character.initiativeBonus} name="Initiative" idname="initiative" handleChange={(e) => handleIntegerChange(e, "initiativeBonus")} />
                <Number inputName="speed" inputLabel="Speed" inputValue={character.speed} inputOnChange={(e) => handleIntegerChange(e, 'speed')} />
                <div id="hit-points-section">
                    <Number inputName="hit-points" inputLabel="Hit Points" inputValue={character.hitPoints} inputOnChange={(e) => handleIntegerChange(e, 'hitPoints')} />
                    <Number inputName="current-hit-points" inputLabel="Current Hit Points" inputValue={character.currentHitPoints} inputOnChange={(e) => handleIntegerChange(e, 'currentHitPoints')} />
                    <Number inputName="temporary-hit-points" inputLabel="Temporary Hit Points" inputValue={character.temporaryHitPoints} inputOnChange={(e) => handleIntegerChange(e, 'temporaryHitPoints')} />
                    <LineText inputName="hit-dice" inputLabel="Hit Dice" inputValue={character.hitDice} inputOnChange={(e) => handleTextChange(e, "hitDice")} />
                    {/* TODO: add death saves */}
                </div>
            </section>
        </div>
    );
}