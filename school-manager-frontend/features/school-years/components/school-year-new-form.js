import React from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, TextField} from "@mui/material";
import {createSchoolYear} from "../school-year-services";
import {useRouter} from "next/navigation";

export default function SchoolYearNewForm() {

    const router = useRouter();

    const initialValues = {
        year: '',
        startDate: Date.now(),
        endDate: Date.now(),
    };

    const validationSchema = Yup.object().shape({
        year: Yup.string().required("L'année est obligatoire"),
        startDate: Yup.string().required("La date de debut est obligatoire"),
        endDate: Yup.string().required('La date de fin est obligatoire'),
    });

    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                console.log("===>: ", values);

                const created = await createSchoolYear(values);

                router.push("/school-years/" + created.id);

            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <Card>
                    <Stack spacing={3} p={3}>
                        <TextField
                            fullWidth
                            label="Année"
                            {...formik.getFieldProps("year")}
                            error={!!formik.errors["year"]}
                            helperText={formik.errors["year"]}
                        />

                        <TextField
                            fullWidth
                            type={"date"}
                            label="Date de debut"
                            {...formik.getFieldProps("startDate")}
                            error={!!formik.errors["startDate"]}
                            helperText={formik.errors["startDate"]}
                        />

                        <TextField
                            fullWidth
                            type={"date"}
                            label="Date de fin"
                            {...formik.getFieldProps("endDate")}
                            error={!!formik.errors["endDate"]}
                            helperText={formik.errors["endDate"]}
                        />

                        <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button type="reset">
                                {"Annuler"}
                            </Button>

                            <Button type={"submit"} variant={"outlined"}>
                                {"Céer"}
                            </Button>
                        </Stack>

                    </Stack>
                </Card>
            </Form>
        </FormikProvider>
    );
}

