"use client";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useState} from "react";

import {FormikSelect} from "@/shared/forms/formik-select";
import {generateValues} from "@/shared/forms/formik-hooks";
import {formikSubmit} from "@/shared/forms/formik-submit";
import {gradeConfig} from "@/features/grades/grade-config";
import {useFindAllExams} from "@/features/exams/exam-services";
import FormikTextField from "../../../shared/forms/formik-text-field";
import {findByClassroomId} from "@/features/students/student-services";
import {SimpleCardFormikForm} from "@/shared/forms/formik-form-provider";
import {useFindAllClassrooms} from "@/features/classrooms/classroom-services";
import {createGrade, updateGradeById} from "@/features/grades/grade-services";


const useValidationSchema = ({currentValue}) => useMemo(() => {
    const validationSchema = Yup.object({
        value: Yup.string().required("La note est obligatoire").default(""),
        student: Yup.object().shape({
            id: Yup.string().required("L'ID de l'étudiant est obligatoire").default(""),
        }),
        exam: Yup.object().shape({
            id: Yup.string().required("L'ID de l'examen est obligatoire").default(""),
        }),
    });


    return generateValues({currentValue, validationSchema});
}, [currentValue]);


export default function GradeNewEditForm({currentValue, isEdit}) {

    const router = useRouter();
    const {initialValues, validationSchema} = useValidationSchema({currentValue});

    const {data: exams, isLoading : examLoading} = useFindAllExams();
    const {data: classrooms, isLoading : classroomLoading} = useFindAllClassrooms();

    const [students, setStudents] = useState([]);

    useEffect(() => {
        currentValue && setStudents([currentValue.student]);
    }, []);
    const fetchStudents = (id) => {
        try {
            findByClassroomId(id).then(setStudents);

        } catch (error) {
            console.error("Erreur lors de la récupération des élèves : ", error);
        }
    };

    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            await formikSubmit(values, isEdit, createGrade, updateGradeById, router, gradeConfig);
        }
    });

    const onCancel = useCallback(() => {
        const href = isEdit ? gradeConfig.path.details(currentValue.id) : gradeConfig.path.root;

        router.push(href);
    }, []);


    return (
        <SimpleCardFormikForm formik={formik} isEdit={isEdit} onCancel={onCancel}>

            <FormikSelect name={"exam.id"} label={"Examen"}>
                {exams?.map((exam) => (
                    <MenuItem key={exam.id} value={exam.id}> {exam.examDate+" / "+exam.subject+" / "+exam.teacherName}</MenuItem>
                ))}
            </FormikSelect>

            <Box display="flex" gap="16px">
                <Box flex={1}>

                    <FormControl fullWidth>
                        <InputLabel id="select-filled-label1">{"Classe"}</InputLabel>
                        <Select
                            labelId="select-filled-label1"
                            placeholder={"Classe"}
                            defaultValue={ isEdit ? formik.values.student.classroom.id : ""}
                            onChange={(event) => fetchStudents(event.target.value)}
                        >
                            <MenuItem key={""} value={""}>No Selected // Or Empty</MenuItem>
                            {classrooms?.map((classroom) => (
                                <MenuItem key={classroom.id} value={classroom.id} > {classroom.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box flex={1}>

                    <FormikSelect name={"student.id"} label={"Eleve"}>
                        {students?.map((student) => (
                            <MenuItem key={student.id} value={student.id}> {student.registrationNumber+" / "+student.firstName+" "+student.lastName}</MenuItem>
                        ))}
                    </FormikSelect>

                </Box>
            </Box>

            <FormikTextField name={"value"} label={"Note"}/>

        </SimpleCardFormikForm>

    );
}

