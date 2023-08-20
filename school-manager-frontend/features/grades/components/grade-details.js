import {Card, Stack, TextField, Typography} from "@mui/material";

export default function GradeDetails({currentValue}) {


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
                    label="Note"
                    value={currentValue.value}
                    InputProps={{readOnly: true}}
                />
                <Stack spacing={2} >
                    <Typography variant="h5" align={"center"}>
                        {"Infos élève"}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Matricule"
                        value={currentValue.student.registrationNumber}
                        InputProps={{readOnly: true}}
                    />
                    <TextField
                        fullWidth
                        label="Prénom"
                        value={currentValue.student.firstName}
                        InputProps={{readOnly: true}}
                    />
                    <TextField
                        fullWidth
                        label="Nom"
                        value={currentValue.student.lastName}
                        InputProps={{readOnly: true}}
                    />
                    <TextField
                        fullWidth
                        label="Classe"
                        value={currentValue.student.classroom.name}
                        InputProps={{readOnly: true}}
                    />
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h5" align={"center"}>
                        {"Infos examen"}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Date examen"
                        value={currentValue.exam.examDate}
                        InputProps={{readOnly: true}}
                    />
                    <TextField
                        fullWidth
                        label="Matière"
                        value={currentValue.exam.subject}
                        InputProps={{readOnly: true}}
                    />
                    <TextField
                        fullWidth
                        label="Nom prof."
                        value={currentValue.exam.teacherName}
                        InputProps={{readOnly: true}}
                    />
                </Stack>

            </Stack>
        </Card>
    );
}

