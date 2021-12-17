import React, {useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import store from './store';
import Autocomplete from 'react-autocomplete';
import QRCode from 'react-qr-code';

function RegisterForm(props) {
    const { qrValue, setQrValue, initialFormValues, setInitialFormValues } = props;
    const [rspMsg, setRspMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const roleValue = initialFormValues['role'];
    const [allQrCodes, setAllQrCodes] = useState([]);



    const doFetch = async body => {
        const response = await fetch('https://acccncheckin.azurewebsites.net/api/checkin?code=OAJh3Hrav1Y6m3BRaPnzR8D8EEfJUNVazmaa4XU0A%2FFClbMbw6pxZg%3D%3D', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body),
        });
        const res = await response.json();
        return res;
    }

    return (
        <div>
            {errMsg && <div>{errMsg}</div>}
            <Formik
                initialValues={props.initialFormValues || {
                    name: '',
                    email: '',
                    count: 1,
                    id: '',
                }}
                validate={() => {
                    const values = props.initialFormValues;
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
                        errors.count = 'Required';
                    } else {
                        if (!values.count.toString().match(/^[0-9]+$/)) {
                            errors.count = 'Count must be a number';
                        }
                    }
                    return errors;
                }}

                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);                    
                    //const existing = allQrCodes.find(u => u.email.toLowerCase() === values.email.toLowerCase());
                    //let id = existing ? existing.id : null; 
                    try {
                        const data = await doFetch(initialFormValues);
                        //if (!id) {                        
                        //    const idresponse = await doFetch({
                        //        ...values,
                        //        action: 'actionAddUser',
                        //    });
                        //    id = idresponse.id;
                        //    setAllQrCodes([...allQrCodes, {
                        //        ...values,
                        //        id,
                        //    }]);
                        //}
                        //setQrValue(id);
                        setSubmitting(false);
                        setRspMsg(data.responseMessage);
                        return data;
                    } catch (err) {
                        setErrMsg(`error ${err.message}`);
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, errors, isSubmitting, setFieldValue,
                    handleChange,
                }) => {
                    store.db.setFieldValue = setFieldValue;
                    const setFormValueAll = (name, val) => {
                        setFieldValue(name, val);
                        setInitialFormValues({
                            ...initialFormValues,
                            [name]:val,
                        });
                    }
                    const getAutoComplete = name => (
                        <Autocomplete
                            getItemValue={item => item[name]}
                            items={allQrCodes}
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                    {item.name} - {item.email}
                                </div>
                            }
                            shouldItemRender={(item, value) => item[name].toLowerCase().indexOf(value.toLowerCase()) > -1}
                            value={initialFormValues[name]}
                            onChange={(e) => {                                
                                setFormValueAll(name, e.target.value);                                
                            }}
                            onSelect={val => setFormValueAll(name,val)}
                        />
                    );
                    return <Form className="form text-center">
                        <div class="bg-primary text-white p-5 text-center">
                            <h1>Acccn Seat Register</h1>
                            {rspMsg && < h2 > {rspMsg}</h2>}                            
                        </div>
                        <div className="container bg-success" style={{maxWidth:400}}>
                            <div className="row justify-content-center" >                            
                                <div className="justify-content-right col-2">Email</div>
                                <div className="form-group col-6">
                                    {
                                        getAutoComplete('email')
                                    }
                                    <ErrorMessage name="email" component="div" />
                                </div>                            
                            </div>
                            <div className="row justify-content-center">
                                <div className="justify-content-right col-2">Name</div>
                                <div className="form-group col-6">
                                    {
                                        getAutoComplete('name')
                                    }
                                    <ErrorMessage name="name" component="div" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="justify-content-right col-2">Count</div>
                                <div className="form-group col-6">
                                    <Field type="text" name="count" onChange={e => {
                                        setFormValueAll('count', e.target.value)
                                    }} />
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
                                        onChange={(e) => {
                                            setInitialFormValues({
                                                ...initialFormValues,
                                                role: e.target.value
                                            });
                                            handleChange(e);
                                        }}
                                        onSelect={val => {
                                            setInitialFormValues({
                                                ...initialFormValues,
                                                role: val
                                            });
                                        }}
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
            <div className="container">
                <div className="row">
                    {qrValue && <QRCode value={`${store.QRPREFIX}${qrValue}`}></QRCode>}
                </div>
            </div>
        </div>
    );
};



export default RegisterForm;