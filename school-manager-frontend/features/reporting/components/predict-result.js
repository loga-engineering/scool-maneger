import React from 'react';
import {Box, Card, Stack, TextField, Typography} from "@mui/material";
import {useRecoilValue} from "recoil";
import {predictionQueryState} from "@/features/reporting/reporting-services";
import ReportingSparkLine from "@/features/reporting/components/reporting-spark-line";


export default function PredictResult({currentValue}) {

    const prediction = useRecoilValue(predictionQueryState);

    return (
        <Card>
            <Stack spacing={3} p={3}>
                <ReportingSparkLine />
                <Stack spacing={2} >
                    <Typography variant="body1" align={"center"}>
                        {"Prédiction de la moyenne de l'élève à partir des informations personnelles et des deux " +
                            "dernières moyennes obtenue avec une Fiabilité de 74%"}
                    </Typography>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <TextField fullWidth label="Resultat"
                                       value={prediction}
                                       InputProps={{readOnly: true}}
                            />
                        </Box>

                    </Box>


                </Stack>


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



            </Stack>
        </Card>
    );
}

