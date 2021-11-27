import "./App.css";
import React from "react";

function App() {
  const [display, setDisplay] = React.useState("0");
  const [decimal, setDecimal] = React.useState(false);//decimal is initialised to false 
  // if not used. If it is then it will be set to true and the logic will prevent it from 
  // being output twice in the same number or just before an operator.

  let zeroRegex = /0$/;
  let minusRegex = /-$/;
  let divideMultiplyRegex = /(\*|\+|-|\.|\/)$/;
  let catchRegex = /(\*|\+|-|\/)$/;
  //These Regexes are defined here to be reused in the handler functions below

  const displaySymbol = (event) => {
    setDisplay((prevState) =>
      prevState == 0 && decimal === false 
        ? event.target.value
        : zeroRegex.test(prevState) &&
          divideMultiplyRegex.test(prevState.substr(0, prevState.length - 1))//this ensures that multiple zeros won't be output
        ? prevState.substr(0, prevState.length - 1) + event.target.value//first from the second number onwards
        : minusRegex.test(prevState) && event.target.value == '-'
        ? prevState.substr(0, prevState.length - 1) + '+'//will ensure that 2 minuses don't get output one after another
        : prevState + event.target.value
    );
    if (event.target.value == "-") {
      setDecimal(false);
    }
  };

  const handleDivideMultiply = (event) => {
    setDisplay((prevState) =>
      divideMultiplyRegex.test(prevState)
        ? divideMultiplyRegex.test(prevState.substr(0, prevState.length - 1))
          ? prevState.substr(0, prevState.length - 2) + event.target.value //this ensures that if an operator and a minus sign 
          //have been previously output just before pressing an operator again only the last operator is taken into account
          : prevState.substr(0, prevState.length - 1) + event.target.value// this ensures that if two operators are output 
          //successively only the last one will be taken into account
        : prevState + event.target.value
    );
    setDecimal(false);
  };

  const handleDecimal = (event) => {
    if (decimal === false) {
      setDisplay((prevState) => prevState + event.target.value);
      setDecimal(true);
    } else {
      return;
    }
  };

  const clearInputOutput = () => {
    setDisplay("0");
    setDecimal(false);
  };

  const calculateInput = () => {
    setDisplay((prevState) =>
      catchRegex.test(prevState)
        ? eval(prevState.substr(0, prevState.length - 1))// this ensures that if an operator has been output last 
        //it is removed from the expression evaluated as to not crash the app.
        : eval(display)
    );
    setDecimal(false);
  };

  return (
    <div className="App">
      
        <div className="grid">
          <div id="display" className="display">
            {display}
          </div>
          <button
            onClick={clearInputOutput}
            id="clear"
            className="button clear"
            value="0"
          >
            AC
          </button>
          <button
            onClick={handleDivideMultiply}
            id="divide"
            value="/"
            className="button"
          >
            /
          </button>
          <button
            onClick={handleDivideMultiply}
            id="multiply"
            value="*"
            className="button"
          >
            x
          </button>
          <button
            onClick={displaySymbol}
            id="seven"
            value="7"
            className="button"
          >
            7
          </button>
          <button
            onClick={displaySymbol}
            id="eight"
            value="8"
            className="button"
          >
            8
          </button>
          <button
            onClick={displaySymbol}
            id="nine"
            value="9"
            className="button"
          >
            9
          </button>
          <button
            onClick={displaySymbol}
            id="subtract"
            value="-"
            className="button"
          >
            -
          </button>
          <button
            onClick={displaySymbol}
            id="four"
            value="4"
            className="button"
          >
            4
          </button>
          <button
            onClick={displaySymbol}
            id="five"
            value="5"
            className="button"
          >
            5
          </button>
          <button onClick={displaySymbol} id="six" value="6" className="button">
            6
          </button>
          <button
            onClick={handleDivideMultiply}
            id="add"
            value="+"
            className="button"
          >
            +
          </button>
          <button onClick={displaySymbol} id="one" value="1" className="button">
            1
          </button>
          <button onClick={displaySymbol} id="two" value="2" className="button">
            2
          </button>
          <button
            onClick={displaySymbol}
            id="three"
            value="3"
            className="button"
          >
            3
          </button>
          <button
            onClick={calculateInput}
            id="equals"
            value="="
            className="button equals"
          >
            =
          </button>
          <button
            onClick={displaySymbol}
            id="zero"
            className="button zero"
            value="0"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            id="decimal"
            value="."
            className="button"
          >
            .
          </button>
        </div>
      </div>
    
  );
}

export default App;
