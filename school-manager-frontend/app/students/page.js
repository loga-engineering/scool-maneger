"use client"
import {useEffect, useState} from 'react'
import {findAllStudents} from "../../features/students/student-services";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

export default function StudentList() {

    const [students, setStudents] = useState();
    const [loading, setLoading] = useState();

    console.log("===> students: ", students);

    useEffect(() => {
        setLoading(true);
        findAllStudents().then(setStudents).catch((error) => { console.error("Something went wrong !", error)
        }).finally(() => setLoading(false));
        console.log(students)
    }, [])

    return (
        <Box m={3}>
            <Typography variant="h3">
                {"Liste des élèves"}
            </Typography>

            <TableContainer sx={{minWidth: 800}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{"ID"}</TableCell>
                            <TableCell>{"Nom"}</TableCell>
                            <TableCell>{"Prénom"}</TableCell>
                            <TableCell>{"Date de Naissance"}</TableCell>
                        </TableRow>
                    </TableHead>

                    {!loading && (
                        <TableBody>
                            {Array.isArray(students) && students.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.firstName}</TableCell>
                                    <TableCell>{student.lastName}</TableCell>
                                    <TableCell>{student.dateOfBirth}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> 
                    )}
                </Table>
            </TableContainer>
        </Box>
    )
}
