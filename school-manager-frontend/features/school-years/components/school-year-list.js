import React, {useState} from 'react';
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
import { useFindSchoolYears} from "../school-year-services";
import SchoolYearDelete from "@/features/school-years/components/school-year-delete";
import {schoolYearConfig} from "@/features/school-years/school-year-config";
import ListToolBar from "@/shared/components/list-tool-bar";

export default function SchoolYearList() {

    const [query, setQuery] = useState();
    const {data: currentValue, isLoading, refetch} = useFindSchoolYears({query});


    return (
            <ListToolBar refetch={refetch} label={"Année scolaire"} length={4} query={query} setQuery={setQuery} config={schoolYearConfig}>

            <TableContainer sx={{minWidth: 800}}>{isLoading && <LinearProgress/>}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{"ID"}</TableCell>
                            <TableCell>{"Année"}</TableCell>
                            <TableCell>{"Date de début"}</TableCell>
                            <TableCell>{"Date de fin"}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                    </TableHead>

                    {currentValue && (
                        <TableBody>
                            {currentValue.map(value => (
                                <TableRow key={value.id}>
                                    <TableCell>{value.id}</TableCell>
                                    <TableCell>{value.year}</TableCell>
                                    <TableCell>{value.startDate}</TableCell>
                                    <TableCell>{value.endDate}</TableCell>
                                    <TableCell>
                                        <Stack direction={"row"} spacing={0}>
                                            <Link href={schoolYearConfig.path.details(value.id)}>
                                                <Tooltip title="Détails">
                                                    <IconButton><VisibilityIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            <Link href={schoolYearConfig.path.edit(value.id)}>
                                                <Tooltip title="Modifier">
                                                    <IconButton><EditIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>

                                            <SchoolYearDelete id={value.id} refetch={refetch}/>

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

