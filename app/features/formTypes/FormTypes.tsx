import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormFieldForm from './FormFieldsForm';
import styles from './FormTypes.css';
import { formData, formTypeState } from './formTypesSlice';

export default function FormTypes() {
  const dispatch = useDispatch();
  const value = useSelector(formTypeState);

  console.log('FormTypes state value: ', value);
  const stateTextAreaValue = value.textAreaInfo;

  const testFormProps = {
    textAreaValue: 'testing string',
  };

  return (
    <div className={styles.formTypesContainer} data-tid="backButton">
      <div>Form Fields Types Example Page:</div>
      <div>
        <FormFieldForm
          onSubmit={() => {
            dispatch(formData());
          }}
          props={testFormProps}
        />
      </div>
      <div>
        <div>Form State Value</div>
        <div>{stateTextAreaValue}</div>
      </div>
    </div>
  );
}
