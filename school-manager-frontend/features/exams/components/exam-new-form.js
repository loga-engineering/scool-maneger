import React from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack} from "@mui/material";
import {useRouter} from "next/navigation";
import {useCreateExam} from "@/features/exams/exam-services";
import FormikTextField from "@/shared/forms/formik-text-field";
import {FormikDatePicker} from "@/shared/forms/formik-date-picker";

export default function ExamNewForm() {

    const router = useRouter();
    const createExam = useCreateExam();

    const initialValues = {
        subject: '',
        examDate: '',
        teacherName: '',
    };

    const validationSchema = Yup.object().shape({
        examDate: Yup.string().required("La date d'examen est obligatoire"),
        subject: Yup.string().required("La matière est obligatoire"),
        teacherName: Yup.string().required('Le nom du prof est obligatoire'),
    });

    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            createExam.mutate(values,{
                onSuccess: (data) => {
                    console.log("===> ",data);
                    router.push("/exams/" + data.id);
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
                        <FormikTextField name={"subject"} label={"Matière"}/>
                        <FormikDatePicker name={"examDate"} label={"Date d'examen"} />
                        <FormikTextField name={"teacherName"} label={"Nom prof."}/>

                        <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button type="reset">
                                {"Annuler"}
                            </Button>

                            <Button type={"submit"} variant={"contained"}>
                                {"Céer"}
                            </Button>
                        </Stack>

                    </Stack>
                </Card>
            </Form>
        </FormikProvider>
    );
}

