"use client";

import React from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import PredictResult from "@/features/reporting/components/predict-result";
import {useFindStudentById} from "@/features/students/student-services";

export default function PredictResultView({id}) {

    const {data: currentValue, isLoading, isError, error, refetch} = useFindStudentById(id);

    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Prédiction de moyenne"}
                </Typography>

                {isLoading && <LinearProgress/>}

                {currentValue && <PredictResult currentValue={currentValue}/>}

            </Stack>
        </Box>
    );
}

