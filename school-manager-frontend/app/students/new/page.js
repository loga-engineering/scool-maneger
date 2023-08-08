"use client"
import React, {useState} from 'react';
import {Form, FormikProvider, useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Card, CardContent, CardHeader, Stack, TextField} from '@mui/material';
import {createStudent} from "../../../features/students/student-services";

export default function NewStudentPage() {

    const SCHOOL_MANAGER_API_BASE_URL = 'http://localhost:8080/school-management/eleves';

    const [successMessage, setSuccessMessage] = useState('');

    const initialValues = {
        matricule: '',
        nom: '',
        prenom: '',
        prenomPere: '',
        nomMere: '',
        contact: '',
        adresse: '',
        dateNaissance: '',
        dateInscription: '',
        classeId: '',
    };

    const validationSchema = Yup.object().shape({
        matricule: Yup.string().required('Le matricule est requis'),
        nom: Yup.string().required('Le nom est requis'),
        prenom: Yup.string().required('Le prénom est requis'),
        prenomPere: Yup.string().required('Le prénom du père est requis'),
        nomMere: Yup.string().required('Le nom de la mère est requis'),
        contact: Yup.string(),
        adresse: Yup.string().required('L\'adresse est requise'),
        dateNaissance: Yup.string().required('La date de naissance est requise'),
        dateInscription: Yup.string().required('La date d\'inscription est requise'),
        classeId: Yup.string().required('L\'ID de la classe est requis'),
    });

    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                const createdEleve = await createStudent(values);

                // setResponseEleve(createdEleve);

                resetForm();
                setSuccessMessage('L\'élève a été enregistré avec succès!');
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <Card>
                    <CardHeader title={"Inscrire un nouvel élève"}/>

                    <CardContent>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Matricule"
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


                            <TextField type="date" label="Date de naissance"
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

                            {/*<TextField name="classeId" label="ID de la classe" variant="outlined"/>*/}

                            <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                                <Button type="reset" color="secondary">
                                    {"Annuler"}
                                </Button>
                                <Button type="submit" variant={"contained"} color="primary">
                                    {"Enregistrer"}
                                </Button>
                            </Stack>

                        </Stack>
                    </CardContent>
                </Card>
            </Form>
        </FormikProvider>
    );
};
