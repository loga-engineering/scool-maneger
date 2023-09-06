"use client";

import Layout from "../components/layout"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Box, Button, Typography} from "@mui/material";
import SignUpForm from "@/features/authentication/components/sign-up-form";

const urlBase = process.env.BACKEND_URL;



export default function SignUpView() {

  return (
    <Layout>
      <Box>

          <SignUpForm />

      </Box>
    </Layout>
  )
}