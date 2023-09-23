"use client";

import Layout from "../components/layout"
import {Box, Button, Typography} from "@mui/material";
import SignInForm from "@/features/authentication/components/sign-in-form";


export default function SignInView() {



  return (
    <Layout>
      <Box alignItems={"center"}>

        <Box>
          <SignInForm/>
        </Box>
      </Box>
    </Layout>
  )
}