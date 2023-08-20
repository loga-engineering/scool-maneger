"use client";

import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import {useFindGradeById} from "@/features/grades/grade-services";
import GradeNewEditForm from "@/features/grades/components/grades-new-edit-form";


export default function GradeEditView({id}) {

    const {data: currentValue, isLoading, isError, error} = useFindGradeById(id);


    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Modifier la note"}
                </Typography>

                {currentValue && <GradeNewEditForm currentValue={currentValue} isEdit />}

            </Stack>
        </Box>
    );
}

