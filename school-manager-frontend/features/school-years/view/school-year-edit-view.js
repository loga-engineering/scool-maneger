"use client";

import {Box, LinearProgress, Stack, Typography} from "@mui/material";

import {useFindSchoolYearById} from "../school-year-services";
import SchoolYearNewEditForm from "../components/school-year-new-edit-form";


export default function SchoolYearEditView({id}) {

    const {data: currentValue, isLoading, isError, error} = useFindSchoolYearById(id);


    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Modifier une année scolaire"}
                </Typography>

                {isLoading && <LinearProgress/>}

                {currentValue && <SchoolYearNewEditForm currentValue={currentValue} isEdit/>}

            </Stack>
        </Box>
    );
}

