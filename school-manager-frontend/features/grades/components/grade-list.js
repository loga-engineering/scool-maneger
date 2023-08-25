
import Link from 'next/link';
import React, { useState} from 'react';
import {
    Card,
    CardHeader,
    IconButton,
    LinearProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {useRecoilState} from "recoil";
import {useRouter} from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import {Add, Refresh} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import {gradeConfig} from "@/features/grades/grade-config";
import {studentConfig} from "@/features/students/student-config";
import GradeDelete from "@/features/grades/components/grade-delete";
import {useSearchGrades} from "@/features/grades/grade-services";
import {studentQueryState} from "@/features/students/student-services";

export default function GradeList() {

    const router = useRouter();
    const [query, setQuery] = useState(0);
    const {data: currentValue, isLoading, isError, error, refetch} = useSearchGrades({query});
    const [studentQuery, setStudentQuery] = useRecoilState(studentQueryState);

    const handleRowClick = (lastName, firstName) => {
        setStudentQuery((prevState) => ({
            ...prevState,
            firstName: firstName,
            lastName: lastName,
        }));
        router.push(studentConfig.path.root);
    };

    return (
        <Card>

            <CardHeader
                title={
                    <Stack direction={"row"} alignItems={"start"}>
                        <Link href={"grades/new"}>
                            <Tooltip arrow title="Ajouter">
                                <IconButton>
                                    <Add/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Tooltip arrow title="actualiser">
                            <IconButton onClick={refetch}>
                                <Refresh/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="note croissant">
                            <IconButton onClick={() => setQuery(1) }>
                                <ArrowUpwardIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="note décroissant">
                            <IconButton onClick={() => setQuery(2)}>
                                <ArrowDownwardIcon />
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
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Date d'examen"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Matière"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Note"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Nom"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Prénom"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Classe"}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        {currentValue && (

                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id} onDoubleClick={() => handleRowClick(value.student.lastName,value.student.firstName)}>
                                        <TableCell>{value.exam.examDate}</TableCell>
                                        <TableCell>{value.exam.subject}</TableCell>
                                        <TableCell>{value.value}</TableCell>
                                        <TableCell>{value.student.lastName}</TableCell>
                                        <TableCell>{value.student.firstName}</TableCell>
                                        <TableCell>{value.student.classroom.name}</TableCell>
                                        <TableCell>
                                            <Stack direction={"row"} spacing={0}>
                                                <Link href={gradeConfig.path.details(value.id)}>
                                                    <Tooltip title="Détails">
                                                        <IconButton><VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={gradeConfig.path.edit(value.id)}>
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

