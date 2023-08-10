"use client";

import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import ClassroomNewForm from "../components/classroom-new-form";

export default function ClassroomNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Ajouter une classe"}
                </Typography>

                <ClassroomNewForm/>
            </Stack>
        </Box>
    );
}

