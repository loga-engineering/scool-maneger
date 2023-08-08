"use client";

import {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";
import {Box, Button, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,LinearProgress } from "@mui/material";
import { findAllSchoolYears } from "../school-year-services";

export default function SchoolYearListView() {


    const [isLoading, setIsLoading] = useState();
    const [currentValue, setCurrentValue] = useState();

    useEffect(() => {
        setIsLoading(true);
        findAllSchoolYears().then(setCurrentValue).finally(() => setIsLoading(false));
    }, []);

    console.log("===> school-years: ", currentValue);

    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3">
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
                                    </TableRow>
                                ))}
                            </TableBody> 
                        )}
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

