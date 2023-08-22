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
import {useRouter} from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import ListToolBar from "@/shared/components/list-tool-bar";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {useRecoilState} from "recoil";
import {gradeConfig} from "@/features/grades/grade-config";
import {gradeQueryState} from "@/features/grades/grade-services";
import {studentQueryState, studentSearchQueryState, useSearchStudents} from "@/features/students/student-services";
import StudentDelete from "@/features/students/components/student-delete";
import {studentConfig} from "@/features/students/student-config";
import {schoolYearQueryState} from "@/features/school-years/school-year-services";

export default function StudentList() {

    const [query, setQuery] = useRecoilState(studentSearchQueryState);
    const {data: currentValue, isLoading, isError, error, refetch} = useSearchStudents(query);
    const [gradeQuery, setGradeQuery] = useRecoilState(gradeQueryState);

    const router = useRouter();
    const handleRowClick = (value) => {
        setGradeQuery((prevState) => ({
            ...prevState,
            firstName: value.firstName,
            lastName: value.lastName,
            listView: 1,
        }));
        router.push(gradeConfig.path.root);
    };

    return (
            <ListToolBar refetch={refetch} label={"Matricule"} length={4} query={query} setQuery={setQuery} config={studentConfig}>
                
                <TableContainer sx={{minWidth: 700}}>
                    {isLoading && <LinearProgress/>}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Matricule"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Nom"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Prénom"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Date de Naissance"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Classe"}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        {currentValue && (

                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id} onClick={() => handleRowClick(value)}>
                                        <TableCell>{value.registrationNumber}</TableCell>
                                        <TableCell>{value.firstName}</TableCell>
                                        <TableCell>{value.lastName}</TableCell>
                                        <TableCell>{value.dateOfBirth}</TableCell>
                                        <TableCell>{value.classroom.name}</TableCell>
                                        <TableCell>
                                            <Stack direction={"row"} spacing={0}>
                                                <Link href={studentConfig.path.details(value.id) }>
                                                    <Tooltip title="Détails">
                                                        <IconButton><VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={studentConfig.path.edit(value.id) }>
                                                    <Tooltip title="Modifier">
                                                        <IconButton><EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <StudentDelete id={value.id} refetch={refetch}/>
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

