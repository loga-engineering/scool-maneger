"use client";

import {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";
import {Box, Button, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,LinearProgress } from "@mui/material";
import {deleteSchoolYearById, findAllSchoolYears} from "../school-year-services";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';

export default function SchoolYearListView() {


    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        findAllSchoolYears().then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);

    console.log("===> school-years: ", currentValue);

    const handleDelete = (id) => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cette année scolaire ?");
        if (confirmation) {
            try {
                deleteSchoolYearById(id).then(setDeleted);
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
                    {"Liste des années scolaires"}
                </Typography>

                <Link href={"school-years/new"}>
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
                                <TableCell>{"ID"}</TableCell>
                                <TableCell>{"Année"}</TableCell>
                                <TableCell>{"Date de début"}</TableCell>
                                <TableCell>{"Date de fin"}</TableCell>
                                <TableCell align={"center"}>{"Action"}</TableCell>
                            </TableRow>
                        </TableHead>
                        {isLoading && <LinearProgress/>}
                        {currentValue && (
                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id}>
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell>{value.year}</TableCell>
                                        <TableCell>{value.startDate}</TableCell>
                                        <TableCell>{value.endDate}</TableCell>
                                        <TableCell>
                                            <Stack direction={"row"} spacing={0} justifyContent={"center"}>
                                                <Link href={"school-years/"+value.id}>
                                                    <Button startIcon={<VisibilityIcon/>}>
                                                    </Button>
                                                </Link>
                                                <Link href={"/school-years/edit/"+value.id}>
                                                    <Button startIcon={<EditIcon/>}>
                                                    </Button>
                                                </Link>
                                                <Button onClick={() => handleDelete(value.id)} startIcon={<DeleteIcon />}>
                                                </Button>

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
                deleted && (<Alert severity="success" justifyContent={"end"} onClose={() => {setDeleted(false)}}>Année scolaire supprimé avec succès !</Alert>)
            }
        </Box>
    );
}

