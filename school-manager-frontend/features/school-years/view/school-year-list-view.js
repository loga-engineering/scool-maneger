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
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Liste des années scolaires"}
                </Typography>

            </Stack>

            <Box>
                <Stack direction={"row"} justifyContent={"normal"} pl={3}>
                    <Tabs value={current} onChange={handleChange}>
                        <Tab label="LISTE" />
                        <Tab label="TABLE" />
                    </Tabs>
                </Stack>

                {current === 0 && <SchoolYearList />}
                {current === 1 && <SchoolYearTable />}
            </Box>

        </Box>
    );
}

