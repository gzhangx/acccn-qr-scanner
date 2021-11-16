import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const RegisterForm = (props) => (
    <div>
        <h1>ACCCN Register</h1>
        <Formik
            initialValues={props.initialFormValues || {
                name: '',
                email: '',
                id:'',
            }}
            validate={values => {
                const errors = {};
                if (!values?.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values?.email)
                ) {
                    errors.email = 'Invalid email address';
                }

                if (!values?.name || !values?.name.trim()) {
                    errors.name = 'Required';
                };
                return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                    </div>
                    <div className="form-group">
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" />
                    </div>
                    <div className="form-group">
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
);



export default RegisterForm;