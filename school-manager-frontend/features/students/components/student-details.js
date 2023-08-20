import React from 'react';
import {Card, Stack, TextField} from "@mui/material";


export default function StudentDetails({currentValue}) {

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
                    label="Matricule"
                    value={currentValue.registrationNumber}
                    InputProps={{readOnly: true}}
                />

                <TextField fullWidth
                           label="Nom"
                           value={currentValue.firstName}
                           InputProps={{readOnly: true}}
                />

                <TextField fullWidth
                           label="Prénom"
                           value={currentValue.lastName}
                           InputProps={{readOnly: true}}
                />


                <TextField type="date" label="Date de naissance"
                           value={currentValue.dateOfBirth}
                           InputProps={{readOnly: true}}
                />

                <TextField label="Prénom du père"
                           value={currentValue.fatherName}
                           InputProps={{readOnly: true}}
                />

                <TextField label="Nom de la mère" value={currentValue.motherName}
                           InputProps={{readOnly: true}}/>

                <TextField label="Contact" value={currentValue.contact}
                           InputProps={{readOnly: true}}/>

                <TextField label="Adresse" value={currentValue.address}
                           InputProps={{readOnly: true}}/>

                <TextField type="date" label="Date d'inscription"
                           value={currentValue.enrollmentDate}
                           InputProps={{readOnly: true}} />
                <TextField label="Classe"
                           value={currentValue.classroom.name}
                           InputProps={{readOnly: true}} />

            </Stack>
        </Card>
    );
}

