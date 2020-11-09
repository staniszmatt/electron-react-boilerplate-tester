/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styles from './formStyling.css';

interface Props {
  defaultValue: string;
  disabled: boolean;
  input: {
    name: string;
    value: string;
  };
  rows: number;
  label: string;
  meta: {
    error: {};
    touched: {};
  };
}

interface ValueState {
  inputValue: string;
}

export default function FormTextArea(props: Props) {
  const {
    defaultValue,
    disabled,
    input,
    rows,
    label,
    meta: { error, touched },
  } = props;

  const [valueState, setValueState] = useState<ValueState>({
    inputValue: defaultValue,
  });

  const valueChange = (event: { currentTarget: { value: string } }) => {
    const changeCharString = event.currentTarget.value
      .replace(/  +/g, ' ')
      .replace(/[`']/g, '"')
      .replace(/[#^&*<>()@~]/g, '');

    setValueState({
      ...valueState,
      inputValue: changeCharString,
    });
  };

  return (
    <div className={styles.textareaContainer}>
      <div>
        <label htmlFor={props.input.name}>{label}</label>
      </div>
      <div>
        <textarea
          {...input}
          value={valueState.inputValue}
          onChange={valueChange}
          disabled={disabled}
          id={props.input.name}
          aria-multiline
          rows={rows}
        />
      </div>
      {error && <p className="red-text darken-2">{touched && error}</p>}
    </div>
  );
}
