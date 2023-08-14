"use client";

import React, {useEffect, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import ExamEditForm from "@/features/exams/components/exam-edit-form";
import {useFindExamById} from "@/features/exams/exam-services";



export default function ExamEditView({id}) {

    const [query, setQuery] = useState(id);
    const {data: currentValue, isLoading, isError, error} = useFindExamById({query});

    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Modifier un examen"}
                </Typography>

                {currentValue && <ExamEditForm currentValue={currentValue}/>}

            </Stack>
        </Box>
    );
}

