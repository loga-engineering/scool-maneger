"use client";

import {useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {useFindClassroomById} from "../classroom-services";
import ClassroomNewEditForm from "@/features/classrooms/components/classroom-new-edit-form";


export default function ClassroomEditView({id}) {

    const [query, setQuery] = useState(id);
    const {data: currentValue, isLoading, isError, error, refetch} = useFindClassroomById({query});

    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Modifier les informations d'une classe"}
                </Typography>

                {/*{currentValue && <ClassroomEditForm currentValue={currentValue}/>}*/}
                {currentValue && <ClassroomNewEditForm currentValue={currentValue} isEdit />}

            </Stack>
        </Box>
    );
}

