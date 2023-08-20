"use client";

import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import ClassroomNewEditForm from "@/features/classrooms/components/classroom-new-edit-form";

export default function ClassroomNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Ajouter une classe"}
                </Typography>

                <ClassroomNewEditForm isEdit={false} />

            </Stack>
        </Box>
    );
}

