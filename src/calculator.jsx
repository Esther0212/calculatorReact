// Calculator.js
import React, { useState } from 'react';
import './calculator.css';

const Calculator = () => {
    const [output, setOutput] = useState("");
    const specialChars = ['/', '*', '-', '+', '='];
    let result = null;

    const calculate = (btnValue) => {
        if (btnValue === "=" && output !== "") {
            result = eval(output);
            setOutput(result.toString());
        } else if (btnValue === "AC") {
            setOutput("");
        } else if (btnValue === "DEL") {
            setOutput(output.slice(0, -1));
        } else if (btnValue === "()") {
            if (output === "" || output.slice(-1) === "(") {
                setOutput(output + "(");
            } else if (output.slice(-1) !== ")") {
                setOutput(output + ")");
            }
        } else if (specialChars.includes(btnValue)) {
            if (output === "" || specialChars.includes(output.slice(-1))) {
                return;
            } else {
                setOutput(output + btnValue);
            }
        } else {
            if (result !== null && specialChars.includes(btnValue)) {
                setOutput(result.toString() + btnValue);
            } else {
                setOutput(output + btnValue);
            }
        }
    };

    const handleButtonClick = (btnValue) => {
        calculate(btnValue);
    };

    return (
        <div className="container">
            <input type="text" className="display" value={output} readOnly />
            <div className="buttons">
                <button className="orange" onClick={() => handleButtonClick("AC")}>AC</button>
                <button className="orange" onClick={() => handleButtonClick("DEL")}>DEL</button>
                <button onClick={() => handleButtonClick("(-")}>+/-</button>
                <button className="operation" onClick={() => handleButtonClick("/")}>/</button>

                <button onClick={() => handleButtonClick("7")}>7</button>
                <button onClick={() => handleButtonClick("8")}>8</button>
                <button onClick={() => handleButtonClick("9")}>9</button>
                <button className="operation" onClick={() => handleButtonClick("*")}>*</button>

                <button onClick={() => handleButtonClick("4")}>4</button>
                <button onClick={() => handleButtonClick("5")}>5</button>
                <button onClick={() => handleButtonClick("6")}>6</button>
                <button className="operation" onClick={() => handleButtonClick("-")}>-</button>

                <button onClick={() => handleButtonClick("1")}>1</button>
                <button onClick={() => handleButtonClick("2")}>2</button>
                <button onClick={() => handleButtonClick("3")}>3</button>
                <button className="operation" onClick={() => handleButtonClick("+")}>+</button>

                <button onClick={() => handleButtonClick("0")}>0</button>
                <button onClick={() => handleButtonClick(".")}>.</button>
                <button onClick={() => handleButtonClick("()")}>( )</button>
                <button className="operation" onClick={() => handleButtonClick("=")}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
