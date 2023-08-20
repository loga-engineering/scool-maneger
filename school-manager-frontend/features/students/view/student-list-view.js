"use client";

import {useState} from "react";
import {Box, Stack, Tab, Tabs, Typography} from "@mui/material";

import StudentList from "@/features/students/components/student-list";
import StudentTable from "@/features/students/components/student-table";

export default function StudentListView() {

    const [current, setCurrent] = useState(0);
    const handleChange = (event, newValue) => {
        setCurrent(newValue);
    };

    return (
        <Box>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>

                <Typography variant={"h3"} p={3}>
                    {"Liste des élèves"}
                </Typography>

            </Stack>
            <Box>
                <Stack direction={"row"} justifyContent={"normal"} pl={3}>
                    <Tabs value={current} onChange={handleChange}>
                        <Tab label="LISTE" />
                        <Tab label="TABLE" />
                    </Tabs>
                </Stack>

                {current === 0 && <StudentList />}
                {current === 1 && <StudentTable />}
            </Box>

        </Box>
    );
}

