"use client";

import React from "react";
import {
    Box,
    Stack,
    Typography,

} from "@mui/material";
import ExamList from "@/features/exams/components/exam-list";

export default function ExamListView() {

    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Liste des examens"}
                </Typography>

            </Stack>
            <ExamList/>

        </Box>
    );
}

