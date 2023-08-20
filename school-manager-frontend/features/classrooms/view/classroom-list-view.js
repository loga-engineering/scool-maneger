"use client";
import { useState} from "react";
import {Box, Stack, Tab, Tabs, Typography} from "@mui/material";
import ClassroomList from "@/features/classrooms/components/classroom-list";
import ClassroomTable from "@/features/classrooms/components/classroom-table";

export default function ClassroomListView() {

    const [current, setCurrent] = useState(0);

    const handleChange = (event, newValue) => {
        setCurrent(newValue);
    };

    return (
        <Box>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>

                <Typography variant="h3" p={3}>
                    {"Liste des salles de classe"}
                </Typography>

            </Stack>

            <Box>
                <Stack direction={"row"} justifyContent={"normal"} pl={3}>
                    <Tabs value={current} onChange={handleChange}>
                        <Tab label="LISTE" />
                        <Tab label="TABLE" />
                    </Tabs>
                </Stack>

                {current === 0 && <ClassroomList />}
                {current === 1 && <ClassroomTable />}

            </Box>

        </Box>
    );
}

