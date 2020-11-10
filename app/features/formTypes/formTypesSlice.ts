import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

// Setting Default State
const formTypesSlice = createSlice({
  name: 'formTypes',
  initialState: {
    textAreaData: {
      textAreaValue1: 'Test Default 1',
      textAreaValue2: 'Test Default 2',
    },
    inputFieldState: {
      input1: '',
      input2: '',
      input3: '',
    },
  },

  // Setup reducer state updates, storeTextArea is the example of passed action string
  reducers: {
    storeTextArea: (state, action) => {
      // Setup State Changes
      state.textAreaData.textAreaValue1 = action.payload.textAreaValue1;
      state.textAreaData.textAreaValue2 = action.payload.textAreaValue2;
      state.inputFieldState.input1 = action.payload.input1;
      state.inputFieldState.input2 = action.payload.input2;
      state.inputFieldState.input3 = action.payload.input3;
    },
  },
});

// Actions Setup for Reducer
export const { storeTextArea } = formTypesSlice.actions;

// Action Function only that then dispatches(passes) changes to the reducer state, "dispatch(storeTextArea(textAreaString));"
export const formData = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    const textAreaString = state.form.formTypes.values;

    dispatch(storeTextArea(textAreaString));
  };
};

export default formTypesSlice.reducer;
// Function to get state from this slice
export const formTypeState = (state: RootState) => state.formTypes;
