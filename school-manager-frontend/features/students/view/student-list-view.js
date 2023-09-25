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
        <Box p={2}>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>

                <Typography variant={"h3"} p={3}>
                    {"Liste des élèves"}
                </Typography>

            </Stack>
            <Box>
                <Stack direction={"row"} justifyContent={"normal"} pl={3}>
                    <Tabs value={current} onChange={handleChange}>
                        <Tab label="TABLE" />
                        <Tab label="LISTE" />
                    </Tabs>
                </Stack>
                {current === 0 && <StudentTable />}
                {current === 1 && <StudentList />}
            </Box>

        </Box>
    );
}

