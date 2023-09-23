"use client";

import {useRouter} from "next/navigation";

import {authConfig} from "@/features/authentication/auth-config";
import {Box, Button, Card, Stack, Typography} from "@mui/material";
import * as Yup from "yup";
import {signUp} from "@/features/authentication/auth-service";
import FormikTextField from "@/shared/forms/formik-text-field";
import {Form, FormikProvider, useFormik} from "formik";
import {useState} from "react";
import MuiAlert from "@/shared/components/mui-alert";


export default function SignUpForm() {

  const router = useRouter();
  const [alert, setAlert] = useState(null);

  const initialValues = {
    username: "",
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Le nom est obligatoire"),
    email: Yup.string().required("L'email est obligatoire"),
    password: Yup.string().required("Le mot de passe est obligatoire"),
  });



  const formik = useFormik({
    initialValues, validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {

        const response = await signUp(values);

        if (response.status === 200) {
          setAlert("Utilisateur enregistré avec succès");
          await router.push(authConfig.path.signin);
        }

      } catch (error) {
        console.error(error);
        setAlert("Utilisateur enregistré avec succès");
      }
    }
  });

  return (

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>

          <Card>
            <Stack spacing={3} p={3} alignItems={"center"} minWidth={400}>
              <Typography variant={"h6"}>Sign Up</Typography>
              <FormikTextField name={"username"} label={"Nom d'utilisateur"}/>
              <FormikTextField name={"email"} label={"Email"}/>
              <FormikTextField name={"password"} label={"Mot de passe"} type={"password"}/>

              <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                <Button type="reset" sx={{ color: "text.secondary" }}>
                  {"Annuler"}
                </Button>
                <Button type={"submit"} variant={"outlined"}>
                  {"Valider"}
                </Button>
              </Stack>

            </Stack>

          </Card>
          {
              alert && ( <MuiAlert message={alert} open={true} severity={"succes"} setAlert={setAlert}/>)
          }
        </Form>
      </FormikProvider>
  )
}