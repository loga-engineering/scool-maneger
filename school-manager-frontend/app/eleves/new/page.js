"use client"
import React, {useState} from 'react';
import {Form, FormikProvider, useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Card, CardContent, CardHeader, Stack, TextField} from '@mui/material';
import {createEleve} from "../../../features/eleves/eleve-services";

export default function NewElevePage() {

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
                const createdEleve = await createEleve(values);

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
                    <CardHeader title={"Créer un nouvel élève"}/>

                    <CardContent>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Matricule"
                                {...formik.getFieldProps("matricule")}
                                error={!!formik.errors["matricule"]}
                                helperText={formik.errors["matricule"]}
                            />

                            <TextField name="nom" label="Nom" variant="outlined" fullWidth/>

                            <TextField name="prenom" label="Prénom" variant="outlined"/>


                            <TextField name="dateNaissance" type="date" label="Date de naissance" variant="outlined"/>

                            <TextField name="prenomPere" label="Prénom du père" variant="outlined"/>

                            <TextField name="nomMere" label="Nom de la mère" variant="outlined"/>

                            <TextField name="contact" label="Contact" variant="outlined"/>

                            <TextField name="adresse" label="Adresse" variant="outlined"/>

                            <TextField name="dateInscription" type="date" label="Date d'inscription"
                                       variant="outlined"/>

                            <TextField name="classeId" label="ID de la classe" variant="outlined"/>

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
