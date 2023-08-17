"use client";

import {Box, Button, Stack, Typography} from "@mui/material";
import SchoolYearTable from "../components/school-year-table";
import SchoolYearList from "@/features/school-years/components/school-year-list";
import {useState} from "react";

export default function SchoolYearListView() {

    const [current, setCurrent] = useState('table');

    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Liste des années scolaires"}
                </Typography>

            </Stack>

            <Box>
                <Stack direction={"row"} justifyContent={"normal"} alignItems={"center"}>
                    <Button
                        onClick={() => setCurrent('liste')}
                    >
                        LISTE
                    </Button>

                    <Button
                        onClick={() => setCurrent('table')}
                    >
                        TABLE
                    </Button>
                </Stack>



                {current === 'liste' && <SchoolYearList />}

                {current === 'table' && <SchoolYearTable />}

            </Box>

        </Box>
    );
}

