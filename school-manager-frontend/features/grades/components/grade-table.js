
import Link from 'next/link';
import React, {useEffect, useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import {MaterialReactTable} from "material-react-table";
import {IconButton, MenuItem, Stack, Tooltip} from "@mui/material";

import {useRecoilState, useRecoilValue} from "recoil";
import {gradeConfig} from "@/features/grades/grade-config";
import {useSearch} from "@/shared/components/tables/table-hooks";
import {gradeQueryState} from "@/features/grades/grade-services";
import GradeDelete from "@/features/grades/components/grade-delete";
import ActionMenuItems, {initialPagination} from "../../../shared/components/tables/table-utils";
import {useRouter} from "next/navigation";
import {studentConfig} from "@/features/students/student-config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import {studentFilterQuery, studentQueryState} from "@/features/students/student-services";

const useColumns = () => useMemo(() => [
    {
        accessorKey: 'exam.examDate',
        header: "Date d'examen",
    },
    {
        accessorKey: 'exam.subject',
        header: 'Matière',
    },
    {
        accessorKey: 'value',
        header: 'Note',
    },
    {
        accessorKey: 'student.firstName',
        header: 'Prénom',
    },
    {
        accessorKey: 'student.lastName',
        header: 'Nom',
    },
    {
        accessorKey: 'student.classroom.name',
        header: 'Classe',
    },
], []);


export default function GradeTable() {
    const [sort, setSort] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState(initialPagination);

    const gradeQuery = useRecoilValue(gradeQueryState);
    const [columnFilters, setColumnFilters] = useState([
        {id: 'student.firstName', value: gradeQuery.firstName},{id: 'student.lastName', value: gradeQuery.lastName}
    ]);


    const {data: currentPage, isLoading, isError, error, refetch} = useSearch({
            query: globalFilter, page: pagination.pageIndex, size: pagination.pageSize, sort, filter: columnFilters,
            path: gradeConfig.path.search
    });


    useEffect(() => {
        if(!isLoading){
            setColumnFilters([
                {id: 'exam.examDate', value: gradeQuery.examDate},{id: 'exam.subject', value: gradeQuery.subject}]);
        }
        //console.log("current page ===> ", currentPage);
    }, []);

    const router = useRouter();
    const [studentQuery, setStudentQuery] = useRecoilState(studentQueryState);
    const handleRowClick = (firstName, lastName) => {
        setStudentQuery((prevState) => ({
            ...prevState,
            firstName: firstName,
            lastName: lastName,
        }));
        router.push(studentConfig.path.root);
    };

    const columns = useColumns();

    return (
        <MaterialReactTable
            columns={columns}
            data={currentPage?.content ?? []}
            initialState={{showColumnFilters: true}}
            onSortingChange={setSort}
            onPaginationChange={setPagination}
            rowCount={currentPage?.totalElements}
            onGlobalFilterChange={setGlobalFilter}
            onColumnFiltersChange={setColumnFilters}
            manualFiltering manualPagination manualSorting
            state={{
                isLoading,
                pagination,
                columnFilters,
                globalFilter,
                showAlertBanner: isError,
                showProgressBars: isLoading,
                sort,
            }}
            muiToolbarAlertBannerProps={
                isError
                    ? {
                        color: 'error',
                        children: error.message ,
                    }
                    : undefined
            }
            enableRowActions
            positionActionsColumn={"last"}
            renderRowActionMenuItems={({ row }) => [
                <MenuItem key={row.original.id + "details"}>
                    <Link href={gradeConfig.path.details(row.original.id)}>
                        <Tooltip arrow title="Détails">
                            <IconButton><VisibilityIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"edit"}>
                    <Link href={gradeConfig.path.edit(row.original.id)}>
                        <Tooltip arrow title="Modifier">
                            <IconButton><EditIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"delete"}>
                    <GradeDelete id={row.original.id} refetch={refetch}/>
                </MenuItem>
            ]}
            muiTableBodyRowProps={({ row }) => ({
                onDoubleClick: (event) => {
                    handleRowClick(row.original.student.firstName,row.original.student.lastName);
                },
            })}
            renderTopToolbarCustomActions={() => (
                <Stack direction={"row"}>
                    <Tooltip arrow title="Actualiser">
                        <IconButton onClick={refetch}>
                            <Refresh/>
                        </IconButton>
                    </Tooltip>
                    <Link href={gradeConfig.path.new}>
                        <Tooltip arrow title="Ajouter">
                            <IconButton>
                                <Add/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Stack>
            )}
        />
    );
};



