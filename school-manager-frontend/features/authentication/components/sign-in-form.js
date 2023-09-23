"use client";

import {useRouter} from "next/navigation";

import {Button, Card, Stack, Typography,} from "@mui/material";
import * as Yup from "yup";
import {signIn} from "@/features/authentication/auth-service";
import FormikTextField from "@/shared/forms/formik-text-field";
import {Form, FormikProvider, useFormik} from "formik";
import {authConfig} from "@/features/authentication/auth-config";
import {useState} from "react";
import MuiAlert from "@/shared/components/mui-alert";


export default function SignInForm() {

  const router = useRouter();
  const [alert, setAlert] = useState(null);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Le nom d'utilisateur est obligatoire"),
    password: Yup.string().required("Le mot de passe est obligatoire"),
  });



  const formik = useFormik({
    initialValues, validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {

        const response = await signIn(values);

        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem('token', token);
          router.push('/');
        } else {
          setAlert("Nom d'utilisateur ou mot de passe incorrecte !");
        }

      } catch (error) {
        console.error(error);
        setAlert("Nom d'utilisateur ou mot de passe incorrecte !");
      }
    }
  });

  return (

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>

          <Card>
            <Stack spacing={3} p={3} alignItems={"center"} minWidth={400}>
              <Typography variant={"h6"}>Sign In</Typography>
              <FormikTextField name={"username"} label={"Nom d'utilisateur"} />
              <FormikTextField name={"password"} label={"Mot de passe"} type={"password"} autoComplete="off" />

              <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                <Button onClick={() => router.push(authConfig.path.signup) } variant={"text"}>
                  {"Sign Up"}
                </Button>
                <Button type={"submit"} variant={"outlined"}>
                  {"Valider"}
                </Button>
              </Stack>

            </Stack>
          </Card>

          {
            alert && ( <MuiAlert message={alert} open={true} severity={"error"} setAlert={setAlert}/>)
          }
        </Form>
      </FormikProvider>
  )
}