import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormTextArea from '../../../components/formFieldComponents/TextArea';
import styles from './FormFieldsForm.css';

// Need to include the interface to fix TypeScript errors here but needed to disable
// no-empty-interface since we aren't using any of the types from FormProps.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormProps {}

interface DispatchProps {
  onSubmit: () => void;
  props: {
    textAreaValue1: string;
    textAreaValue2: string;
  };
  initialValues?: {
    textAreaValue1: string;
    textAreaValue2: string;
  };
}

// TypeScript interface set for formProps to include redux-form TypeScript interface.
// Don't use props, since it would error due to the passed props would have the same name.
const FormFieldsForm = (
  formProps: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = formProps;
  const { textAreaValue1, textAreaValue2 } = formProps.props;

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
}

function validate(values: Values) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any = {};
  const { textAreaValue1, textAreaValue2 } = values;

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
  // Returns the error if any that then is attached to the <p> element
  // of the form field component.
  return errors;
}

export default reduxForm<FormProps, DispatchProps>({
  // Name of what you want the submitted form to be.
  form: 'formTypes',
  // Call the validate function for error handling for enforcing limits
  validate,
  // Since I want to pass default strings to form fields, we need to call out the initial key values
  // so we don't fail validation testing after submit is clicked. If no default is required, then key value isn't needed.
  initialValues: {
    textAreaValue1: null,
    textAreaValue2: null,
  },
})(FormFieldsForm);
