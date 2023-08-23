import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DatePickerField = ({ field, form, ...other }) => {
    const currentError = form.errors[field.name];

    return (
        <KeyboardDatePicker
            clearable
            disablePast
            name={field.name}
            value={field.value}
            format="MM/dd/yyyy"
            helperText={currentError}
            error={Boolean(currentError)}
            onError={error => {
                if (error !== currentError) {
                    form.setFieldError(field.name, error);
                }
            }}
            onChange={date => form.setFieldValue(field.name, date, false)}
            {...other}
        />
    );
};

const MyForm = () => (
    <Formik
        initialValues={{ date: new Date() }}
        onSubmit={values => console.log(values)}
    >
        {({ submitForm }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form>
                    <Field name="date" component={DatePickerField} />
                    <br />
                    <Field name="name" type="text" component={TextField} label="Name" />
                    <br />
                    <button type="submit" onClick={submitForm}>
                        Submit
                    </button>
                </Form>
            </MuiPickersUtilsProvider>
        )}
    </Formik>
);

export default MyForm;
