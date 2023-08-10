"use client";

import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import ExamNewForm from "@/features/exams/components/exam-new-form";

export default function ExamNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Ajouter un examen"}
                </Typography>

                <ExamNewForm/>
            </Stack>
        </Box>
    );
}

