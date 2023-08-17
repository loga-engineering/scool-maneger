import React, { useState} from 'react';
import {
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
import {useSearchClassrooms} from "@/features/classrooms/classroom-services";
import ClassroomDelete from "@/features/classrooms/components/classroom-delete";
import {classroomConfig} from "@/features/classrooms/classroom-config";
import ListToolBar from "@/shared/components/list-tool-bar";

export default function ClassroomList() {

    const [query, setQuery] = useState();
    const {data: currentValue, isLoading, refetch} = useSearchClassrooms({query});


    return (
            <ListToolBar refetch={refetch} label={"Nom"} length={1} query={query} setQuery={setQuery} config={classroomConfig}>


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
                                                <Link href={classroomConfig.path.details(value.id)}>
                                                    <Tooltip title="Détails">
                                                        <IconButton><VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={classroomConfig.path.edit(value.id)}>
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

            </ListToolBar>
    );
}

