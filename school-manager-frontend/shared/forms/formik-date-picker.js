import React, {useState} from 'react';
import {TextField} from "@mui/material";
import formik, {useField} from "formik";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
/*export default function FormikDatePicker({label, name, ...other}) {

    const [field, meta, helpers] = useField(name);
    //const [value, setValue] = useState(dayjs());

    /!*const handleDateChange = (newValue) => {
        // Formater la date sélectionnée
        const formattedDate = newValue.format("YYYY-MM-DD");
        // Mettre à jour la valeur de l'état local
        setValue(formattedDate);
    };*!/
    const handleDateChange = (date) => {
        helpers.setValue(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                fullWidth
                label={label}
                value={field.value}
                onChange={handleDateChange}

                format="YYYY-MM-DD"
                {...field}
                error={!!meta.error}
                helperText={meta.error}
                {...other}
            />
        </LocalizationProvider>
    );
}*/
