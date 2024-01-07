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
  const storedResult = useSelector((state) => state.calculator.storedVal);
  const dispatch = useDispatch();

  function handleOnClick(e) {
    
    //Do not permit operations after another except for minus
    if(['plus','multiply','divide'].includes(e.target.id)&['+','x','÷','-'].includes(display[display.length-1])){
      return;
    }
    //Make sure no more than two minus' can be next to each other
    else if(e.target.id=='minus'&display[display.length-2]=='-'){
      return;
    }
    
    //if the equals button had been pressed previously then clear the display and use the previous result going forward 
    if(display.split('').includes('=')){
      //Make a copy of the storedResult
      let result = [...[storedResult]][0];
      console.log(result);
      //Set display to stored result
      dispatch(clear());
      dispatch(buttonPress(result));  
    }
    
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
    //do nothing if last operation was 'equals'
    if(display.split('').includes('=')){
      return;
    }
    
    
    let result;
    let regex_nums = /([0-9]+(\.[0-9]+)?)/g;
    let regex_ops = /[^0-9.]+/g;
    
    
    let numbers = display.match(regex_nums);
    let ops = display.match(regex_ops);
    
    //Check if the first value is a negative number
    //If so, make sure result value starts as negative and that
    //the first negative operation is removed from the array
    if(ops.length == numbers.length&ops[0]=='-'){
      result = -Number(numbers[0]);
      ops.shift();  
    }
    else if(ops.length == numbers.length-1){
      result = Number(numbers[0]); 
    }
    else{
      console.log('Error');
    }
    console.log(result);
    //Optional: Modifty for BIDMAS logic
    
    for(let i=1;i<numbers.length;i++){
      if(ops[i-1]=='+'){
        result += Number(numbers[i]);
      }
      else if(ops[i-1]=='+-'){
        result -= Number(numbers[i]);
      }
      else if(ops[i-1]=='-'){
        result -= Number(numbers[i]);
      }
      else if(ops[i-1]=='--'){
        result += Number(numbers[i]);
      }
      else if(ops[i-1]=='x'){
        result *= Number(numbers[i]);
      }
      else if(ops[i-1]=='x-'){
        result *= -Number(numbers[i]);
      }
      else if (ops[i-1]=='÷'){
        result /= Number(numbers[i]);
      }
      else if (ops[i-1]=='÷-'){
        result /= -Number(numbers[i]);
      }
      else{
        console.log('Error');
      }
    }

    //no more than 8 decimal places
    result = Number(result.toFixed(8));
    //Append to 12 siginificant figures
    if(result.toString().length>9){
          result = result.toPrecision(8);
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
