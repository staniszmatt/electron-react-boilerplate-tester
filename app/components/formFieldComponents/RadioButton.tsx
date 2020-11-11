/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './formStyling.css';

interface Props {
  checkedValue: boolean;
  defaultValue: string;
  disabled: boolean;
  input: string;
  label: string;
  type: string;
  name: string;
}

export default function FormField(props: Props) {
  const {
    checkedValue,
    defaultValue,
    disabled,
    input,
    name,
    label,
    type = 'text',
  } = props;

  return (
    <div className={styles.radioButtonContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        {...input}
        type={type || 'text'}
        checked={checkedValue}
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
