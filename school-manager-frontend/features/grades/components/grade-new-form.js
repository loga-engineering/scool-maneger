"use client"
import React, {useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, TextField, Select, MenuItem, InputLabel} from "@mui/material";
import {useRouter} from "next/navigation";
import {findByClassroomId, useSearchStudents} from "@/features/students/student-services";
import {useCreateGrade, useFindGradeById} from "../grade-services";
import {useSearchClassrooms} from "@/features/classrooms/classroom-services";
import {useSearchExams} from "@/features/exams/exam-services";
import FormikTextField from "@/shared/forms/formik-text-field";

export default function GradeNewForm() {

    const router = useRouter();
    const [query, setQuery] = useState();
    const [temp, setTemp] = useState("");
    const createGrade = useCreateGrade();
   // const {data: students, isLoading: studentLoading} = useSearchStudents({query});
    const {data: classrooms, isLoading : classroomLoading} = useSearchClassrooms({query: temp});
    const {data: exams, isLoading : examLoading} = useSearchExams({query: temp});

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
        value: '',
        student: {
            id: '',
            classroom : {
                id: ''
            }
        },
        exam: {
        id: ''
        }
    };

    const validationSchema = Yup.object().shape({
        value: Yup.string().required("La note est obligatoire"),

    });



    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            createGrade.mutate(values,{
                onSuccess: (data) => {
                    console.log("===> ",data);
                    router.push("/grades/" + data.id);
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

                        <InputLabel id="select-filled-label1">Classe</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-filled-label1"
                            value={temp}
                            {...formik.getFieldProps("student.classroom.id")}
                            error={!!formik.errors["student.classroom.id"]}
                            helperText={formik.errors["student.classroom.id"]}
                            onChange={(event) => fetchStudents(event.target.value)}
                        >
                            {classrooms?.map((classroom) => (
                                <MenuItem key={classroom.id} value={classroom.id} onSelect={() => setTemp(classroom.name)}> {classroom.name}</MenuItem>
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
                            <MenuItem key={""} value={""}> {"None"}</MenuItem>
                            {students?.map((student) => (
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
                            {exams?.map((exam) => (
                                <MenuItem key={exam.id} value={exam.id}> {exam.examDate+" / "+exam.subject+" / "+exam.teacherName}</MenuItem>
                            ))}
                        </Select>

                        <FormikTextField name={"value"} label={"Note"}/>

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

