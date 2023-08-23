import React from 'react';
import {Box, Card, Stack, TextField, Typography} from "@mui/material";


export default function StudentDetails({currentValue}) {

    return (
        <Card>
            <Stack spacing={3} p={3}>

                <Box display="flex" gap="16px">
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            label="Matricule"
                            value={currentValue.registrationNumber}
                            InputProps={{readOnly: true}}
                        />
                    </Box>
                    <Box flex={1}>
                        <TextField fullWidth label="Classe"
                                   value={currentValue.classroom.name}
                                   InputProps={{readOnly: true}} />
                    </Box>
                </Box>

                <Stack spacing={2} >
                    <Typography variant="h5" align={"center"}>
                        {"Etat civil"}
                    </Typography>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                        <TextField fullWidth
                                   label="Nom"
                                   value={currentValue.firstName}
                                   InputProps={{readOnly: true}}
                        />
                        </Box>
                        <Box flex={1}>
                        <TextField fullWidth
                                   label="Prénom"
                                   value={currentValue.lastName}
                                   InputProps={{readOnly: true}}
                        />
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={2}>
                            <TextField  fullWidth label="Date de naissance"
                                       value={currentValue.dateOfBirth}
                                       InputProps={{readOnly: true}}
                            />
                        </Box>
                        <Box flex={2}>
                            <TextField fullWidth label="Date d'inscription"
                                       value={currentValue.enrollmentDate}
                                       InputProps={{readOnly: true}} />
                        </Box>
                    </Box>
                </Stack>

                <Stack spacing={2} >
                    <Typography variant="h5" align={"center"}>
                        {"Informations des parents"}
                    </Typography>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <TextField fullWidth label="Prénom du père"
                                       value={currentValue.fatherName}
                                       InputProps={{readOnly: true}}
                            />
                        </Box>
                        <Box flex={1}>
                            <TextField fullWidth label="Nom de la mère" value={currentValue.motherName}
                                       InputProps={{readOnly: true}}/>
                        </Box>
                    </Box>

                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <TextField fullWidth label="Contact" value={currentValue.contact}
                                       InputProps={{readOnly: true}}/>
                        </Box>
                        <Box flex={1}>
                            <TextField fullWidth label="Adresse" value={currentValue.address}
                                       InputProps={{readOnly: true}}/>
                        </Box>
                    </Box>
                </Stack>


            </Stack>
        </Card>
    );
}

