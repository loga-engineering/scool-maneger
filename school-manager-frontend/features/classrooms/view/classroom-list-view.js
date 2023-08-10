"use client";

import {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";
import {Box, Button, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,LinearProgress } from "@mui/material";
import {deleteClassroomById, findAllClassrooms} from "../classroom-services";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';

export default function ClassroomListView() {


    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        findAllClassrooms().then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);

    console.log("===> classrooms: ", currentValue);

    const handleDelete = (id) => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cette classe ?");
        if (confirmation) {
            try {
                deleteClassroomById(id).then(setDeleted);
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
                <Typography variant="h3" p={3}>
                    {"Liste des salles de classe"}
                </Typography>

                <Link href={"classrooms/new"}>
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
                                <TableCell>{"Nom"}</TableCell>
                                <TableCell>{"Niveau"}</TableCell>
                                <TableCell>{"Prof. Titulaire"}</TableCell>
                                <TableCell>{"Année scolaire"}</TableCell>
                                <TableCell align={"center"}>{"Action"}</TableCell>
                            </TableRow>
                        </TableHead>
                        {isLoading && <LinearProgress/>}
                        {currentValue && (
                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id}>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell>{value.level}</TableCell>
                                        <TableCell>{value.headTeacherName}</TableCell>
                                        <TableCell>{value.schoolYear.year}</TableCell>
                                        <TableCell>
                                            <Stack direction={"row"} spacing={0} justifyContent={"center"}>
                                                <Link href={"classrooms/"+value.id}>
                                                    <Button startIcon={<VisibilityIcon/>}>
                                                    </Button>
                                                </Link>
                                                <Link href={"/classrooms/edit/"+value.id}>
                                                    <Button startIcon={<EditIcon/>}>
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
                deleted && (<Alert severity="success" justifyContent={"end"} onClose={() => {setDeleted(false)}}>Classe supprimé avec succès !</Alert>)
            }
        </Box>
    );
}

