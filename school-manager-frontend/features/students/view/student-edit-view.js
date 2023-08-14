"use client";

import React, {useEffect, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import StudentEditForm from "@/features/students/components/student-edit-form";
import {useFindStudentById} from "@/features/students/student-services";



export default function StudentEditView({id}) {

    const [query, setQuery] = useState(id);
    const {data: currentValue, isLoading, isError, error, refetch} = useFindStudentById({query});


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

