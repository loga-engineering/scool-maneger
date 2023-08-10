"use client";

import React, {useEffect, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {findStudentById} from "@/features/students/student-services";
import StudentEditForm from "@/features/students/components/student-edit-form";



export default function StudentEditView({id}) {

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
                    {"Modifier les informations d'un élève"}
                </Typography>

                {currentValue && <StudentEditForm currentValue={currentValue}/>}

            </Stack>
        </Box>
    );
}

