
import {Box, Stack, Typography} from "@mui/material";
import GradeNewEditForm from "@/features/grades/components/grade-new-edit-form";

export default function GradeNewView() {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Donner une note"}
                </Typography>

                <GradeNewEditForm isEdit={false}/>
            </Stack>
        </Box>
    );
}

