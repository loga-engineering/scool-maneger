
import Link from 'next/link';
import {useRouter} from "next/navigation";

import { ExportToCsv } from 'export-to-csv';
import React, {useEffect, useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {IconButton, MenuItem, Stack, Tooltip} from "@mui/material";

import {MaterialReactTable} from "material-react-table";
import {useRecoilState, useRecoilValue} from "recoil";
import {gradeConfig} from "@/features/grades/grade-config";
import {useSearch} from "@/shared/components/tables/table-hooks";
import {gradeQueryState} from "@/features/grades/grade-services";
import GradeDelete from "@/features/grades/components/grade-delete";
import {studentConfig} from "@/features/students/student-config";
import {studentQueryState} from "@/features/students/student-services";
import {initialPagination} from "../../../shared/components/tables/table-utils";

const useColumns = () => useMemo(() => [
    {
        accessorKey: 'exam.examDate',
        header: "Date d'examen",
    },
    {
        accessorKey: 'exam.subject',
        header: 'Matière',
        size: 40,
    },
    {
        accessorKey: 'value',
        header: 'Note',
        size: 20,
    },
    {
        accessorKey: 'student.firstName',
        header: 'Prénom',
        size: 40,
    },
    {
        accessorKey: 'student.lastName',
        header: 'Nom',
        size: 40,
    },
    {
        accessorKey: 'student.classroom.name',
        header: 'Classe',
        size: 20,
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
    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c) => c.header),
    };
    const csvExporter = new ExportToCsv(csvOptions);

    const handleExportRows = (rows) => {
        const data = rows?.map((row) => ({
            examDate: row.original.exam.examDate,
            subject: row.original.exam.subject,
            value: row.original.value,
            firstName: row.original.student.firstName,
            lastName: row.original.student.lastName,
            classroom: row.original.student.classroom.name,
        }));

        csvExporter.generateCsv(data);
    };


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
            renderTopToolbarCustomActions={({ table }) => (
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
                    <Tooltip arrow title="Exporter">
                        <IconButton  disabled={table.getPrePaginationRowModel().rows.length === 0}
                                    onClick={() =>
                            handleExportRows(table.getPrePaginationRowModel().rows)
                        } >
                            <FileDownloadIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            )}
        />
    );
};



