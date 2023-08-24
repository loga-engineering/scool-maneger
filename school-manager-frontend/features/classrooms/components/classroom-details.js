import {Box, Card, Stack, TextField} from "@mui/material";
import {useCountStudents} from "@/features/students/student-services";

export default function ClassroomDetails({currentValue}) {

    const {data: numberOfStudents, isLoading, isError, error, refetch} = useCountStudents(currentValue.id);


    return (
        <Card>
            <Stack spacing={3} p={3}>
                <Box display="flex" gap="16px">
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Nom"
                            value={currentValue.name}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Niveau"
                            value={currentValue.level}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                </Box>
                <Box display="flex" gap="16px">
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Année scolaire"
                            value={currentValue.schoolYear.year}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Prof. Titulaire"
                            value={currentValue.headTeacherName}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                </Box>
                <TextField
                    fullWidth
                    label="Nombre d'élèves"
                    value={numberOfStudents?.toString()}
                    InputProps={{readOnly: true}}
                />

            </Stack>
        </Card>
    );
}

