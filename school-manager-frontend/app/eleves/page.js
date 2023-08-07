"use client"

import {useEffect, useState} from 'react'
import {findAllEleves} from "../../features/eleves/eleve-services";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

export default function EleveList() {

    const [eleves, setEleves] = useState();
    const [loading, setLoading] = useState();

    console.log("===> eleves: ", eleves);

    useEffect(() => {
        setLoading(true);
        findAllEleves().then(setEleves).catch(error => {
        }).finally(() => setLoading(false));
    }, [])

    return (
        <Box m={3}>
            <Typography variant={"h3"}>
                {"List des élèves"}
            </Typography>

            <TableContainer sx={{minWidth: 800}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{"ID"}</TableCell>
                            <TableCell>{"Nom"}</TableCell>
                            <TableCell>{"Prenom"}</TableCell>
                            <TableCell>{"Date Naissance"}</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {eleves?.map(eleve => (
                            <TableRow>
                                <TableCell>{eleve.id}</TableCell>
                                <TableCell>{eleve.nom}</TableCell>
                                <TableCell>{eleve.prenom}</TableCell>
                                <TableCell>{eleve.dateNaissance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
