import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import {updateStudentById} from "@/features/students/student-services";
import {findAllClassroomNames} from "@/features/classrooms/classroom-services";

export default function StudentEditForm({currentValue}) {

    const router = useRouter();
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const data = await findAllClassroomNames();
                setClassrooms(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des classes : ", error);
            }
        };
        fetchClassrooms();
    }, []);

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
                console.log("===>: ", values);

                const updated = await updateStudentById(currentValue.id, values);
                console.log("=======> updateStudentById");
                router.push("/students/" + updated.id);

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
                            label="Matricule"
                            variant={"outlined"}
                            {...formik.getFieldProps("registrationNumber")}
                            error={!!formik.errors["registrationNumber"]}
                            helperText={formik.errors["registrationNumber"]}
                        />

                        <TextField fullWidth
                                   label="Nom"
                                   {...formik.getFieldProps("firstName")}
                                   error={!!formik.errors["firstName"]}
                                   helperText={formik.errors["firstName"]}/>

                        <TextField fullWidth
                                   label="Prénom"
                                   {...formik.getFieldProps("lastName")}
                                   error={!!formik.errors["lastName"]}
                                   helperText={formik.errors["lastName"]}/>


                        <TextField type="date" label="Date de naissance" variant={"outlined"}
                                   {...formik.getFieldProps("dateOfBirth")}
                                   error={!!formik.errors["dateOfBirth"]}
                                   helperText={formik.errors["dateOfBirth"]} />

                        <TextField label="Prénom du père"
                                   {...formik.getFieldProps("fatherName")}
                                   error={!!formik.errors["fatherName"]}
                                   helperText={formik.errors["fatherName"]} />

                        <TextField label="Nom de la mère" {...formik.getFieldProps("motherName")}
                                   error={!!formik.errors["motherName"]}
                                   helperText={formik.errors["motherName"]}/>

                        <TextField label="Contact" {...formik.getFieldProps("contact")}
                                   error={!!formik.errors["contact"]}
                                   helperText={formik.errors["contact"]}/>

                        <TextField label="Adresse" {...formik.getFieldProps("address")}
                                   error={!!formik.errors["address"]}
                                   helperText={formik.errors["address"]}/>

                        <TextField type="date" label="Date d'inscription"
                                   {...formik.getFieldProps("enrollmentDate")}
                                   error={!!formik.errors["enrollmentDate"]}
                                   helperText={formik.errors["enrollmentDate"]} />

                        <InputLabel id="select-filled-label">Classe</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-filled-label"
                            {...formik.getFieldProps("classroom.id")}
                            error={!!formik.errors["classroom.id"]}
                            helperText={formik.errors["classroom.id"]}
                        >
                            {classrooms.map((classroom) => (
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

