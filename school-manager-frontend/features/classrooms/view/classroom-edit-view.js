"use client";

import {useEffect, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {findClassroomById} from "../classroom-services";
import ClassroomEditForm from "../components/classroom-edit-form";




export default function ClassroomEditView({id}) {

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
                    {"Modifier les informations d'une classe"}
                </Typography>

                {currentValue && <ClassroomEditForm currentValue={currentValue}/>}

            </Stack>
        </Box>
    );
}

