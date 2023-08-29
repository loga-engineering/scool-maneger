
import {Box, Card, Stack, TextField, Typography} from "@mui/material";

export default function GradeDetails({currentValue}) {

    return (
        <Card>
            <Stack spacing={3} p={3}>
                <Box display="flex" gap="16px">
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Note"
                            value={currentValue.value}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Date examen"
                            value={currentValue.exam.examDate}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                </Box>

                <Stack spacing={2} >
                    <Typography variant="h5" align={"center"}>
                        {"Infos élève"}
                    </Typography>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <TextField
                                fullWidth
                                label="Prénom"
                                value={currentValue.student.firstName}
                                InputProps={{ readOnly: true }}
                            />
                        </Box>
                        <Box flex={1}>
                            <TextField
                                fullWidth
                                label="Nom"
                                value={currentValue.student.lastName}
                                InputProps={{ readOnly: true }}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <TextField
                                fullWidth
                                label="Matricule"
                                value={currentValue.student.registrationNumber}
                                InputProps={{readOnly: true}}
                            />
                        </Box>
                        <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Classe"
                            value={currentValue.student.classroom.name}
                            InputProps={{readOnly: true}}
                        />
                        </Box>
                    </Box>
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h5" align={"center"}>
                        {"Infos examen"}
                    </Typography>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <TextField
                                fullWidth
                                label="Matière"
                                value={currentValue.exam.subject}
                                InputProps={{readOnly: true}}
                            />
                        </Box>
                        <Box flex={1}>
                            <TextField
                                fullWidth
                                label="Nom prof."
                                value={currentValue.exam.teacherName}
                                InputProps={{readOnly: true}}
                            />
                        </Box>
                    </Box>
                </Stack>

            </Stack>
        </Card>
    );
}

