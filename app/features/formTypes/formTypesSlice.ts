import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

// Setting Default State
const formTypesSlice = createSlice({
  name: 'formTypes',
  initialState: {
    // Default textarea form field state
    textAreaData: {
      textAreaValue1: 'Test Default 1',
      textAreaValue2: 'Test Default 2',
    },
    // Default input form field state
    inputFieldState: {
      input1: 'DEFAULT 1',
      input2: '',
      input3: 'Default 2',
    },
    // Default option menu field state
    dropDownState: {
      optionMenu1: 'Option 2',
      optionMenu2: '',
    },
    // Default Radio Button field state
    radioButtonState: {
      radioButtonMenu1: 'Choice 3',
      radioButtonMenu2: '',
    },
  },

  // Setup reducer state updates, storeTextArea is the example of passed action string
  reducers: {
    storeTextArea: (state, action) => {
      // Setup State Changes
      state.textAreaData.textAreaValue1 = action.payload.textAreaValue1;
      state.textAreaData.textAreaValue2 = action.payload.textAreaValue2;
      // Adding Input Form Field data on submit
      state.inputFieldState.input1 = action.payload.input1;
      state.inputFieldState.input2 = action.payload.input2;
      state.inputFieldState.input3 = action.payload.input3;
      // Adding Drop-Down Field data on submit
      state.dropDownState.optionMenu1 = action.payload.optionMenu1;
      state.dropDownState.optionMenu2 = action.payload.optionMenu2;
      // Adding Radio Button Field data on submit
      state.radioButtonState.radioButtonMenu1 = action.payload.radioButtonMenu1;
      state.radioButtonState.radioButtonMenu2 = action.payload.radioButtonMenu2;
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
