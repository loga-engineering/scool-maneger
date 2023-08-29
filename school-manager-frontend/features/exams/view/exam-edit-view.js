"use client";

import {Box, Stack, Typography} from "@mui/material";
import {useFindExamById} from "@/features/exams/exam-services";
import ExamNewEditForm from "@/features/exams/components/exam-new-edit-form";



export default function ExamEditView({id}) {

    const {data: currentValue, isLoading} = useFindExamById(id);

    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Modifier un examen"}
                </Typography>

                {currentValue && <ExamNewEditForm currentValue={currentValue} isEdit />}

            </Stack>
        </Box>
    );
}

