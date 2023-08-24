import {
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
import Link from 'next/link';
import {useRecoilState} from "recoil";
import {useRouter} from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ListToolBar from "@/shared/components/list-tool-bar";
import {schoolYearQueryState, useFindSchoolYears} from "../school-year-services";
import {classroomConfig} from "@/features/classrooms/classroomConfig";
import {classroomQueryState} from "@/features/classrooms/classroom-services";
import {schoolYearConfig} from "@/features/school-years/school-year-config";
import SchoolYearDelete from "@/features/school-years/components/school-year-delete";

export default function SchoolYearList() {

    const router = useRouter();
    const [query, setQuery] = useRecoilState(schoolYearQueryState);
    const {data: currentValue, isLoading, refetch} = useFindSchoolYears(query);
    const [classroomQuery, setClassroomQuery] = useRecoilState(classroomQueryState);

    const handleRowClick = (year) => {
        setClassroomQuery((prevState) => ({
            ...prevState,
            query: year,
        }));
        router.push(classroomConfig.path.root);
    };

    return (
            <ListToolBar refetch={refetch} label={"Année scolaire"} length={4} query={query} setQuery={setQuery} config={schoolYearConfig}>

            <TableContainer sx={{minWidth: 800}}>{isLoading && <LinearProgress/>}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold'}}>{"ID"}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold'}}>{"Année"}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold'}}>{"Date de début"}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold'}}>{"Date de fin"}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                    </TableHead>

                    {currentValue && (
                        <TableBody>
                            {currentValue.map(value => (
                                <TableRow key={value.id} onDoubleClick={() => handleRowClick(value.year)}>
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

