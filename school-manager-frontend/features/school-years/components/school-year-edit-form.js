import React, {useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, TextField} from "@mui/material";
import { useEditSchoolYear } from "../school-year-services";
import {useRouter} from "next/navigation";
import FormikTextField from "@/shared/forms/formik-text-field";

export default function SchoolYearEditForm({currentValue}) {

    const router = useRouter();
    const [id, setId] = useState();
    const [schoolYear, setSchoolYear] = useState();
    const editSchoolYear = useEditSchoolYear(id, schoolYear);

    const initialValues = {
        year: currentValue.year,
        startDate: currentValue.startDate,
        endDate: currentValue.endDate,
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

                setSchoolYear(values);
                setId(currentValue.id);
                editSchoolYear.mutate();

                router.push("/school-years/" + currentValue.id);

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

                        <FormikTextField name={"year"} label={"Année"}/>
                        <FormikTextField name={"startDate"} label={"Date de debut"} type={"date"} />
                        <FormikTextField name={"endDate"} label={"Date de fin"} type={"date"} />

                        <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button type="reset">
                                {"Annuler"}
                            </Button>

                            <Button type={"submit"} variant={"outlined"}>
                                {"Modifier"}
                            </Button>
                        </Stack>

                    </Stack>
                </Card>
            </Form>
        </FormikProvider>
    );
}

