/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Field } from 'redux-form';
import RadioButton from '../../../components/formFieldComponents/RadioButton';
import styles from './CheckRadioStyling.css';

interface Props {
  // Commented options out, will be used for later when setting up default values from DB.
  // checkedValue: boolean;
  defaultValue: string;
  // disabled: boolean;
  input: { name: string };
  label: string;
  name: string;
  meta: {
    error: string;
    touched: boolean;
  };
}

interface RadioState {
  radio1: boolean;
  radio2: boolean;
  radio3: boolean;
}

export default function FormYesNo(props: Props) {
  const {
    defaultValue,
    name,
    label,
    meta: { error, touched },
  } = props;

  // Setup useState with TypeScript interface "ValueState"
  // NOTE: The form state can be modified instead but will cause the form to reload ever
  // time the input changes, so using useState instead.
  const [radioState, setRadioState] = useState<RadioState>({
    radio1: false,
    radio2: false,
    radio3: false,
  });
  // Set Radio Button state based on value
  const setRadioCheckState = (valueString: string) => {
    switch (valueString) {
      case 'Choice 1':
        setRadioState({
          ...radioState,
          radio1: true,
          radio2: false,
          radio3: false,
        });
        break;
      case 'Choice 2':
        setRadioState({
          ...radioState,
          radio1: false,
          radio2: true,
          radio3: false,
        });
        break;
      case 'Choice 3':
        setRadioState({
          ...radioState,
          radio1: false,
          radio2: false,
          radio3: true,
        });
        break;
      default:
    }
  };
  // Initial default check, this assumes that there has to be at least 1 radio button selected.
  // So once a default is set or a user has selected a radio button, we can ignore the initial
  // state default set if one exists.
  if (
    defaultValue &&
    !radioState.radio1 &&
    !radioState.radio2 &&
    !radioState.radio3
  ) {
    setRadioCheckState(defaultValue);
  }

  // Change state when one of the radio buttons is clicked on
  const checkedRadioButton = (event: Record<string, any>) => {
    const { value } = event.target;
    setRadioCheckState(value);
  };

  return (
    <div className={styles.buttonBoxContainer}>
      <div>
        <label htmlFor={name}>{label}</label>
        <div>
          <div>
            <label>
              Choice 1
              <Field
                name={props.input.name}
                component={RadioButton}
                value="Choice 1"
                type="radio"
                checked={radioState.radio1}
                onChange={checkedRadioButton}
              />
            </label>
          </div>
          <div>
            <label>
              Choice 2
              <Field
                name={props.input.name}
                component={RadioButton}
                value="Choice 2"
                type="radio"
                checked={radioState.radio2}
                onChange={checkedRadioButton}
              />
            </label>
          </div>
          <div>
            <label>
              Choice 3
              <Field
                name={props.input.name}
                component={RadioButton}
                value="Choice 3"
                type="radio"
                checked={radioState.radio3}
                onChange={checkedRadioButton}
              />
            </label>
          </div>
        </div>
      </div>
      {touched && error && <p id={styles.errorTag}>{error}</p>}
    </div>
  );
}
