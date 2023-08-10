"use client";

import React, {useEffect, useState} from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import GradeDetails from "../components/grade-details";
import { findGradeById} from "../grade-services";

export default function GradeDetailsView({id}) {

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
                    {"Détails des notes"}
                </Typography>

                {isLoading && <LinearProgress/>}

                {currentValue && <GradeDetails currentValue={currentValue}/>}
            </Stack>
        </Box>
    );
}

