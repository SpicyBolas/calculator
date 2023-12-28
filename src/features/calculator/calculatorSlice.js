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
        state.display = state.display + action.payload;
        state.instDisplay = action.payload;
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


export default calculatorSlice.reducer;