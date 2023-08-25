"use client";

import React from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import { useFindStudentById} from "@/features/students/student-services";
import StudentDetails from "@/features/students/components/student-details";

export default function StudentDetailsView({id}) {

    const {data: currentValue, isLoading, isError, error, refetch} = useFindStudentById(id);

    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Details élève"}
                </Typography>

                {isLoading && <LinearProgress/>}

                {currentValue && <StudentDetails currentValue={currentValue}/>}
            </Stack>
        </Box>
    );
}

