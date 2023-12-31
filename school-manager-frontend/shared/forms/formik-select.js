import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useFormikContext} from "formik";
import React from "react";

export function FormikSelectField({name, label, options, children, ...others}) {
    const {getFieldProps, touched, errors} = useFormikContext();
    const errorMessage = touched[name] && errors[name];

    return (
        <FormControl fullWidth>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                {...getFieldProps(name)}
                label={label}
                labelId={name}
                placeholder={label}
                error={Boolean(errorMessage)}
                {...others}
            >
                <MenuItem key={""} value={""}>No Selected // Or Empty</MenuItem>
                {options?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                ))}

                {children}
            </Select>
        </FormControl>
    );
}
export function FormikSelect({name, label, options, children, ...others}) {
    const {getFieldProps, touched, errors} = useFormikContext();
    const errorMessage = touched[name] && errors[name];

    return (
        <FormControl fullWidth>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                {...getFieldProps(name)}
                label={label}
                labelId={name}
                placeholder={label}
                error={Boolean(errorMessage)}
                {...others}
            >
                <MenuItem key={""} value={""}>No Selected // Or Empty</MenuItem>
                {options?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                ))}

                {children}
            </Select>
        </FormControl>
    );
}