"use client";

import React, {useEffect, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {findGradeById} from "@/features/grades/grade-services";
import GradeEditForm from "@/features/grades/components/grade-edit-form";


export default function GradeEditView({id}) {

    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();

    useEffect(() => {
        setIsLoading(true);
        findGradeById(id).then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);

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

