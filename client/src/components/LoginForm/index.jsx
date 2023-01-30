import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm(props) {
  const dispatch = useDispatch();
  const submitHandler = (values, formikBag) => {
    dispatch(login(values));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <label>
          Email:
          <Field name='email' />
        </label>
        <label>
          Password:
          <Field name='password' type='password' />
        </label>
        <button>Login</button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
