"use client";

import React from "react";
import {Add} from "@mui/icons-material";
import {Box, Button, Link, Stack, Typography} from "@mui/material";

export default function SchoolYearListView() {
    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3">
                    {"Liste des années scolaires"}
                </Typography>

                <Link href={"school-years/new"}>
                    <Button startIcon={<Add/>}>
                        {"Ajouter"}
                    </Button>
                </Link>
            </Stack>
        </Box>
    );
}

