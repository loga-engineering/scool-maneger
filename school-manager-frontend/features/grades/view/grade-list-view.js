"use client";

import {useState} from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";

import {useRecoilValue} from "recoil";
import GradeList from "@/features/grades/components/grade-list";
import GradeTable from "@/features/grades/components/grade-table";
import {gradeQueryState} from "@/features/grades/grade-services";



export default function GradeListView() {

    const gradeQuery = useRecoilValue(gradeQueryState);
    const [current, setCurrent] = useState(gradeQuery.listView);

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
                        <Tab label="LISTE" />
                        <Tab label="TABLE" />
                    </Tabs>
                </Stack>

                {current === 0 && <GradeList />}
                {current === 1 && <GradeTable />}
            </Box>
        </Box>
    );
}


