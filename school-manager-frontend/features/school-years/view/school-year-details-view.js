"use client";

import {Box, LinearProgress, Stack, Typography} from "@mui/material";

import {useFindSchoolYearById} from "../school-year-services";
import SchoolYearDetails from "../components/school-year-details";

export default function SchoolYearDetailsView({id}) {

    const {data: currentValue, isLoading, isError, error, refetch} = useFindSchoolYearById(id);

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

