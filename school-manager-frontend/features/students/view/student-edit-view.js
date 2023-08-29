"use client";

import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import {useFindStudentById} from "@/features/students/student-services";
import StudentNewEditForm from "@/features/students/components/student-new-edit-form";



export default function StudentEditView({id}) {

    const {data: currentValue, isLoading, refetch} = useFindStudentById(id);

    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Modifier les informations d'un élève"}
                </Typography>

                {currentValue && <StudentNewEditForm currentValue={currentValue} isEdit />}

            </Stack>
        </Box>
    );
}

