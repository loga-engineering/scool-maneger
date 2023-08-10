"use client";

import {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";
import {
    Box,
    Button,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    LinearProgress,
    IconButton, Tooltip
} from "@mui/material";
import {deleteGradeById, findAllGrades} from "../grade-services";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';

export default function GradeListView() {


    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        findAllGrades().then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);

    console.log("===> grades: ", currentValue);

    const handleDelete = (id) => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cette note ?");
        if (confirmation) {
            try {
                deleteGradeById(id).then(setDeleted);
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
                    {"Liste des notes des élèves"}
                </Typography>

                <Link href={"grades/new"}>
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
                                <TableCell>{"Date d'examen"}</TableCell>
                                <TableCell>{"Matière"}</TableCell>
                                <TableCell>{"Nom"}</TableCell>
                                <TableCell>{"Prénom"}</TableCell>
                                <TableCell>{"Note"}</TableCell>
                                <TableCell>{"Classe"}</TableCell>
                                <TableCell>{"Action"}</TableCell>
                            </TableRow>
                        </TableHead>
                        {isLoading && <LinearProgress/>}
                        {currentValue && (
                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id}>
                                        <TableCell>{value.exam.examDate}</TableCell>
                                        <TableCell>{value.exam.subject}</TableCell>
                                        <TableCell>{value.student.lastName}</TableCell>
                                        <TableCell>{value.student.firstName}</TableCell>
                                        <TableCell>{value.value}</TableCell>
                                        <TableCell>{value.student.classroom.name}</TableCell>
                                        <TableCell>
                                            <Stack direction={"row"} spacing={0}>
                                                <Link href={"grades/"+value.id}>
                                                    <Tooltip title="Détails">
                                                        <IconButton><VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={"grades/edit/"+value.id}>
                                                    <Tooltip title="Modifier">
                                                        <IconButton><EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Tooltip title="Supprimer">
                                                    <IconButton onClick={() => handleDelete(value.id)}><DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
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
                deleted && (<Alert severity="success" justifyContent={"end"} onClose={() => {setDeleted(false)}}>Note supprimé avec succès !</Alert>)
            }
        </Box>
    );
}

