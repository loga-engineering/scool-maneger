"use client";

import {useRouter} from "next/navigation";

import {authConfig} from "@/features/authentication/auth-config";
import {Box, Button, Card, Stack, Typography} from "@mui/material";
import * as Yup from "yup";
import {signUp} from "@/features/authentication/auth-service";
import FormikTextField from "@/shared/forms/formik-text-field";
import {Form, FormikProvider, useFormik} from "formik";


export default function SignUpForm() {

  const router = useRouter();

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
        console.log("===>: ", values);

        const response = await signUp(values);

        if (response.status === 200) {
          alert('User registered success');
          await router.push(authConfig.path.signin);
        }

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
              <Typography variant={"body1"}>Sign Up</Typography>
              <FormikTextField name={"username"} label={"Nom d'utilisateur"}/>
              <FormikTextField name={"email"} label={"Email"}/>
              <FormikTextField name={"password"} label={"Mot de passe"}/>

              <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                <Button type="reset">
                  {"Annuler"}
                </Button>
                <Button type={"submit"} variant={"outlined"}>
                  {"Valider"}
                </Button>
              </Stack>

            </Stack>

          </Card>
        </Form>
      </FormikProvider>
  )
}