/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field } from 'redux-form';
import RadioButton from '../../../components/formFieldComponents/RadioButton';
import styles from './RadioButtonOption.css';

interface Props {
  // Commented options out, will be used for later when setting up default values from DB.
  // checkedValue: boolean;
  // disabled: boolean;
  // defaultValue: string;
  input: { name: string };
  label: string;
  type: string;
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
    type,
    meta: { error, touched },
  } = props;
  return (
    <div className={styles.radioButtonOptionsContainer}>
      <div>
        <label htmlFor={name}>{label}</label>
        <div>
          <div>
            <label>
              Option 1
              <Field
                name={props.input.name}
                component={RadioButton}
                type="radio"
                value="Option 1"
              />
            </label>
          </div>
          <div>
            <label>
              Option 2
              <Field
                name={props.input.name}
                component={RadioButton}
                type="radio"
                value="Option 2"
              />
            </label>
          </div>
          <div>
            <label>
              Option 3
              <Field
                name={props.input.name}
                component={RadioButton}
                type="radio"
                value="Option 3"
              />
            </label>
          </div>
        </div>
      </div>
      {touched && error && <p id={styles.errorTag}>{error}</p>}
    </div>
  );
}
