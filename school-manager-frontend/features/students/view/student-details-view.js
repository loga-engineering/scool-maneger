"use client";

import React, {useEffect, useState} from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import {findStudentById} from "@/features/students/student-services";
import StudentDetails from "@/features/students/components/student-details";

export default function StudentDetailsView({id}) {

    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();

    useEffect(() => {
        setIsLoading(true);
        findStudentById(id).then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);


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

