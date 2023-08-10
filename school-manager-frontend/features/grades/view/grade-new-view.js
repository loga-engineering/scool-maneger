"use client";

import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import GradeNewForm from "../components/grade-new-form";

export default function GradeNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Donner une note"}
                </Typography>

                <GradeNewForm/>
            </Stack>
        </Box>
    );
}

