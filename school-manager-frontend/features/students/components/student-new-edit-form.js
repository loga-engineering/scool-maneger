import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import React, {useCallback, useMemo, useState} from "react";

import {generateValues} from "@/shared/forms/formik-hooks";
import FormikTextField from "../../../shared/forms/formik-text-field";
import {createStudent, updateStudentById} from "../student-services";
import {SimpleCardFormikForm} from "@/shared/forms/formik-form-provider";
import {formikSubmit} from "@/shared/forms/formik-submit";
import {studentConfig} from "@/features/students/student-config";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {useFindAllClassrooms} from "@/features/classrooms/classroom-services";


const useValidationSchema = ({currentValue}) => useMemo(() => {
    const validationSchema = Yup.object({
        registrationNumber: Yup.string().default("").required('Le matricule est requis'),
        lastName: Yup.string().default("").required('Le nom est requis'),
        firstName: Yup.string().default("").required('Le prénom est requis'),
        fatherName: Yup.string().default("").required('Le prénom du père est requis'),
        motherName: Yup.string().default("").required('Le nom de la mère est requis'),
        contact: Yup.string().default(""),
        address: Yup.string().default("").required('L\'adresse est requise'),
        dateOfBirth: Yup.date().required('La date de naissance est requise'),
        enrollmentDate: Yup.date().required('La date d\'inscription est requise'),
        classroom: Yup.object().shape({
            id: Yup.number().required("Ce champ est obligatoire"),
        }),
    });

    return generateValues({currentValue, validationSchema});
}, [currentValue]);


export default function StudentNewEditForm({currentValue, isEdit}) {

    const router = useRouter();
    const {data: classrooms, isLoading, isError, error, refetch} = useFindAllClassrooms();
    console.log("===>",classrooms);
    const {initialValues, validationSchema} = useValidationSchema({currentValue});


    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            await formikSubmit(values, isEdit, createStudent, updateStudentById, router, studentConfig);
        }
    });

    const onCancel = useCallback(() => {
        const href = isEdit ? studentConfig.path.details(currentValue.id) : studentConfig.path.root;

        router.push(href);
    }, []);

    return (
        <SimpleCardFormikForm formik={formik} isEdit={isEdit} onCancel={onCancel}>
            <FormikTextField name={"registrationNumber"} label={"Matricule"}/>

            <FormikTextField name={"lastName"} label={"Nom"}/>

            <FormikTextField name={"firstName"} label={"Prénom"}/>

            <FormikTextField name={"dateOfBirth"} label={"Date de naissance"} type={"date"} />

            <FormikTextField name={"fatherName"} label={"Prénom du père"} />

            <FormikTextField name={"motherName"} label={"Nom de la mère"} />

            <FormikTextField name={"contact"} label={"Contact"} />

            <FormikTextField name={"address"} label={"Adresse"} />

            <FormikTextField name={"enrollmentDate"} label={"Date d'inscription"} type={"date"}/>

            <InputLabel id="select-filled-label">Classe</InputLabel>
            <Select
                fullWidth
                labelId="select-filled-label"
                {...formik.getFieldProps("classroom.id")}
                error={!!formik.errors["classroom.id"]}
                helperText={formik.errors["classroom.id"]}
            >
                {classrooms?.map((classroom) => (
                    <MenuItem key={classroom.id} value={classroom.id}> {classroom.name}</MenuItem>
                ))}
            </Select>
        </SimpleCardFormikForm>
    );
}

