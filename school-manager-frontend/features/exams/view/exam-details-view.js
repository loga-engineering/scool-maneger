"use client";

import {Box, LinearProgress, Stack, Typography} from "@mui/material";

import ExamDetails from "../components/exam-details";
import {useFindExamById} from "../exam-services";

export default function ExamDetailsView({id}) {


    const {data: currentValue, isLoading, isError, error, refetch} = useFindExamById(id);


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

