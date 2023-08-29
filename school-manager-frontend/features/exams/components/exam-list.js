import {
    Card,
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
import {Add, Refresh} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {examConfig} from "@/features/exams/exam-config";
import {gradeConfig} from "@/features/grades/grade-config";
import {useFindAllExams} from "@/features/exams/exam-services";
import ExamDelete from "@/features/exams/components/exam-delete";
import {gradeQueryState} from "@/features/grades/grade-services";

export default function ExamList() {

    const {data: currentValue, isLoading, refetch} = useFindAllExams();

    const [gradeQuery, setGradeQuery] = useRecoilState(gradeQueryState);

    const router = useRouter();
    const handleRowClick = (value) => {
        setGradeQuery((prevState) => ({
            ...prevState,
            examDate: value.examDate,
            subject: value.subject,
        }));
        router.push(gradeConfig.path.root);
    };

    return (
        <Card>

                <Stack direction={"row"}>
                    <Link href={"exams/new"}>
                        <IconButton>
                            <Add/>
                        </IconButton>
                    </Link>
                    <IconButton onClick={refetch}>
                        <Refresh/>
                    </IconButton>
                </Stack>

                <TableContainer sx={{minWidth: 700}}>
                    {isLoading && <LinearProgress/>}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"ID"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Matière"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Nom prof."}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{"Date d'examen"}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold'}}>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        {currentValue && (

                            <TableBody>
                                {currentValue.map(value => (
                                    <TableRow key={value.id} onDoubleClick={() => handleRowClick(value)}>
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell>{value.subject}</TableCell>
                                        <TableCell>{value.teacherName}</TableCell>
                                        <TableCell>{value.examDate}</TableCell>
                                        <TableCell>
                                            <Stack direction={"row"} spacing={0}>
                                                <Link href={examConfig.path.details(value.id)}>
                                                    <Tooltip arrow title="Détails">
                                                        <IconButton><VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={examConfig.path.edit(value.id)}>
                                                    <Tooltip arrow title="Modifier">
                                                        <IconButton><EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <ExamDelete id={value.id} refetch={refetch}/>
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

