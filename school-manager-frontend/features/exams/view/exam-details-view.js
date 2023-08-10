"use client";

import React, {useEffect, useState} from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import ExamDetails from "../components/exam-details";
import {findExamById} from "../exam-services";

export default function ExamDetailsView({id}) {

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
                    {"Détails examen"}
                </Typography>

                {isLoading && <LinearProgress/>}

                {currentValue && <ExamDetails currentValue={currentValue}/>}
            </Stack>
        </Box>
    );
}

