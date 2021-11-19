import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import store from './store';
import Autocomplete from 'react-autocomplete';

function RegisterForm(props) {
    const [rspMsg, setRspMsg] = useState('');
    const [roleValue, setRoleValue] = useState('会众');
    return (
        <div>                        
            <Formik
                initialValues={props.initialFormValues || {
                    name: '',
                    email: '',
                    count: 1,
                    id: '',
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

                    if (!values?.count) {
                        errors.name = 'Required';
                    } else {
                        if (isNaN(parseInt(values.count))) {
                            errors.name = 'Count must be a number';
                        }
                    }
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
                    const data = await response.json();
                    setRspMsg(data.responseMessage);
                    return data;
                }}
            >
                {({ values, errors, isSubmitting, setFieldValue }) => {
                    store.db.setFieldValue = setFieldValue;
                    return <Form className="form text-center">
                        <div class="bg-primary text-white p-5 text-center">
                            <h1>Acccn Seat Register</h1>
                            {rspMsg && < h2 > {rspMsg}</h2>}                            
                        </div>
                        <div className="container bg-success" style={{maxWidth:400}}>
                            <div className="row justify-content-center" >                            
                                <div className="justify-content-right col-2">Email</div>
                                <div className="form-group col-6">
                                    <Field type="email" name="email" />
                                    <ErrorMessage name="email" component="div" />
                                </div>                            
                            </div>
                            <div className="row justify-content-center">
                                <div className="justify-content-right col-2">Name</div>
                                <div className="form-group col-6">
                                    <Field type="text" name="name"  />
                                    <ErrorMessage name="name" component="div" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="justify-content-right col-2">Count</div>
                                <div className="form-group col-6">
                                    <Field type="text" name="count" />
                                    <ErrorMessage name="count" component="div" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="justify-content-right col-2">Role</div>
                                <div className="form-group col-6">
                                    <Autocomplete
                                        getItemValue={(item) => item.label}
                                        items={[
                                            { label: '会众' },
                                            { label: '主席' },
                                            { label: '牧師' },
                                            { label: '投影' },
                                            { label: '音效' },
                                            { label: '诗班' },
                                        ]}
                                        renderItem={(item, isHighlighted) =>
                                            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                {item.label}
                                            </div>
                                        }
                                        value={roleValue}
                                        onChange={(e) => setRoleValue(e.target.value)}
                                        onSelect={(val) => setRoleValue(val)}
                                    />
                                    <ErrorMessage name="role" component="div" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-8">
                                    <button type="submit" disabled={isSubmitting}>
                                        {values.id ? 'Register' : 'Get Sit'}
                                    </button>                                
                                </div>
                            </div>
                        </div>
                    </Form>
                }
                }
            </Formik>
        </div>
    );
};



export default RegisterForm;