import React, { useState} from 'react';
import {
    Card,
    CardHeader,
    IconButton,
    LinearProgress,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import {Add, Refresh, Search} from "@mui/icons-material";
import SearchField from "../../../shared/components/search-field";
import {
    deleteStudentById,
    useSearchStudents
} from "@/features/students/student-services";

export default function StudentList() {

    const [query, setQuery] = useState();
    const {data: currentValue, isLoading, isError, error, refetch} = useSearchStudents({query});
    console.log("===> students: ", currentValue);

   const [deleted, setDeleted] = useState(false);

    const handleDelete = (id) => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cet élève ?");
        if (confirmation) {
            try {
                deleteStudentById(id).then(() =>setDeleted(true));
            }catch (error) {
                setDeleted(false);
                console.error("===> ", error);
                throw error;

            }

        }
    };


    return (
        <Card>

            <CardHeader
                title={<SearchField query={query} setQuery={setQuery} label={"Matricule"} length={4}/>}
                action={(
                    <Stack direction={"row"}>
                        <Link href={"students/new"}>
                            <IconButton>
                                <Add/>
                            </IconButton>
                        </Link>

                        <IconButton onClick={refetch}>
                            <Refresh/>
                        </IconButton>
                    </Stack>
                )}
            />


                <TableContainer sx={{minWidth: 700}}>
                    {isLoading && <LinearProgress/>}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{"Matricule"}</TableCell>
                                <TableCell>{"Nom"}</TableCell>
                                <TableCell>{"Prénom"}</TableCell>
                                <TableCell>{"Date de Naissance"}</TableCell>
                                <TableCell>{"Classe"}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
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
                                            <Stack direction={"row"} spacing={0}>
                                                <Link href={"students/"+value.id}>
                                                    <Tooltip title="Détails">
                                                        <IconButton><VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={"students/edit/"+value.id}>
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

            {
                deleted && (<Alert severity="success" justifyContent={"end"} onClose={() => {setDeleted(false)}}>Elève supprimé avec succès !</Alert>)
            }

        </Card>

    );
}

