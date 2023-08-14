import React from 'react';
import {TextField} from "@mui/material";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {useFormikContext} from "formik";

export function FormikDatePicker({name,label, ...others}) {
    const {getFieldProps, setFieldValue, touched, errors} = useFormikContext();
    const errorMessage = touched[name] && errors[name];
    return (
        <DesktopDatePicker
            fullWidth
            label={label}
            {...getFieldProps(name)}
            format={"DD-MM-YYYY"}
            mask={"__-__-____"}
            onChange={(newValue) => setFieldValue(name, newValue)}
            components={{
                TextField: (props) => (
                    <TextField fullWidth {...props} helperText={errorMessage} error={Boolean(errorMessage)}/>
                )
            }}
            {...others}
        />
    )
}

/*
export function FormikTimePicker({name, ...others}) {
    const {getFieldProps, setFieldValue, touched, errors} = useFormikContext();
    const errorMessage = touched[name] && errors[name];
    return (
        <DesktopTimePicker
            {...getFieldProps(name)}
            inputFormat="HH:mm"
            onChange={(newValue) => setFieldValue(name, newValue)}
            renderInput={(params) => (
                <TextField fullWidth {...params} helperText={errorMessage} error={Boolean(errorMessage)}/>
            )}
            {...others}
        />
    )
}

 */