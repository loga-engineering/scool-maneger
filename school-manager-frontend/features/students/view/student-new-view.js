"use client";

import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import StudentNewEditForm from "@/features/students/components/student-new-edit-form";

export default function StudentNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Inscrire un nouvel élève"}
                </Typography>

                <StudentNewEditForm isEdit={false}/>
            </Stack>
        </Box>
    );
}

