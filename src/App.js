import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  buttonPress,
  equals,
  clear
} from './features/calculator/calculatorSlice';



function App() {
  const instDisplay = useSelector((state) => state.calculator.instDisplay);
  const display = useSelector((state) => state.calculator.display);
  const dispatch = useDispatch();

  function handleOnClick(e) {
    if(e.target.id=='zero'){
      console.log(e.target.querySelector('span').innerHTML);
      dispatch(buttonPress(e.target.querySelector('span').innerHTML.toString()));
      return;
    }

    dispatch(buttonPress(e.target.innerHTML.toString()));
  
  }

  function handleClear(e){
    dispatch(clear());
  }

  function handleEquals(e){
    let regex_nums = /([0-9]|\.)+/g;
    let regex_ops = /[^0-9.]/g;
    let numbers = display.match(regex_nums);
    let ops = display.match(regex_ops);
    
    let result = Number(numbers[0]);
    //Modifty for BIDMAS logic
    //Append the result such that it fits on the screen
    //Implement logic such that certain operations do nothing sequentially
    //Update buttons function so that numbers are retained until operation
    
    for(let i=1;i<numbers.length;i++){
      if(ops[i-1]=='+'){
        result += Number(numbers[i]);
      }
      else if(ops[i-1]=='-'){
        result -= Number(numbers[i]);
      }
      else if(ops[i-1]=='x'){
        result *= Number(numbers[i]);
      }
      else if (ops[i-1]=='÷'){
        result /= Number(numbers[i]);
      }
      else{
        console.log('Error');
      }
    }
    
    let newDisplay = display + '=' + result.toString();
    let payload = {display: newDisplay,result: result};

    dispatch(equals(payload));

  }
  


  return (
    <div className="App">
      <div id='calculator'>
        <div id='display'>
          <div id='top'>
            {display}
          </div>
          <div id="bottom">
            {instDisplay}
          </div>
        </div>

        <div id='buttons'>
          <div className='button' id='clear' onClick={handleClear}>
            <span className='long-butt'>AC</span>
          </div>
          <div className='button operation' id='divide' onClick={handleOnClick}>
            &#247;
          </div>
          <div className='button' id='seven' onClick={handleOnClick}>
            7
          </div>
          <div className='button' id='eight' onClick={handleOnClick}>
            8
          </div>
          <div className='button' id='nine' onClick={handleOnClick}>
            9
          </div>
        
          <div className='button operation' id='multiply' onClick={handleOnClick}>
            x
          </div>
          <div className='button' id='four' onClick={handleOnClick}>
            4
          </div>
          <div className='button' id='five' onClick={handleOnClick}>
            5
          </div>
          <div className='button' id='six' onClick={handleOnClick}>
            6
          </div>
          <div className='button operation' id='minus' onClick={handleOnClick}>
            -
          </div>
          <div className='button' id='one' onClick={handleOnClick}>
            1
          </div>
          <div className='button' id='two' onClick={handleOnClick}>
            2
          </div>
          <div className='button' id='three' onClick={handleOnClick}>
            3
          </div>
          <div className='button operation' id='plus' onClick={handleOnClick}>
            +
          </div>
          <div className='button' id='zero' onClick={handleOnClick}>
            <span className='long-butt'>0</span>
          </div>
          <div className='button' id='decimal' onClick={handleOnClick}>
            .
          </div>
          <div className='button operation' id='equals' onClick={handleEquals}>
            =
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
