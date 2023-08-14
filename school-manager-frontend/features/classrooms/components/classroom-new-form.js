"use client"
import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, TextField, Select, MenuItem, InputLabel} from "@mui/material";
import {useCreateClassroom} from "../classroom-services";
import {useRouter} from "next/navigation";
import {useSearchSchoolYears} from "@/features/school-years/school-year-services";
import FormikTextField from "@/shared/forms/formik-text-field";

export default function ClassroomNewForm() {

    const router = useRouter();
    const createClassroom = useCreateClassroom();

    const [query, setQuery] = useState();
    const {data: schoolYears, isLoading, isError, error, refetch} = useSearchSchoolYears({query});

    const initialValues = {
        name: '',
        level: '',
        headTeacherName: '',
        schoolYear: {
            id: ''
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Le nom est obligatoire"),
        level: Yup.string().required("Le niveau est obligatoire"),
        headTeacherName: Yup.string(),
    });



    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            createClassroom.mutate(values,{
                onSuccess: (data) => {
                    router.push("/classrooms/" + data.id);
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
                        <FormikTextField name={"name"} label={"Nom"}/>
                        <FormikTextField name={"level"} label={"Niveau"}/>
                        <FormikTextField name={"headTeacherName"} label={"Prof. Titulaire"}/>

                        <InputLabel id="select-filled-label">Année scolaire</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-filled-label"
                            {...formik.getFieldProps("schoolYear.id")}
                            error={!!formik.errors["schoolYear.id"]}
                            helperText={formik.errors["schoolYear.id"]}
                        >
                            {schoolYears?.map((schoolYear) => (
                                <MenuItem key={schoolYear.id} value={schoolYear.id}> {schoolYear.year}</MenuItem>
                            ))}
                        </Select>

                        <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button type="reset">
                                {"Annuler"}
                            </Button>

                            <Button type={"submit"} variant={"outlined"}>
                                {"Créer"}
                            </Button>
                        </Stack>

                    </Stack>
                </Card>
            </Form>
        </FormikProvider>
    );
}

