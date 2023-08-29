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
import {studentConfig} from "@/features/students/student-config";
import {classroomConfig} from "@/features/classrooms/classroomConfig";
import {studentQueryState} from "@/features/students/student-services";
import ClassroomDelete from "@/features/classrooms/components/classroom-delete";
import {classroomSearchQueryState, useFindClassrooms} from "@/features/classrooms/classroom-services";

export default function ClassroomList() {

    const router = useRouter();
    const [query, setQuery] = useRecoilState(classroomSearchQueryState);
    const {data: currentValue, isLoading, refetch} = useFindClassrooms({query});
    const [studentQuery, setStudentQuery] = useRecoilState(studentQueryState);

    const handleClick = (name) => {
        setStudentQuery((prevState) => ({
            ...prevState,
            query: name,
        }));
        router.push(studentConfig.path.root);
    };

    return (
            <ListToolBar refetch={refetch} label={"Nom"} length={1} query={query} setQuery={setQuery} config={classroomConfig}>

                <TableContainer sx={{minWidth: 700}}>
                    {isLoading && <LinearProgress/>}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Nom"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Niveau"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Prof. Titulaire"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Année scolaire"}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        {currentValue && (

                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id} onDoubleClick={() => handleClick(value.name)}>
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

