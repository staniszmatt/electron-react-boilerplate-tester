/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormTextArea from '../../../components/formFieldComponents/TextArea';
import InputField from '../../../components/formFieldComponents/InputField';
import DropDown from '../../../components/formFieldComponents/DropDown';
import RadioButtonOption1 from './RadioButtonOption1';
import RadioButtonOption2 from './RadioButtonOption2';
import styles from './FormFieldsForm.css';

// Need to include the interface to fix TypeScript errors here but needed to disable
// no-empty-interface since we aren't using any of the types from FormProps.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormProps {}
interface DispatchProps {
  onSubmit: () => void;
  initialValues: {
    textAreaValue1: string;
    textAreaValue2: string;
    input1: string;
    input3: string;
    optionMenu1: string;
    radioButtonMenu1: string;
  };
}

// TypeScript interface set for formProps to include redux-form TypeScript interface.
// Don't use props, since it would error due to the passed props would have the same name.
const FormFieldsForm = (
  formProps: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = formProps;
  const {
    textAreaValue1,
    textAreaValue2,
    input1,
    input3,
    optionMenu1,
    radioButtonMenu1,
  } = formProps.initialValues;
  // Created List of drop-down options for drop-down field component
  const dropDownOption = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
  ];
  const dropDownChoice = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div>
        {/** Text Area 1 */}
        <div>
          <Field
            label="Text Area Field 1:"
            component={FormTextArea}
            name="textAreaValue1"
            type="textarea"
            aria-multiline
            defaultValue={textAreaValue1}
            rows="10"
          />
        </div>
        {/** Text Area 2 */}
        <div>
          <Field
            label="Text Area Field 2:"
            component={FormTextArea}
            name="textAreaValue2"
            type="textarea"
            aria-multiline
            defaultValue={textAreaValue2}
            rows="10"
          />
        </div>
        {/** Input Field 1 */}
        <div>
          <Field
            label="Input Field 1 (Cap Lock):"
            component={InputField}
            name="input1"
            type="text"
            // Custom redux-form property to pass to input field component to capitalize all letters.
            toCap="true"
            defaultValue={input1}
          />
        </div>
        {/** Input Field 2 */}
        <div>
          <Field
            label="Input Field 2 (Number Only):"
            component={InputField}
            name="input2"
            type="text"
          />
        </div>
        {/** Input Field 3 */}
        <div>
          <Field
            label="Input Field 3 (Any String):"
            component={InputField}
            name="input3"
            type="text"
            defaultValue={input3}
          />
        </div>
        {/** Drop-Down Field 1 */}
        <div>
          <Field
            label="Option Menu:"
            name="optionMenu1"
            component={DropDown}
            type="select"
            data={dropDownOption}
            defaultValue={optionMenu1}
          />
        </div>
        {/** Drop-Down Field 2 */}
        <div>
          <Field
            label="Option Menu:"
            name="optionMenu2"
            component={DropDown}
            type="select"
            data={dropDownChoice}
          />
        </div>
        {/** Radio Button Field 1 */}
        <div>
          <Field
            label="Radio Button Option 1:"
            name="radioButtonMenu1"
            component={RadioButtonOption1}
            type="radio"
            defaultValue={radioButtonMenu1}
          />
        </div>
        {/** Radio Button Field 2 */}
        <div>
          <Field
            label="Radio Button Option 2:"
            name="radioButtonMenu2"
            component={RadioButtonOption2}
            type="radio"
          />
        </div>
        {/** Submit Button */}
        <div>
          <div>
            <button type="button" onClick={handleSubmit(onSubmit)}>
              Submit Form
            </button>
          </div>
        </div>
        {/** Space to help separate out different element containers */}
      </div>
    </form>
  );
};

interface Values {
  textAreaValue1: string;
  textAreaValue2: string;
  input1: string;
  input2: number;
  input3: string;
  optionMenu1: string;
  optionMenu2: string;
  radioButtonMenu1: string;
  radioButtonMenu2: string;
}

function validate(values: Values): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any = {};
  const {
    textAreaValue1,
    textAreaValue2,
    input1,
    input2,
    input3,
    optionMenu1,
    optionMenu2,
    radioButtonMenu1,
    radioButtonMenu2,
  } = values;

  // Just an example of error checking that can be done.
  // These checks check for string length as a character limit, this one limits to 20 char.
  if (textAreaValue1) {
    if (textAreaValue1.length > 560) {
      errors.textAreaValue1 = `Over 560 max character limit by ${
        textAreaValue1.length - 560
      } characters!`;
    }
  }
  // An example for error checking to limit text box to 10 char.
  if (textAreaValue2) {
    if (textAreaValue2.length > 700) {
      errors.textAreaValue2 = `Over 700 max character limit by ${
        textAreaValue2.length - 700
      } characters!`;
    }
  }
  // Input 1, setting up where there must be something added to the field.
  if (!input1) {
    errors.input1 = 'This requires an input.';
  } else if (input1) {
    if (input1.length > 10) {
      errors.input1 = `Only allowed 10 Char, over by ${input1.length - 10}`;
    }
  }
  // Input 2, setting errors if empty or not a number
  if (!input2) {
    errors.input2 = 'This requires an input of a number.';
  } else if (input2) {
    // TypeScript setup for isNaN
    if (Number.isNaN(Number(input2))) {
      errors.input2 = 'This requires to be a number!';
    }
  }
  // Input 3, same as input1 only this field doesn't capitalize the letter.
  if (!input3) {
    errors.input3 = 'This requires an input.';
  } else if (input3) {
    if (input3.length > 10) {
      errors.input3 = `Only allowed 10 Char, over by ${input3.length - 10}`;
    }
  }
  // Drop-Down Menu, verify a choice has been made.
  if (!optionMenu1) {
    errors.optionMenu1 = 'Please Make a choice.';
  }
  if (!optionMenu2) {
    errors.optionMenu2 = 'Please Make a choice.';
  }
  // Radio Button, verify a choice has been made.
  if (!radioButtonMenu1) {
    errors.radioButtonMenu1 = 'Please Make a choice.';
  }
  if (!radioButtonMenu2) {
    errors.radioButtonMenu2 = 'Please Make a choice.';
  }

  // Returns the error if any that then is attached to the <p> element
  // of the form field component.
  return errors;
}

export default reduxForm<FormProps, DispatchProps>({
  // Name of what you want the submitted form to be.
  form: 'formTypes',
  // Call the validate function for error handling for enforcing limits
  validate,
})(FormFieldsForm);
