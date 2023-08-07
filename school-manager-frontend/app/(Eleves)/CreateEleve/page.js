"use client"
import React, {useState} from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Alert, AlertTitle, Stack, Box} from '@mui/material/';
import axios from 'axios';

const CreateEleve = ({ setResponseEleve }) => {
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
    contact: Yup.string().required('Le contact est requis'),
    adresse: Yup.string().required('L\'adresse est requise'),
    dateNaissance: Yup.string().required('La date de naissance est requise'),
    dateInscription: Yup.string().required('La date d\'inscription est requise'),
    classeId: Yup.string().required('L\'ID de la classe est requis'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(SCHOOL_MANAGER_API_BASE_URL, values);

      if (response.status !== 201) {
        throw new Error('Something went wrong');
      }

      const newEleve = response.data;
      setResponseEleve(newEleve);
      
      resetForm();
      setSuccessMessage('L\'élève a été enregistré avec succès!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Créer un nouvel élève</h2>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off">
     
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          
          {/*<Field as={TextField} name="matricule" label="Matricule" fullWidth />*/}
          <TextField id="outlined-basic" name="matricule" label="Matricule" variant="outlined" fullWidth />
          <ErrorMessage name="matricule" component="div" />

          <TextField name="nom" label="Nom" variant="outlined" fullWidth />
          <ErrorMessage name="nom" component="div" />

          <TextField name="prenom" label="Prénom" variant="outlined" />
          <ErrorMessage name="prenom" component="div" />
          

          <TextField name="dateNaissance" type="date" label="Date de naissance" variant="outlined" />
          <ErrorMessage name="dateNaissance" component="div" />

          <TextField name="prenomPere" label="Prénom du père" variant="outlined" />
          <ErrorMessage name="prenomPere" component="div" />

          <TextField name="nomMere" label="Nom de la mère" variant="outlined" />
          <ErrorMessage name="nomMere" component="div" />

          <TextField name="contact" label="Contact" variant="outlined" />
          <ErrorMessage name="contact" component="div" />

          <TextField name="adresse" label="Adresse" variant="outlined" />
          <ErrorMessage name="adresse" component="div" />

          <TextField name="dateInscription" type="date" label="Date d'inscription" variant="outlined" />
          <ErrorMessage name="dateInscription" component="div" />

          <TextField name="classeId" label="ID de la classe" variant="outlined" />
          <ErrorMessage name="classeId" component="div" />
          <div>
          <Stack direction="row" spacing={2}>
            <Button type="reset" variant="contained" color="secondary">Annuler</Button>
            <Button type="submit" variant="contained" color="primary">Enregistrer</Button>
          </Stack>
          </div>
        </Form>
      </Formik>
      {successMessage && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {successMessage}
          </Alert>
        )}
      </Box>
    </div>
  );
};

export default CreateEleve;