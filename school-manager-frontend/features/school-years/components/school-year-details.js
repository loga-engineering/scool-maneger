import {Box, Card, Stack, TextField} from "@mui/material";

export default function SchoolYearDetails({currentValue}) {

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
                            label="Année"
                            value={currentValue.year}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                </Box>
                <Box display="flex" gap="16px">
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Date de début"
                            value={currentValue.startDate}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Date de fin"
                            value={currentValue.endDate}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                </Box>

            </Stack>
        </Card>
    );
}

