// basic die rolling function:
function roll(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

// roll n dice with x sides and return an array with each individual roll
function rollMultiple(n, x) {
    let rolls = [];
    for (let i = 0; i < n; i++) {
        rolls.push(roll(x));
    }
    return rolls;
}

// get total of a set of dice, given as an array arr
function totalDice(arr, modifier) {
    return arr.reduce((total, current) => total + current, 0) + modifier;
}

// drop lowest n rolls from set arr
function dropLowest(n, arr) {
    let returnArr = [...arr];
    let removedArr = [];    // holds removed rolls 
    for (let i = 0; i < n; i++) {
        // find lowest value in array:
        let lowest = returnArr.reduce((final, current) => {
            if (current > final) {
                return final;
            }
            return current;
        }, returnArr[0]);
        // add lowest value to removed array:
        removedArr.push(lowest);
        //remove lowest value in array:
        let idx = returnArr.indexOf(lowest);
        if (idx === 0) {
            returnArr.shift();
        } else if (returnArr.length - 1 === idx) {
            returnArr.pop()
        } else {
            returnArr = [...returnArr.slice(0, idx), ...returnArr.slice(idx + 1)];
        }
    }
    return {
        rolls: returnArr,
        removed: removedArr
    };
}

// drop highest n rolls from set arr
function dropHighest(n, arr) {
    let returnArr = [...arr];
    let removedArr = [];    // holds removed rolls 
    for (let i = 0; i < n; i++) {
        // find highest value in array:
        let highest = returnArr.reduce((final, current) => {
            if (current < final) {
                return final;
            }
            return current;
        }, returnArr[0]);
        // add highest value to removed array:
        removedArr.push(highest);
        //remove highest value in array:
        let idx = returnArr.indexOf(highest);
        if (idx === 0) {
            returnArr.shift();
        } else if (returnArr.length - 1 === idx) {
            returnArr.pop();
        } else {
            returnArr = [...returnArr.slice(0, idx), ...returnArr.slice(idx + 1)];
        }
    }
    return {
        rolls: returnArr,
        removed: removedArr
    };
}

// modify roll with static value n, n can be negative or positive
function modifyRoll(n, roll) {
    return roll + n;
}

export {
    roll,
    rollMultiple,
    totalDice,
    dropLowest,
    dropHighest,
    modifyRoll
};