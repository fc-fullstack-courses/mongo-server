import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { registration } from '../../redux/slices/userSlice';

const initialValues = {
  firstName: '',
  lastName: '',
  isMale: true,
  email: '',
  password: '',
};

function RegistrationForm(props) {
  const dispatch = useDispatch();
  const submitHandler = (values, formikBag) => {
    dispatch(registration(values));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <label>
          First name:
          <Field name='firstName' />
        </label>
        <label>
          Last name:
          <Field name='lastName' />
        </label>
        <label>
          Email:
          <Field name='email' />
        </label>
        <label>
          Password:
          <Field name='password' type='password' />
        </label>
        <fieldset>
          <legend>Gender</legend>
          <label>
            Male: <Field type='radio' name='isMale' value={true} />
          </label>
          <label>
            Female: <Field type='radio' name='isMale' value={false} />
          </label>
        </fieldset>
        <button>Submit</button>
      </Form>
    </Formik>
  );
}

export default RegistrationForm;
