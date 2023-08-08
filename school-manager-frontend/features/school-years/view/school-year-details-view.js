"use client";

import React, {useEffect, useState} from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import SchoolYearDetails from "../compoents/school-year-details";
import {findSchoolYearById} from "../school-year-services";

export default function SchoolYearDetailsView({id}) {

    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();

    useEffect(() => {
        setIsLoading(true);
        findSchoolYearById(id).then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);


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

