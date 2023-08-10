import React, {useState} from 'react';
import {
    Card,
    CardHeader,
    IconButton, InputAdornment,
    LinearProgress,
    Link,
    OutlinedInput,
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
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteSchoolYearById, useSearchSchoolYears} from "../school-year-services";
import Alert from "@mui/material/Alert";
import {Add, Refresh, Search} from "@mui/icons-material";
import SearchField from "../../../shared/components/search-field";

export default function SchoolYearList() {

    const [query, setQuery] = useState();
    const {data: currentValue, isLoading, isError, error, refetch} = useSearchSchoolYears({query});

    const [deleted, setDeleted] = useState(false);

    console.log("===> school-years: ", currentValue);

    const handleDelete = (id) => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cette année scolaire ?");
        if (confirmation) {
            try {
                deleteSchoolYearById(id).then(setDeleted);
            } catch (error) {
                console.error("===> ", error);
                throw error;
                setDeleted(false);
            }

        }
    };

    return (
        <Card>

            <CardHeader
                title={<SearchField query={query} setQuery={setQuery}/>}
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
            <TableContainer sx={{minWidth: 800}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{"ID"}</TableCell>
                            <TableCell>{"Année"}</TableCell>
                            <TableCell>{"Date de début"}</TableCell>
                            <TableCell>{"Date de fin"}</TableCell>
                            <TableCell>{"Action"}</TableCell>
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
                                            <Tooltip title="Supprimer">
                                                <IconButton onClick={() => handleDelete(value.id)}><DeleteIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    )}
                </Table>

            </TableContainer>

            {
                deleted && (<Alert severity="success" justifyContent={"end"} onClose={() => {
                    setDeleted(false)
                }}>Année scolaire supprimé avec succès !</Alert>)
            }

        </Card>

    );
}

