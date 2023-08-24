
import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import ExamNewEditForm from "@/features/exams/components/exam-new-edit-form";

export default function ExamNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Ajouter un examen"}
                </Typography>

                <ExamNewEditForm isEdit={false}/>
            </Stack>
        </Box>
    );
}

