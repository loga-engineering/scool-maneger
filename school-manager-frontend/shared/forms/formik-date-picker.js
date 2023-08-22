import React from 'react';
import {TextField} from "@mui/material";
import {DatePicker, DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {useField, useFormikContext} from "formik";
import {RecoilRoot} from "recoil";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export function FormikDatePicker({name,label, ...others}) {
    const [field, meta, form] = useField(name);
    const errorMessage = meta.touched && meta.error;

    const handleDateChange = (newValue) => {
        const selectedDate = newValue instanceof Date ? newValue : new Date(newValue);
        form.setFieldValue(name, selectedDate);
    };

    return (
        <DesktopDatePicker
            fullWidth
            label={label}
            value={field.value ? new Date(field.value) : null}
            format={"YYYY-MM-DD"}
            mask={"____-__-__"}
            onChange={handleDateChange}
            slots={{
                TextField: (props) => (
                    <TextField fullWidth {...props} helperText={errorMessage} error={Boolean(errorMessage)}/>
                )
            }}
            {...others}
        />
    );
}


export default function DatePickerProvider({children}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
    );
}

/*
components={{
                TextField: (props) => (
                    <TextField fullWidth {...props} helperText={errorMessage} error={Boolean(errorMessage)}/>
                )
            }}

renderInput={(params) => (
                <TextField fullWidth {...params} helperText={errorMessage} error={Boolean(errorMessage)}/>
            )}


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