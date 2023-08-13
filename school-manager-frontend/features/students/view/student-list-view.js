"use client";
import {
    Box,
    Stack,
    Typography,
} from "@mui/material";
import * as React from "react";
import ModuleName from "../../../shared/components/module-name";
import StudentList from "@/features/students/components/student-list";

export default function StudentListView() {


    return (
        <Box>
            {/*<ModuleName/>*/}

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>

                <Typography variant={"h3"} p={3}>
                    {"Liste des élèves"}
                </Typography>

                {/*<Link href={"students/new"}>*/}
                {/*    <Button startIcon={<Add/>} sx={{*/}
                {/*        color: 'text.secondary',*/}
                {/*    }}>*/}
                {/*        {"Ajouter"}*/}
                {/*    </Button>*/}
                {/*</Link>*/}
            </Stack>

            <StudentList />
        </Box>
    );
}

