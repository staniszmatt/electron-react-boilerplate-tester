/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './formStyling.css';

interface Props {
  value: string;
  disabled: boolean;
  input: string;
  // TypeScript: Using data as an any Object list so used Record<string, any>;
  data: Record<string, any>;
  label: string;
  type: string;
  name: string;
  meta: {
    error: string;
    touched: boolean;
  };
}

export default function FormDropDown(props: Props): JSX.Element {
  const {
    value,
    input,
    data,
    name,
    label,
    meta: { error, touched },
  } = props;

  const renderOptions = (option: string) => {
    return (
      <option key={option} value={option}>
        {/**
         * This {option} is to create a blank spot to start the options list,
         * then adds the array of options.
         * Remove this if you want the first option to be default.
         */}
        {option}
      </option>
    );
  };

  return (
    <div className={styles.dropDownContainer}>
      <label htmlFor={name}>{label}</label>
      <select value={value} id={name} {...input}>
        <option key="blankOption">{value}</option>
        {data.map(renderOptions)}
      </select>
      {/** The {touched && error && <someElement>} is a boolean that Hides or displays the elements inside the brackets.
       * This is so error tag is only displayed when there is an error and has been touched.
       * It can also only error if submitted without having added an input.
       * This helped me with better control with styling issues with spacing under text area.
       */}
      {touched && error && <p id={styles.errorTag}>{error}</p>}
    </div>
  );
}
