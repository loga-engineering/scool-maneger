import React, {useState} from 'react';
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
import { useSearchSchoolYears} from "../school-year-services";
import {Add, Refresh} from "@mui/icons-material";
import SearchField from "../../../shared/components/search-field";
import SchoolYearDelete from "@/features/school-years/components/school-year-delete";

export default function SchoolYearList() {

    const [query, setQuery] = useState();
    const {data: currentValue, isLoading, isError, error, refetch} = useSearchSchoolYears({query});


    return (
        <Card>

            <CardHeader
                title={<SearchField query={query} setQuery={setQuery} label={"Année scolaire"} length={4} />}
                action={(
                    <Stack direction={"row"}>
                        <Link href={"school-years/new"}>
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
                                            <Link href={"school-years/" + value.id}>
                                                <Tooltip title="Détails">
                                                    <IconButton><VisibilityIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            <Link href={"school-years/edit/" + value.id}>
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

        </Card>

    );
}

