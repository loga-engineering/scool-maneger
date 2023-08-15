"use client";

import {Box, Stack, Typography} from "@mui/material";
import SchoolYearNewEditForm from "../components/school-year-new-edit-form";


export default function SchoolYearNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Ajouter année scolaire"}
                </Typography>

                <SchoolYearNewEditForm/>
            </Stack>
        </Box>
    );
}

