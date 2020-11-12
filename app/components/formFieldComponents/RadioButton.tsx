/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './formStyling.css';

interface Props {
  checked: boolean;
  defaultValue: string;
  disabled: boolean;
  input: string;
  label: string;
  type: string;
  name: string;
}

export default function FormField(props: Props) {
  const { checked, defaultValue, disabled, input, name, label } = props;

  return (
    <div className={styles.radioButtonContainer}>
      {/**
       * The htmlFor is required to separate grouped radio buttons
       */}
      <label htmlFor={name}>{label}</label>
      <input
        {...input}
        type="radio"
        checked={checked}
        defaultValue={defaultValue}
        disabled={disabled}
        id={name}
      />
      {/** No error display here since I don't want the error on each radio button but rather
       * the grouped radio buttons when used.
       */}
    </div>
  );
}
