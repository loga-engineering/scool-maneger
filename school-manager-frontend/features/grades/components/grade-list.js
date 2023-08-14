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
    Tooltip,Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import {Add, Refresh} from "@mui/icons-material";
import {useSearchGrades} from "@/features/grades/grade-services";
import GradeDelete from "@/features/grades/components/grade-delete";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function GradeList() {

    const [query, setQuery] = useState(0);
    const {data: currentValue, isLoading, isError, error, refetch} = useSearchGrades({query});


    return (
        <Card>

            <CardHeader
                title={
                    <Stack direction={"row"} alignItems={"start"}>
                        <Tooltip title="note croissant">
                            <IconButton onClick={() => setQuery(1) }>
                                <ArrowUpwardIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="note décroissant">
                            <IconButton onClick={() => setQuery(2)}>
                                <ArrowDownwardIcon />
                            </IconButton>
                        </Tooltip>
                        <Link href={"grades/new"}>
                            <Tooltip title="Ajouter">
                                <IconButton>
                                    <Add/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Tooltip title="actualiser">
                            <IconButton onClick={refetch}>
                                <Refresh/>
                            </IconButton>
                        </Tooltip>
                    </Stack>

                    }
                action={(
                    <Stack direction={"row"}>
                    </Stack>
                )}
            />


                <TableContainer sx={{minWidth: 700}}>
                    {isLoading && <LinearProgress/>}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{"Date d'examen"}</TableCell>
                                <TableCell>{"Matière"}</TableCell>
                                <TableCell>{"Note"}</TableCell>
                                <TableCell>{"Nom"}</TableCell>
                                <TableCell>{"Prénom"}</TableCell>
                                <TableCell>{"Classe"}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        {currentValue && (

                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id}>
                                        <TableCell>{value.exam.examDate}</TableCell>
                                        <TableCell>{value.exam.subject}</TableCell>
                                        <TableCell>{value.value}</TableCell>
                                        <TableCell>{value.student.lastName}</TableCell>
                                        <TableCell>{value.student.firstName}</TableCell>
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
                                                <GradeDelete id={value.id} refetch={refetch}/>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>

        </Card>

    );
}

