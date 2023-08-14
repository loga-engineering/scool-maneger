"use client";

import {Box, Stack, Typography} from "@mui/material";

import GradeList from "@/features/grades/components/grade-list";

export default function GradeListView() {


    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Liste des notes des élèves"}
                </Typography>

            </Stack>

            <GradeList />
        </Box>
    );
}

