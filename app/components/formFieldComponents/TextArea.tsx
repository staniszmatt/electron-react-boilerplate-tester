/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styles from './formStyling.css';

interface PropsTextArea {
  defaultValue: string;
  disabled: boolean;
  input: {
    name: string;
    value: string;
  };
  rows: number;
  label: string;
  meta: {
    error: string;
    touched: boolean;
  };
}

interface ValueState {
  inputValue: string;
}

export default function FormTextArea(propsTextArea: PropsTextArea) {
  const {
    defaultValue,
    disabled,
    input,
    rows,
    label,
    meta: { error, touched },
  } = propsTextArea;

  // Setup useState with TypeScript interface "ValueState"
  const [valueState, setValueState] = useState<ValueState>({
    inputValue: defaultValue,
  });

  // Controlling string input to prevent more than one space, special char, and the use of single quote or back tick that can break the string.
  const valueChange = (event: { currentTarget: { value: string } }) => {
    const changeCharString = event.currentTarget.value
      .replace(/  +/g, ' ')
      .replace(/[`']/g, '"')
      .replace(/[#^&*<>()@~]/g, '');

    // Update State after .replace string.
    setValueState({
      ...valueState,
      inputValue: changeCharString,
    });
  };

  return (
    <div className={styles.textareaContainer}>
      <div>
        <label htmlFor={propsTextArea.input.name}>{label}</label>
      </div>
      <div>
        <textarea
          {...input}
          value={valueState.inputValue}
          onChange={valueChange}
          disabled={disabled}
          id={propsTextArea.input.name}
          aria-multiline
          rows={rows}
        />
      </div>
      {/** The {error && <someElement>} is a boolean that Hides or displays the elements inside the brackets.
       * This is so error tag is only displayed when there is an error.
       * This helped me with better control with styling issues with spacing under text area.
       */}
      {touched && <p className="red-text darken-2">{error}</p>}
    </div>
  );
}
