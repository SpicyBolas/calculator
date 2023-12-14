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
          <div class='button' id='clear'>
            <span class='long-butt'>AC</span>
          </div>
          <div class='button operation' id='divide'>
            &#247;
          </div>
          <div class='button' id='seven'>
            7
          </div>
          <div class='button' id='eight'>
            8
          </div>
          <div class='button' id='nine'>
            9
          </div>
        
          <div class='button operation' id='multiply'>
            x
          </div>
          <div class='button' id='four'>
            4
          </div>
          <div class='button' id='five'>
            5
          </div>
          <div class='button' id='six'>
            6
          </div>
          <div class='button operation' id='minus'>
            -
          </div>
          <div class='button' id='one'>
            1
          </div>
          <div class='button' id='two'>
            2
          </div>
          <div class='button' id='three'>
            3
          </div>
          <div class='button operation' id='plus'>
            +
          </div>
          <div class='button' id='zero'>
            <span class='long-butt'>0</span>
          </div>
          <div class='button' id='decimal'>
            .
          </div>
          <div class='button operation' id='equals'>
            =
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
