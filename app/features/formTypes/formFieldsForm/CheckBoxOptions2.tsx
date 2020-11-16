/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field } from 'redux-form';
import CheckBox from '../../../components/formFieldComponents/CheckBox';
import styles from './CheckRadioStyling.css';

interface Props {
  label: string;
  name: string;
  meta: {
    error: string;
    touched: boolean;
  };
}

export default function FormYesNo(props: Props) {
  const {
    name,
    label,
    meta: { error, touched },
  } = props;

  return (
    <div className={styles.buttonBoxContainer}>
      <div>
        <label htmlFor={name}>{label}</label>
        <div>
          <div>
            <label>
              Multi Option 1
              <Field name="multiOption1" component={CheckBox} />
            </label>
          </div>
          <div>
            <label>
              Multi Option 2
              <Field name="multiOption2" component={CheckBox} />
            </label>
          </div>
          <div>
            <label>
              Multi Option 3
              <Field name="multiOption3" component={CheckBox} />
            </label>
          </div>
        </div>
      </div>
      {touched && error && <p id={styles.errorTag}>{error}</p>}
    </div>
  );
}
