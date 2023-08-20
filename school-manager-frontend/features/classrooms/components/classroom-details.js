import {Card, Stack, TextField} from "@mui/material";
import {useCountStudents} from "@/features/students/student-services";

export default function ClassroomDetails({currentValue}) {

    const {data: numberOfStudents, isLoading, isError, error, refetch} = useCountStudents(currentValue.id);


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
                    label="Nom"
                    value={currentValue.name}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Niveau"
                    value={currentValue.level}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Prof. Titulaire"
                    value={currentValue.headTeacherName}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Année scolaire"
                    value={currentValue.schoolYear.year}
                    InputProps={{readOnly: true}}
                />
                <TextField
                    fullWidth
                    label="Nombre d'élèves"
                    value={numberOfStudents}
                    InputProps={{readOnly: true}}
                />

            </Stack>
        </Card>
    );
}

