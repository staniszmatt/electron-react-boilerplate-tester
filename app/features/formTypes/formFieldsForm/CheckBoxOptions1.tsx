/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Field } from 'redux-form';
import CheckBox from '../../../components/formFieldComponents/CheckBox';
import styles from './CheckRadioStyling.css';

interface Props {
  checkedValue: {
    multiChoice1: boolean;
    multiChoice2: boolean;
    multiChoice3: boolean;
  };
  label: string;
  name: string;
  meta: {
    error: string;
    touched: boolean;
  };
}

interface CheckBoxState {
  checkBox1: boolean;
  checkBox2: boolean;
  checkBox3: boolean;
}

export default function FormYesNo(props: Props) {
  const {
    name,
    checkedValue: { multiChoice1, multiChoice2, multiChoice3 },
    label,
    meta: { error, touched },
  } = props;

  // Setup useState with TypeScript interface "ValueState"
  const [checkBoxState, setCheckBoxState] = useState<CheckBoxState>({
    checkBox1: multiChoice1,
    checkBox2: multiChoice2,
    checkBox3: multiChoice3,
  });
  // Change Check Box state based on value
  const updateCheckBoxState = (event: { currentTarget: { name: string } }) => {
    switch (event.currentTarget.name) {
      case 'multiChoice1':
        setCheckBoxState({
          ...checkBoxState,
          checkBox1: !checkBoxState.checkBox1,
        });
        break;
      case 'multiChoice2':
        setCheckBoxState({
          ...checkBoxState,
          checkBox2: !checkBoxState.checkBox2,
        });
        break;
      case 'multiChoice3':
        setCheckBoxState({
          ...checkBoxState,
          checkBox3: !checkBoxState.checkBox3,
        });
        break;
      default:
    }
  };

  return (
    <div className={styles.buttonBoxContainer}>
      <div>
        <label htmlFor={name}>{label}</label>
        <div>
          <div>
            <label>
              Multi Choice 1
              <Field
                name="multiChoice1"
                component={CheckBox}
                checked={checkBoxState.checkBox1}
                onChange={updateCheckBoxState}
              />
            </label>
          </div>
          <div>
            <label>
              Multi Choice 2
              <Field
                name="multiChoice2"
                component={CheckBox}
                checked={checkBoxState.checkBox2}
                onChange={updateCheckBoxState}
              />
            </label>
          </div>
          <div>
            <label>
              Multi Choice 3
              <Field
                name="multiChoice3"
                component={CheckBox}
                checked={checkBoxState.checkBox3}
                onChange={updateCheckBoxState}
              />
            </label>
          </div>
        </div>
      </div>
      {touched && error && <p id={styles.errorTag}>{error}</p>}
    </div>
  );
}
