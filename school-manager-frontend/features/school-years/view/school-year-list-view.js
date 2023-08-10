"use client";

import {Add} from "@mui/icons-material";
import {Box, Button, Link, Stack, Typography} from "@mui/material";
import SchoolYearList from "../components/school-year-list";

export default function SchoolYearListView() {


    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Liste des années scolaires"}
                </Typography>

                <Link href={"school-years/new"}>
                    <Button startIcon={<Add/>} sx={{
                        color: 'text.secondary',
                    }}>
                        {"Ajouter"}
                    </Button>
                </Link>
            </Stack>

            <SchoolYearList/>
        </Box>
    );
}

