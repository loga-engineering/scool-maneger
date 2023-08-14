"use client";

import React, { useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import GradeEditForm from "@/features/grades/components/grade-edit-form";
import {useFindGradeById} from "@/features/grades/grade-services";


export default function GradeEditView({id}) {

    const [query, setQuery] = useState(id);
    const {data: currentValue, isLoading, isError, error} = useFindGradeById({query});


    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Modifier la note"}
                </Typography>

                {currentValue && <GradeEditForm currentValue={currentValue}/>}

            </Stack>
        </Box>
    );
}

