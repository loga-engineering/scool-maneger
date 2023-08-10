"use client";

import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import StudentNewForm from "@/features/students/components/student-new-form";

export default function StudentNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Inscrire un nouvel élève"}
                </Typography>

                <StudentNewForm/>
            </Stack>
        </Box>
    );
}

