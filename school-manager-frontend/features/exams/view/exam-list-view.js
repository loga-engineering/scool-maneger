"use client";

import React, {useState} from "react";
import {Box, Stack, Tab, Tabs, Typography} from "@mui/material";

import ExamList from "@/features/exams/components/exam-list";
import ExamTable from "@/features/exams/components/exam-table";

export default function ExamListView() {

    const [current, setCurrent] = useState(0);

    const handleChange = (event, newValue) => {
        setCurrent(newValue);
    };

    return (
        <Box p={2}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Liste des examens"}
                </Typography>
            </Stack>

            <Box>
                <Stack direction={"row"} justifyContent={"normal"} pl={3}>
                    <Tabs value={current} onChange={handleChange}>
                        <Tab label="TABLE" />
                        <Tab label="LISTE" />
                    </Tabs>
                </Stack>

                {current === 0 && <ExamTable />}
                {current === 1 && <ExamList />}

            </Box>

        </Box>
    );
}

