import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/slices/messageSlice';

const initialValues = {
  body: '',
};

function Chat() {
  const { messages, isLoading, error } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const submitForm = (values, formikBag) => {
    formikBag.resetForm();
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message._id}>
          <span>
            {message.author.firstName} {message.author.lastName} says:
          </span>
          {message.body}
        </div>
      ))}
      <Formik initialValues={initialValues} onSubmit={submitForm}>
        <Form>
          <Field name="body" />
          <button type='submit'>Send message</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Chat;
