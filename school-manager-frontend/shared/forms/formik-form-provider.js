import React from 'react';
import {Form, FormikProvider} from "formik";
import {Card, Stack} from "@mui/material";
import FormikSubmitButton from "./formik-submit";

export function FormikForm({formik, children}) {
    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                {children}
            </Form>
        </FormikProvider>
    );
}


export function SimpleFormikForm({formik, spacing = 3, p = 3, isEdit, onCancel, children}) {
    return (
        <FormikForm formik={formik}>
            <Stack spacing={spacing} p={p}>
                {children}

                <FormikSubmitButton validateLabel={isEdit ? "Modifier" : "Créer"} onCancel={onCancel}/>
            </Stack>
        </FormikForm>
    )
}


export function SimpleCardFormikForm({formik, spacing = 3, p = 3, isEdit, onCancel, children}) {
    return (
        <Card>
            <SimpleFormikForm formik={formik} spacing={spacing} p={p} isEdit={isEdit} onCancel={onCancel}>
                {children}
            </SimpleFormikForm>
        </Card>
    )
}