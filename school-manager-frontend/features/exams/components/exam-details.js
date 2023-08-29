import React from 'react';
import {Box, Card, Stack, TextField} from "@mui/material";

export default function ExamDetails({currentValue}) {

    return (
        <Card>
            <Stack spacing={3} p={3}>
                <Box display="flex" gap="16px">
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="ID"
                            value={currentValue.id}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Date d'examen"
                            value={currentValue.examDate}
                            InputProps={{readOnly: true}}
                        />

                    </Box>
                </Box>

                <Box display="flex" gap="16px">
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Matière"
                            value={currentValue.subject}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Nom prof."
                            value={currentValue.teacherName}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                </Box>

            </Stack>
        </Card>
    );
}

