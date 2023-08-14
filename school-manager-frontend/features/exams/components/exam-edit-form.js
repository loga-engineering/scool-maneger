import React, {useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, TextField} from "@mui/material";
import {useEditExam} from "../exam-services";
import {useRouter} from "next/navigation";
import FormikTextField from "@/shared/forms/formik-text-field";

export default function ExamEditForm({currentValue}) {

    const router = useRouter();
    const [id, setId] = useState();
    const [exam, setExam] = useState();
    const editExam = useEditExam(id, exam);

    const initialValues = {
        examDate: currentValue.examDate,
        subject: currentValue.subject,
        teacherName: currentValue.teacherName,
    };

    console.log(initialValues);

    const validationSchema = Yup.object().shape({
        examDate: Yup.string().required("La date d'examen est obligatoire"),
        subject: Yup.string().required("La matière est obligatoire"),
        teacherName: Yup.string().required('Le nom du prof est obligatoire'),
    });

    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                setExam(values);
                setId(currentValue.id);
                editExam.mutate();

                router.push("/exams/" + currentValue.id);

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
                        <FormikTextField name={"subject"} label={"Matière"}/>
                        <FormikTextField name={"examDate"} label={"Date d'examen"} type={"date"} />
                        <FormikTextField name={"teacherName"} label={"Nom prof."}/>

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

