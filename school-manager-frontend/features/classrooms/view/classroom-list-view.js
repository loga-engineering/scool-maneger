"use client";

import {
    Box,
    Stack,
    Typography,
} from "@mui/material";
import ClassroomList from "@/features/classrooms/components/classroom-list";

export default function ClassroomListView() {

    return (
        <Box>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>

                <Typography variant="h3" p={3}>
                    {"Liste des salles de classe"}
                </Typography>

            </Stack>

            <ClassroomList />


        </Box>
    );
}

