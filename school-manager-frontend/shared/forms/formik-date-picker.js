"use client";
import dayjs from "dayjs";
import React, {useEffect, useState} from 'react';
import {useField, useFormikContext} from "formik";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";

export function FormikDatePicker({ name, label, isEdit, ...others }) {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const errorMessage = meta.touched && meta.error;

    const [selectedDate, setSelectedDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);

    const handleDateChange = (newValue) => {
        const selectedDate = dayjs(newValue).format("YYYY-MM-DD");
        setSelectedDate(selectedDate);
    };

    useEffect(() => {
        if(isEdit){
            const value = dayjs(field.value);
            setCurrentDate(value);
        }
    }, []);

    useEffect(() => {
        if(selectedDate) {
            setFieldValue(name, selectedDate).then(r => console.log("selectedDate =====> ",selectedDate));
        }
    }, [selectedDate]);

    if (!isEdit){
        return (
            <DesktopDatePicker
                label={label}
                value={selectedDate}
                valueFormat="yyyy-MM-dd"
                format={"YYYY-MM-DD"}
                mask={"____-__-__"}
                onChange={handleDateChange}
                slotProps={{ textField: { variant: 'outlined' } }}
                {...others}
            />

    ); } else {
        return (
            <DesktopDatePicker
                label={label}
                value={currentDate}
                valueFormat="yyyy-MM-dd"
                format={"YYYY-MM-DD"}
                mask={"____-__-__"}
                onChange={handleDateChange}
                slotProps={{ textField: { variant: 'outlined' } }}
                {...others}
            />

        );

    }
}

export function DatePickerProvider({children}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
    );
}

