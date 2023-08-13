"use client";

import React, {useEffect, useState} from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import SchoolYearDetails from "../components/school-year-details";
import {findSchoolYearById, useFindSchoolYearById, useSearchSchoolYears} from "../school-year-services";

export default function SchoolYearDetailsView({id}) {

    const [query, setQuery] = useState(id);
    const {data: currentValue, isLoading, isError, error, refetch} = useFindSchoolYearById({query});

    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Details année scolaire"}
                </Typography>

                {isLoading && <LinearProgress/>}

                {currentValue && <SchoolYearDetails currentValue={currentValue}/>}
            </Stack>
        </Box>
    );
}

