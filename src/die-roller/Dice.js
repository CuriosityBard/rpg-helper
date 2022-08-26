export default function Dice(props) {
    if (!props.allDice) {
        return "";
    }
    return props.allDice.map((roll, idx) => {
        if (idx === props.allDice.length - 1) {
            return (
                <span className="die-roll" key={"roll" + (idx+1) + "withval" + roll}>{roll}</span>
            );
        } else {
            return (
                <span className="die-roll" key={"roll" + (idx+1) + "withval" + roll}>{roll}, </span>
            );
        }
        
    });
}