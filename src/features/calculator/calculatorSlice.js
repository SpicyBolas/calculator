import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  display: '',
  storedVal: 0,
  instDisplay: '0',
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    buttonPress: (state,action) => {
        state.display = action.payload.display;
        state.instDisplay = action.payload.button;
    },
    equals: (state,action) => {
      //Compute the result of the calculation
        state.display = action.payload.display;
        state.storedVal = action.payload.result;
        state.instDisplay = action.payload.result.toString();
    },

    clear: (state) => {
        //Compute the result of the calculation
          state.display = '';
          state.storedVal = 0;
          state.instDisplay = '0';
      },
    
  },
});

export const { buttonPress, equals, clear } = calculatorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDisplay = (state) => state.calculator.display;
export const selectInstDisplay = (state) => state.calculator.instDisplay;
export const selectStoredValue = (state) => state.calculator.storedValue;



export default calculatorSlice.reducer;