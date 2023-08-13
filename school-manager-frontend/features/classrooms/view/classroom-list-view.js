"use client";

import {useContext, useEffect, useState} from "react";
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
    Tooltip, IconButton
} from "@mui/material";
import {deleteClassroomById, findAllClassrooms} from "../classroom-services";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';
import {ModuleContext, useModule} from "../../../shared/context/module-context";
import ModuleName from "../../../shared/components/module-name";

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

            <ModuleName/>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>

                <Typography variant="h3" p={3}>
                    {"Liste des salles de classe"}
                </Typography>

                <Link href={"classrooms/new"}>
                    <Button startIcon={<Add/>} sx={{
                        color: 'text.secondary',
                    }}>
                        {"Ajouter"}
                    </Button>
                </Link>
            </Stack>

            <Box m={3}>

                <TableContainer sx={{minWidth: 800}}>
                    {isLoading && <LinearProgress/>}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{"Nom"}</TableCell>
                                <TableCell>{"Niveau"}</TableCell>
                                <TableCell>{"Prof. Titulaire"}</TableCell>
                                <TableCell>{"Année scolaire"}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentValue?.map(value => (
                                <TableRow key={value.id}>
                                    <TableCell>{value.name}</TableCell>
                                    <TableCell>{value.level}</TableCell>
                                    <TableCell>{value.headTeacherName}</TableCell>
                                    <TableCell>{value.schoolYear.year}</TableCell>
                                    <TableCell>
                                        <Stack direction={"row"} spacing={0}>
                                            <Link href={"classrooms/"+value.id}>
                                                <Tooltip title="Détails">
                                                    <IconButton><VisibilityIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            <Link href={"classrooms/edit/"+value.id}>
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
                    </Table>

                </TableContainer>
            </Box>
            {
                deleted && (<Alert severity="success" justifyContent={"end"} onClose={() => {setDeleted(false)}}>Classe supprimé avec succès !</Alert>)
            }
        </Box>
    );
}

