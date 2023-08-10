"use client";

import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import SchoolYearNewForm from "../compoents/school-year-new-form";

export default function SchoolYearNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Création année scolaire"}
                </Typography>

                <SchoolYearNewForm/>
            </Stack>
        </Box>
    );
}
