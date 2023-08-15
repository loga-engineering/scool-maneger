"use client";

import {Box, Stack, Typography} from "@mui/material";
import Example from "../components/school-year-table";

export default function SchoolYearListView() {


    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Liste des années scolaires"}
                </Typography>

            </Stack>

            {/*<SchoolYearList/>*/}
            <Example />
        </Box>
    );
}

