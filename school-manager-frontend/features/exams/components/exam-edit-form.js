import React from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, TextField} from "@mui/material";
import {updateExamById} from "../exam-services";
import {useRouter} from "next/navigation";

export default function ExamEditForm({currentValue}) {

    const router = useRouter();

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
                console.log("===>: ", values);

                const updated = await updateExamById(currentValue.id, values);

                router.push("/exams/" + updated.id);

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
                            label="Matière"
                            variant={"outlined"}
                            {...formik.getFieldProps("subject")}
                            error={!!formik.errors["subject"]}
                            helperText={formik.errors["subject"]}
                        />

                        <TextField
                            fullWidth
                            type={"date"}
                            label="Date d'examen"
                            {...formik.getFieldProps("examDate")}
                            error={!!formik.errors["examDate"]}
                            helperText={formik.errors["examDate"]}
                        />

                        <TextField
                            fullWidth
                            label="Nom prof."
                            {...formik.getFieldProps("teacherName")}
                            error={!!formik.errors["teacherName"]}
                            helperText={formik.errors["teacherName"]}
                        />

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

