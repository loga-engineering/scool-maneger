import React, {useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, TextField} from "@mui/material";
import { useCreateSchoolYear } from "../school-year-services";
import {useRouter} from "next/navigation";
import FormikTextField from "../../../shared/forms/formik-text-field";
import {FormikDatePicker} from "@/shared/forms/formik-date-picker";

export default function SchoolYearNewForm() {

    const router = useRouter();
    const createSchoolYear = useCreateSchoolYear();


    const initialValues = {
        year: "",
        startDate: "",
        endDate: "",
    };

    const validationSchema = Yup.object().shape({
        year: Yup.string().required("L'année est obligatoire"),
        startDate: Yup.string().required("La date de debut est obligatoire"),
        endDate: Yup.string().required('La date de fin est obligatoire'),
    });

    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {

            createSchoolYear.mutate(values,{
                onSuccess: (data) => {
                    console.log("===> ",data);
                    router.push("/school-years/" + data.id);
                },
                onError: (error) => {
                    console.error("===> ", error);
                    throw error;
                },
            });

        }
    });

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <Card>
                    <Stack spacing={3} p={3}>
                        <FormikTextField name={"year"} label={"Année"}/>
                        <FormikDatePicker name={"startDate"} label={"Date de debut"} />
                        <FormikDatePicker name={"endDate"} label={"Date de fin"} />

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

