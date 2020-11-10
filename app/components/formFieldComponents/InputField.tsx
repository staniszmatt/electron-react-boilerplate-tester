/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styles from './formStyling.css';

interface InputProps {
  checkedValue: boolean;
  toCap: boolean;
  defaultValue: string;
  disabled: boolean;
  input: {
    name: string;
    value: string;
  };
  label: string;
  name: string;
  meta: {
    error: string;
    touched: boolean;
  };
}
interface ValueState {
  inputValue: string | number;
}

export default function FormField(inputProps: InputProps) {
  const {
    checkedValue,
    toCap,
    defaultValue,
    disabled,
    input,
    name,
    label,
    meta: { error, touched },
  } = inputProps;
  const [valueState, setValueState] = useState<ValueState>({
    inputValue: defaultValue,
  });

  const valueChange = (event: { currentTarget: { value: string } }) => {
    let changeCharString = '';

    if (toCap) {
      changeCharString = event.currentTarget.value
        .toUpperCase()
        .replace(/  +/g, '')
        .replace(/[^a-zA-Z-0-9-. ]/g, '');
    } else {
      changeCharString = event.currentTarget.value
        .replace(/  +/g, '')
        .replace(/[^a-zA-Z-0-9-. ]/g, '');
    }

    setValueState({
      ...valueState,
      inputValue: changeCharString,
    });
  };

  return (
    <div className={styles.inputFieldContainer}>
      <label htmlFor={inputProps.input.name}>{label}</label>
      <input
        {...input}
        onChange={valueChange}
        type="text"
        checked={checkedValue}
        value={valueState.inputValue}
        disabled={disabled}
        id={name}
      />
      {/** The {error && <someElement>} is a boolean that Hides or displays the elements inside the brackets.
       * This is so error tag is only displayed when there is an error.
       * This helped me with better control with styling issues with spacing under text area.
       */}
      {touched && error && <p id={styles.errorTag}>{error}</p>}
    </div>
  );
}
