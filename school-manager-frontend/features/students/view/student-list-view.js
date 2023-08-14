"use client";
import {
    Box,
    Stack,
    Typography,
} from "@mui/material";
import * as React from "react";
import StudentList from "@/features/students/components/student-list";

export default function StudentListView() {


    return (
        <Box>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>

                <Typography variant={"h3"} p={3}>
                    {"Liste des élèves"}
                </Typography>

            </Stack>

            <StudentList />
        </Box>
    );
}

