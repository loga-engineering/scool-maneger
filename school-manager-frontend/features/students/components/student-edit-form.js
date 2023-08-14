import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import {useEditStudent} from "@/features/students/student-services";
import FormikTextField from "@/shared/forms/formik-text-field";
import {useSearchClassrooms} from "@/features/classrooms/classroom-services";

export default function StudentEditForm({currentValue}) {

    const router = useRouter();
    const [query, setQuery] = useState();
    const {data: classrooms, isLoading, isError, error, refetch} = useSearchClassrooms({query});

    const [id, setId] = useState();
    const [student, setStudent] = useState();
    const editStudent = useEditStudent(id, student);

    const initialValues = {
        registrationNumber: currentValue.registrationNumber,
        lastName: currentValue.lastName,
        firstName: currentValue.firstName,
        fatherName: currentValue.fatherName,
        motherName: currentValue.motherName,
        contact: currentValue.contact,
        address: currentValue.address,
        dateOfBirth: currentValue.dateOfBirth,
        enrollmentDate: currentValue.enrollmentDate,
        classroom : {
            id: currentValue.classroom.id
        }
    };

    const validationSchema = Yup.object().shape({
        registrationNumber: Yup.string().required('Le matricule est requis'),
        lastName: Yup.string().required('Le nom est requis'),
        firstName: Yup.string().required('Le prénom est requis'),
        fatherName: Yup.string().required('Le prénom du père est requis'),
        motherName: Yup.string().required('Le nom de la mère est requis'),
        contact: Yup.string(),
        address: Yup.string().required('L\'adresse est requise'),
        dateOfBirth: Yup.string().required('La date de naissance est requise'),
        enrollmentDate: Yup.string().required('La date d\'inscription est requise'),

    });

    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                setStudent(values);
                setId(currentValue.id);
                editStudent.mutate();

                router.push("/students/" + currentValue.id);

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

