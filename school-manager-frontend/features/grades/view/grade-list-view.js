"use client";

import {useState} from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";

import GradeList from "@/features/grades/components/grade-list";
import GradeTable from "@/features/grades/components/grade-table";

export default function GradeListView() {

    const [current, setCurrent] = useState(0);

    const handleChange = (event, newValue) => {
        setCurrent(newValue);
    };

    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Liste des notes des élèves"}
                </Typography>
            </Stack>

            <Box>
                <Stack direction={"row"} justifyContent={"normal"} pl={3}>
                    <Tabs value={current} onChange={handleChange}>
                        <Tab label="TABLE" />
                        <Tab label="LISTE" />
                    </Tabs>
                </Stack>

                {current === 0 && <GradeTable />}
                {current === 1 && <GradeList />}
            </Box>
        </Box>
    );
}


