import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

// Setting Default State
const formTypesSlice = createSlice({
  name: 'formTypes',
  initialState: {
    textAreaData: {
      textAreaValue1: '',
      textAreaValue2: '',
    },
  },

  // Setup reducer state updates, storeTextArea is the example of passed action string
  reducers: {
    storeTextArea: (state, action) => {
      // Setup State Changes
      state.textAreaData.textAreaValue1 = action.payload.textAreaValue1;
      state.textAreaData.textAreaValue2 = action.payload.textAreaValue2;
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
