import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const formTypesSlice = createSlice({
  name: 'formTypes',
  initialState: { textAreaInfo: 'Initial Value' },
  reducers: {
    storeTextArea: (state, action) => {
      console.log('Change Text Area state', state);
      console.log('Change Text Area action', action);

      state.textAreaInfo = action.payload;
    },
  },
});

export const { storeTextArea } = formTypesSlice.actions;

export const formData = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();

    console.log('formData state: ', state);

    const textAreaString = state.form.formTypes.values?.textAreaValue;

    dispatch(storeTextArea(textAreaString));
  };
};

export default formTypesSlice.reducer;

export const formTypeState = (state: RootState) => state.formTypes;
