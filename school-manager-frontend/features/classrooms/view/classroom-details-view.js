"use client";

import React, {useEffect, useState} from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import ClassroomDetails from "../components/classroom-details";
import {useFindClassroomById} from "@/features/classrooms/classroom-services";

export default function ClassroomDetailsView({id}) {

    const [query, setQuery] = useState(id);
    const {data: currentValue, isLoading, isError, error, refetch} = useFindClassroomById({query});


    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Détails salle de classe"}
                </Typography>

                {isLoading && <LinearProgress/>}

                {currentValue && <ClassroomDetails currentValue={currentValue}/>}
            </Stack>
        </Box>
    );
}

