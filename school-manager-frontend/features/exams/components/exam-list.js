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
import {Add, Refresh, Search} from "@mui/icons-material";
import SearchField from "../../../shared/components/search-field";
import {useSearchExams} from "@/features/exams/exam-services";
import ExamDelete from "@/features/exams/components/exam-delete";

export default function ExamList() {

    const [query, setQuery] = useState();
    const {data: currentValue, isLoading, isError, error, refetch} = useSearchExams({query});


    return (
        <Card>

            <CardHeader
                title={<SearchField query={query} setQuery={setQuery} label={"Matière"} length={2}/>}
                action={(
                    <Stack direction={"row"}>
                        <Link href={"exams/new"}>
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
                                <TableCell>{"ID"}</TableCell>
                                <TableCell>{"Matière"}</TableCell>
                                <TableCell>{"Nom prof."}</TableCell>
                                <TableCell>{"Date d'examen"}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        {currentValue && (

                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id}>
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell>{value.subject}</TableCell>
                                        <TableCell>{value.teacherName}</TableCell>
                                        <TableCell>{value.examDate}</TableCell>
                                        <TableCell>
                                            <Stack direction={"row"} spacing={0}>
                                                <Link href={"exams/"+value.id}>
                                                    <Tooltip title="Détails">
                                                        <IconButton><VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={"exams/edit/"+value.id}>
                                                    <Tooltip title="Modifier">
                                                        <IconButton><EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <ExamDelete id={value.id} refetch={refetch}/>
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

