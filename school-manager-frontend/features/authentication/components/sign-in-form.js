"use client";

import {useRouter} from "next/navigation";

import {Box, Button, Card, Stack, Typography,} from "@mui/material";
import * as Yup from "yup";
import {isAuthenticated, signIn} from "@/features/authentication/auth-service";
import FormikTextField from "@/shared/forms/formik-text-field";
import {Form, FormikProvider, useFormik} from "formik";
import {useRecoilState} from "recoil";
import {authConfig} from "@/features/authentication/auth-config";


export default function SignInForm() {

  const router = useRouter();
  const [authenticated, setAuthenticated] = useRecoilState(isAuthenticated);


  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Le nom est obligatoire"),
    password: Yup.string().required("Le mot de passe est obligatoire"),
  });



  const formik = useFormik({
    initialValues, validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        console.log("===>: ", values);

        const response = await signIn(values);

        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem('token', token);
          setAuthenticated(true);
          router.push('/');
        } else {
          alert('Bad credentials');
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
            <Stack spacing={3} p={3} alignItems={"center"}>
              <Typography variant={"body1"}>Sign In</Typography>
              <FormikTextField name={"username"} label={"Nom d'utilisateur"}/>
              <FormikTextField name={"password"} label={"Mot de passe"}/>

              <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                <Button type="reset" sx={{ color: "text.secondary" }}>
                  {"Annuler"}
                </Button>
                <Button onClick={() => router.push(authConfig.path.signup) } variant={"contained"}>
                  {"Sign Up"}
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