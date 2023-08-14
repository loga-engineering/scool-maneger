"use client";

import React, {useState} from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import GradeDetails from "../components/grade-details";
import {useFindGradeById} from "@/features/grades/grade-services";

export default function GradeDetailsView({id}) {

    const [query, setQuery] = useState(id);
    const {data: currentValue, isLoading, isError, error, refetch} = useFindGradeById({query});



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

