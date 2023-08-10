import React from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, TextField} from "@mui/material";
import {createSchoolYear} from "../school-year-services";

export default function SchoolYearDetails({currentValue}) {

    return (
        <Card>
            <Stack spacing={3} p={3}>
                <TextField
                    fullWidth
                    label="ID"
                    value={currentValue.id}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Année"
                    value={currentValue.year}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Date de début"
                    value={currentValue.startDate}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Date de fin"
                    value={currentValue.endDate}
                    InputProps={{readOnly: true}}
                />

            </Stack>
        </Card>
    );
}

