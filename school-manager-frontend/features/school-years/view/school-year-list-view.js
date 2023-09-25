"use client";
import {useState} from "react";
import {Box, Stack, Tab, Tabs, Typography} from "@mui/material";
import SchoolYearTable from "../components/school-year-table";
import SchoolYearList from "@/features/school-years/components/school-year-list";

export default function SchoolYearListView() {

    const [current, setCurrent] = useState(0);

    const handleChange = (event, newValue) => {
        setCurrent(newValue);
    };

    return (
        <Box p={2}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Liste des années scolaires"}
                </Typography>
            </Stack>

            <Box>
                <Stack direction={"row"} justifyContent={"normal"} pl={3}>
                    <Tabs value={current} onChange={handleChange}>
                        <Tab label="TABLE" />
                        <Tab label="LISTE" />
                    </Tabs>
                </Stack>

                {current === 0 && <SchoolYearTable />}
                {current === 1 && <SchoolYearList />}

            </Box>

        </Box>
    );
}

