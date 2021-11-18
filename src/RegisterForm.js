import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import store from './store';
const request = require('superagent');

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

            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                const response = await fetch('https://acccnseatengine.azurewebsites.net/api/HttpTriggerSeat?', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    referrerPolicy: 'no-referrer', 
                    body: JSON.stringify(values) // body data type must match "Content-Type" header
                });
                setSubmitting(false);
                console.log(response.json)
                return response.json();
            }}
        >
            {({ isSubmitting, setFieldValue }) => {
                store.db.setFieldValue = setFieldValue;
                return <Form>
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
            }
            }
        </Formik>
    </div>
);



export default RegisterForm;