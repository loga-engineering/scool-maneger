"use client";

import React, {useEffect, useState} from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import ClassroomDetails from "../components/classroom-details";
import {findClassroomById} from "../classroom-services";

export default function ClassroomDetailsView({id}) {

    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();

    useEffect(() => {
        setIsLoading(true);
        findClassroomById(id).then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);


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

