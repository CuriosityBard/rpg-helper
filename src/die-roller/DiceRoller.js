import { useEffect, useState } from "react";
import { rollMultiple, dropLowest, dropHighest, totalDice } from "./roller.js";
import Dice from "./Dice.js";

export function DiceRoller() {
    // dice data
    const [dice, setDice] = useState([]);
    const [diceDropped, setDiceDropped] = useState([]);
    // input from user
    const [howManyDice, setHowManyDice] = useState(0);
    const [howManySides, setHowManySides] = useState(0);
    const [modifier, setModifier] = useState(0);
    // input: dice removed from the roll
    const [removedDice, setRemovedDice] = useState(0);     // -1 means remove lowest, 1 means remove highest
    const [numDiceToRemove, setNumDiceToRemove] = useState(0);

    // change dice
    function handleNumChange(event) {
        setHowManyDice(event.target.value);
    }
    function handleSidesChange(event) {
        setHowManySides(event.target.value);
    }
    // change modifier/roll removal
    function handleModifierChange(event) {
        setModifier(event.target.value);
    }
    function handleRemovalChange(event) {
        setRemovedDice(event.target.value);
    }
    function handleNumDiceToRemoveChange(event) {
        setNumDiceToRemove(event.target.value);
    }
    // update dice
    function getNewDice() {
        if (numDiceToRemove === 0) {
            setDice(rollMultiple(howManyDice, howManySides));
        } else {
            if (parseInt(removedDice) === -1) {
                let diceData = dropLowest(numDiceToRemove, rollMultiple(howManyDice, howManySides));
                setDiceDropped(diceData.removed);
                setDice(diceData.rolls);
            } else if (parseInt(removedDice) === 1) {
                let diceData = dropHighest(numDiceToRemove, rollMultiple(howManyDice, howManySides));
                setDiceDropped(diceData.removed);
                setDice(diceData.rolls);
            } else {
                console.log("There is a problem");
            }
        }
    }

    // must immediately update UI 
    useEffect(() => {console.log(dice)}, [dice]);

    return (
        <div className="dice-roller">
            <h2>Total: {totalDice(dice, parseInt(modifier))}</h2>
            <div className="dice-controls">
                    <p>
                        <input className="die-control" type="number" value={howManyDice} onChange={handleNumChange}></input>
                        D
                        <input className="die-control" type="number" value={howManySides} onChange={handleSidesChange}></input>
                    </p>
                    <p>Modifier: <input className="die-control" type="number" value={modifier} onChange={handleModifierChange}></input></p>
                    <p>
                        Remove <input className="die-control" type="number" value={numDiceToRemove} onChange={handleNumDiceToRemoveChange}></input>
                        <input className="die-control" type="radio" name="remove-dice" value={-1} id="remove-lowest" onChange={handleRemovalChange}></input>
                        <label htmlFor="remove-lowest">Lowest</label>
                        <input className="die-control" type="radio" name="remove-dice" value={1} id="remove-highest" onChange={handleRemovalChange}></input>
                        <label htmlFor="remove-highest">Highest </label>
                        rolls
                    </p>
                <button className="die-control" onClick={getNewDice}>Roll!</button>
            </div>
            <h3>Rolls:</h3>
            <p><Dice allDice={dice} /></p>
            <h3>Removed Rolls:</h3>
            <p><Dice allDice={diceDropped} /></p>
        </div>
    );
}