"use client"
import React, {useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, Select, MenuItem, InputLabel} from "@mui/material";
import {useRouter} from "next/navigation";
import { useSearchClassrooms} from "@/features/classrooms/classroom-services";
import {findByClassroomId} from "@/features/students/student-services";
import { useSearchExams} from "@/features/exams/exam-services";
import {useEditGrade} from "@/features/grades/grade-services";
import FormikTextField from "@/shared/forms/formik-text-field";

export default function GradeEditForm({currentValue}) {

    const router = useRouter();
    const [id, setId] = useState();
    const [grade, setGrade] = useState();
    const [query, setQuery] = useState();
    const editGrade = useEditGrade();
    const {data: classrooms, isLoading : classroomLoading} = useSearchClassrooms({query});
    const {data: exams, isLoading : examLoading} = useSearchExams({query});

    const [students, setStudents] = useState([]);
    const fetchStudents = (id) => {
        try {
            findByClassroomId(id).then(setStudents);
            //console.log(students);
        } catch (error) {
            console.error("Erreur lors de la récupération des élèves : ", error);
        }
    };

    const initialValues = {
        value: currentValue.value,
        student: {
            id: currentValue.student.id,
            classroom : {
                id: currentValue.student.classroom.id
            }
        },
        exam: {
        id: currentValue.exam.id
        }
    };

    const validationSchema = Yup.object().shape({
        value: Yup.string().required("La note est obligatoire"),

    });

    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                setGrade(values);
                setId(currentValue.id);
                editGrade.mutate();

                router.push("/grades/" + currentValue.id);

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

                        <InputLabel id="select-filled-label1">Classe</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-filled-label1"
                            {...formik.getFieldProps("student.classroom.id")}
                            error={!!formik.errors["student.classroom.id"]}
                            helperText={formik.errors["student.classroom.id"]}
                            onChange={(event) => fetchStudents(event.target.value)}
                        >
                            {classrooms.map((classroom) => (
                                <MenuItem key={classroom.id} value={classroom.id}> {classroom.name}</MenuItem>
                            ))}
                        </Select>

                        <InputLabel id="select-filled-label2">Elève</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-filled-label2"
                            {...formik.getFieldProps("student.id")}
                            error={!!formik.errors["student.id"]}
                            helperText={formik.errors["student.id"]}
                        >
                            {students.map((student) => (
                                <MenuItem key={student.id} value={student.id}> {student.registrationNumber+" / "+student.firstName+" "+student.lastName}</MenuItem>
                            ))}
                        </Select>

                        <InputLabel id="select-filled-label3">Examen</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-filled-label3"
                            {...formik.getFieldProps("exam.id")}
                            error={!!formik.errors["exam.id"]}
                            helperText={formik.errors["exam.id"]}
                        >
                            {exams.map((exam) => (
                                <MenuItem key={exam.id} value={exam.id}> {exam.examDate+" / "+exam.subject+" / "+exam.teacherName}</MenuItem>
                            ))}
                        </Select>

                        <FormikTextField name={"value"} label={"Note"}/>

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

