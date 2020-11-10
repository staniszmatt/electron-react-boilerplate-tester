import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormFieldForm from './formFieldsForm/FormFieldsForm';
import styles from './FormTypes.css';
import { formData, formTypeState } from './formTypesSlice';

// Just a function to return empty if we have an empty string
function emptyStringCheck(stringToCheck: string) {
  // NOTE: Order Matters Here! Need to check for null first before we check length
  return stringToCheck === null || stringToCheck.length === 0
    ? 'Empty'
    : stringToCheck;
}

export default function FormTypes() {
  const dispatch = useDispatch();
  const value = useSelector(formTypeState);
  const textBox1String = emptyStringCheck(value.textAreaData.textAreaValue1);
  const textBox2String = emptyStringCheck(value.textAreaData.textAreaValue2);

  return (
    <div className={styles.formTypesContainer} data-tid="backButton">
      {/** This is the Form container setup with a header div. */}
      <div className={styles.formContainer}>
        <div>Form Field Type Examples:</div>
        <div>
          <FormFieldForm
            onSubmit={() => {
              dispatch(formData());
            }}
            // Since I want to pass default strings to form fields, we need to call out the
            // initial key values so we don't fail validation testing after submit is clicked.
            // If no default is required, then key value isn't needed.
            initialValues={value.textAreaData}
          />
        </div>
      </div>
      {/** Here is the state change display of the form fields when it is submitted. */}
      <div>
        <div className={styles.formFieldSubmittedText}>
          <div>Form Value State On Submit:</div>
          <div>
            <div>Submitted Text Area 1:</div>
            <div>{textBox1String}</div>
          </div>
          <div>
            <div>Submitted Text Box 2:</div>
            <div>{textBox2String}</div>
          </div>
        </div>
      </div>
      {/** Keeping separated to help differentiate between set containers */}
    </div>
  );
}
