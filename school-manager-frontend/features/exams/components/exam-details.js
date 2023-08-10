import React from 'react';
import {Card, Stack, TextField} from "@mui/material";

export default function ExamDetails({currentValue}) {

    return (
        <Card>
            <Stack spacing={3} p={3}>
                <TextField
                    fullWidth
                    label="ID"
                    value={currentValue.id}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Matière"
                    value={currentValue.subject}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Nom prof."
                    value={currentValue.teacherName}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Date d'examen"
                    value={currentValue.examDate}
                    InputProps={{readOnly: true}}
                />

            </Stack>
        </Card>
    );
}

