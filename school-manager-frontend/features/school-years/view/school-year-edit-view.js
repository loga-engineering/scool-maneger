"use client";

import React, {useEffect, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import SchoolYearEditForm from "@/features/school-years/components/school-year-edit-form";
import {
    findSchoolYearById,
    useEditSchoolYear,
    useFindSchoolYearById
} from "@/features/school-years/school-year-services";


export default function SchoolYearEditView({id}) {

    const [query, setQuery] = useState(id);
    const {data: currentValue, isLoading, isError, error, refetch} = useFindSchoolYearById({query});


    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Modifier une année scolaire"}
                </Typography>

                {currentValue && <SchoolYearEditForm currentValue={currentValue}/>}

            </Stack>
        </Box>
    );
}

