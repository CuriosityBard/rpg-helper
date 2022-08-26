import { useEffect, useState } from "react";
import { rollMultiple, totalDice } from "./roller.js";
import Dice from "./Dice.js";

export function DiceRoller() {
    // dice data
    const [dice, setDice] = useState([]);
    // input from user
    const [howManyDice, setHowManyDice] = useState(0);
    const [howManySides, setHowManySides] = useState(0);

    // change dice
    function handleNumChange(event) {
        setHowManyDice(event.target.value);
    }
    function handleSidesChange(event) {
        setHowManySides(event.target.value);
    }
    // update dice
    function getNewDice() {
        setDice(rollMultiple(howManyDice, howManySides));
    }

    // must immediately update UI 
    useEffect(() => {console.log(dice)}, [dice]);

    return (
        <div className="dice-roller">
            <h2>Total: {totalDice(dice)}</h2>
            <div className="dice-controls">
                <p><input className="die-control" type="number" value={howManyDice} onChange={handleNumChange}></input>D<input className="die-control" type="number" value={howManySides} onChange={handleSidesChange}></input></p>
                <button className="die-control" onClick={getNewDice}>Roll!</button>
            </div>
            <h3>Rolls:</h3>
            <p><Dice allDice={dice} /></p>
        </div>
    );
}