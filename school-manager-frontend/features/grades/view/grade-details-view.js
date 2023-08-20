"use client";

import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import GradeDetails from "../components/grade-details";
import {useFindGradeById} from "@/features/grades/grade-services";

export default function GradeDetailsView({id}) {

    const {data: currentValue, isLoading, isError, error, refetch} = useFindGradeById(id);



    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Détails des notes"}
                </Typography>

                {isLoading && <LinearProgress/>}

                {currentValue && <GradeDetails currentValue={currentValue}/>}
            </Stack>
        </Box>
    );
}

