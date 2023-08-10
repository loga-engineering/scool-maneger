"use client";

import {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";
import {Box, Button, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,LinearProgress } from "@mui/material";
import {deleteStudentById, findAllStudents} from "@/features/students/student-services";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from "@mui/material/Alert";
import * as React from "react";

export default function StudentListView() {

    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        findAllStudents().then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);

    console.log("===> students: ", currentValue);

    const handleDelete = (id) => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cet élève ?");
        if (confirmation) {
            try {
                deleteStudentById(id).then(setDeleted);
            }catch (error) {
                console.error("===> ", error);
                throw error;
                setDeleted(false);
            }

        }
    };


    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>

                <Typography variant={"h3"} p={3}>
                    {"Liste des élèves"}
                </Typography>

                <Link href={"students/new"}>
                    <Button startIcon={<Add/>}>
                        {"Ajouter"}
                    </Button>
                </Link>
            </Stack>

            <Box m={3}>

                <TableContainer sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{"Matricule"}</TableCell>
                                <TableCell>{"Nom"}</TableCell>
                                <TableCell>{"Prénom"}</TableCell>
                                <TableCell>{"Date de Naissance"}</TableCell>
                                <TableCell>{"Classe"}</TableCell>
                                <TableCell align={"center"}>{"Action"}</TableCell>
                            </TableRow>
                        </TableHead>
                        {isLoading && <LinearProgress/>}
                        {currentValue && (
                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id}>
                                        <TableCell>{value.registrationNumber}</TableCell>
                                        <TableCell>{value.firstName}</TableCell>
                                        <TableCell>{value.lastName}</TableCell>
                                        <TableCell>{value.dateOfBirth}</TableCell>
                                        <TableCell>{value.classroom.name}</TableCell>
                                        <TableCell>
                                            <Stack direction={"row"} spacing={0} justifyContent={"center"}>
                                                <Link href={"students/"+value.id}>
                                                    <Button startIcon={<VisibilityIcon />}>
                                                    </Button>
                                                </Link>
                                                <Link href={"students/edit/"+value.id}>
                                                    <Button startIcon={<EditIcon />}>
                                                    </Button>
                                                </Link>
                                                <Button onClick={() => handleDelete(value.id)} startIcon={<DeleteIcon />}>
                                                </Button>
                                            </Stack>
                                        </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Box>
            {
                deleted && (<Alert severity="success" justifyContent={"end"} onClose={() => {setDeleted(false)}}>Elève supprimé avec succès !</Alert>)
            }
        </Box>
    );
}

