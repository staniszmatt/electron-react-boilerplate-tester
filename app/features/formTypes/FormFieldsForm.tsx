import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormTextArea from '../formFieldComponents/FormTextArea';
import styles from './FormFieldsForm.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormProps {}

interface DispatchProps {
  onSubmit: () => void;
  props: {
    textAreaValue: string;
  };
}

const FormFieldsForm = (
  prop: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = prop;
  const { textAreaValue } = prop.props;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-container']}
    >
      <div>
        <div>
          <Field
            label="Text Area Form Field:"
            component={FormTextArea}
            name="textAreaValue"
            type="textarea"
            aria-multiline
            defaultValue={textAreaValue}
            rows="10"
          />
        </div>
        <div className={styles['form-btn-container']}>
          <div>
            <button type="button" onClick={handleSubmit(onSubmit)}>
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

interface Values {
  textAreaValue: string;
}

function validate(values: Values) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any = {};
  const { textAreaValue } = values;
  // Check if value exists before testing

  if (textAreaValue) {
    if (textAreaValue.length > 700) {
      errors.textAreaValue = 'Over max character limit!';
    }
  }

  return errors;
}

export default reduxForm<FormProps, DispatchProps>({
  form: 'formTypes',
  validate,
  // Set Initial values to null so returns null if no changes are made.
  initialValues: {
    textAreaValue: null,
  },
})(FormFieldsForm);
