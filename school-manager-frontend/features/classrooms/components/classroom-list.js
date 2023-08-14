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
import {useSearchClassrooms} from "@/features/classrooms/classroom-services";
import ClassroomDelete from "@/features/classrooms/components/classroom-delete";

export default function ClassroomList() {

    const [query, setQuery] = useState();
    const {data: currentValue, isLoading, isError, error, refetch} = useSearchClassrooms({query});


    return (
        <Card>

            <CardHeader
                title={<SearchField query={query} setQuery={setQuery} label={"Nom"} length={1}/>}
                action={(
                    <Stack direction={"row"}>
                        <Link href={"classrooms/new"}>
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
                                <TableCell>{"Nom"}</TableCell>
                                <TableCell>{"Niveau"}</TableCell>
                                <TableCell>{"Prof. Titulaire"}</TableCell>
                                <TableCell>{"Année scolaire"}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        {currentValue && (

                            <TableBody>
                                {currentValue.map(value => (
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
                                                <ClassroomDelete id={value.id} refetch={refetch}/>
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

