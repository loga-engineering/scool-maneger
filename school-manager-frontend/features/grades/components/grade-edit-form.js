"use client"
import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, Stack, TextField, Select, MenuItem, InputLabel} from "@mui/material";
import {useRouter} from "next/navigation";
import {findAllClassroomNames} from "@/features/classrooms/classroom-services";
import {findByClassroomId} from "@/features/students/student-services";
import {findAllExams} from "@/features/exams/exam-services";
import {updateGradeById} from "@/features/grades/grade-services";

export default function GradeEditForm({currentValue}) {

    const router = useRouter();
    const [students, setStudents] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const data = await findAllClassroomNames();
                setClassrooms(data);
                ///
                findAllExams().then(setExams).finally(() => console.log(exams));
                fetchStudents(currentValue.student.classroom.id);

            } catch (error) {
                console.error("Erreur lors de la récupération des classes : ", error);
            }
        };
        fetchClassrooms();
    }, []);

    const fetchStudents = (id) => {
        try {
            findByClassroomId(id).then(setStudents);
            console.log(students);
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
                console.log("===>: ", values);

                const updated = await updateGradeById(currentValue.id, values);

                router.push("/grades/" + updated.id);

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
                                <MenuItem key={student.id} value={student.id}> {student.registrationNumber+" --- "+student.firstName+" "+student.lastName}</MenuItem>
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
                                <MenuItem key={exam.id} value={exam.id}> {exam.examDate+" --- "+exam.subject+" --- "+exam.teacherName}</MenuItem>
                            ))}
                        </Select>

                        <TextField
                            fullWidth
                            label="Note"
                            {...formik.getFieldProps("value")}
                            error={!!formik.errors["value"]}
                            helperText={formik.errors["value"]}
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

