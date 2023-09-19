"use client";

import React from "react";
import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import PredictNewForm from "@/features/reporting/components/predict-new-form";

export default function PredictNewView({id}) {


    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Prédiction de moyenne"}
                </Typography>

                <PredictNewForm id={id} />

            </Stack>
        </Box>
    );
}

