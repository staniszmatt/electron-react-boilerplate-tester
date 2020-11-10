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
  const formState = useSelector(formTypeState);
  // Setting state key names with the values.
  const { textAreaValue1, textAreaValue2 } = formState.textAreaData;
  const { input1, input2, input3 } = formState.inputFieldState;
  // Just want to display empty if nothing is set yet for Form Value State.
  const textBox1String = emptyStringCheck(textAreaValue1);
  const textBox2String = emptyStringCheck(textAreaValue2);
  const input1String = emptyStringCheck(input1);
  const input2String = emptyStringCheck(input2);
  const input3String = emptyStringCheck(input3);

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
            initialValues={formState.textAreaData}
          />
        </div>
      </div>
      {/** Here is the state change display of the form fields when it is submitted. */}
      <div>
        <div className={styles.formFieldSubmittedText}>
          <div>Form Value State On Submit:</div>
          {/** textarea Fields */}
          <div>
            <div>Submitted Text Area 1:</div>
            <div>{textBox1String}</div>
          </div>
          <div>
            <div>Submitted Text Box 2:</div>
            <div>{textBox2String}</div>
          </div>
          {/** input Fields */}
          <div>
            <div>Submitted Input1 Field</div>
            <div>{input1String}</div>
          </div>
          <div>
            <div>Submitted Input2 Field</div>
            <div>{input2String}</div>
          </div>
          <div>
            <div>Submitted Input3 Field</div>
            <div>{input3String}</div>
          </div>
        </div>
      </div>
      {/** Keeping separated to help differentiate between set containers */}
    </div>
  );
}
