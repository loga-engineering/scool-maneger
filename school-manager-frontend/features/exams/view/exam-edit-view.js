"use client";

import React, {useEffect, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {findExamById} from "@/features/exams/exam-services";
import ExamEditForm from "@/features/exams/components/exam-edit-form";



export default function ExamEditView({id}) {

    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();

    useEffect(() => {
        setIsLoading(true);
        findExamById(id).then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);

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

